import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

// `credentials: "include"` only attaches cookies for browser-initiated
// fetches. On a hard navigation / refresh, TanStack Start's loaders run
// this same request code server-side (Node), where there is no cookie jar
// — so without this, every admin page reload would 401 and bounce to
// login. Forward the incoming request's own Cookie header in that case.
// `createIsomorphicFn` (rather than a runtime `typeof document` check) is
// required here: it's how Start's import-protection plugin allows a
// server-only import to stay reachable from a file the client also loads.
const getIncomingCookieHeader = createIsomorphicFn()
  .server(() => getRequestHeader("cookie"))
  .client(() => undefined);

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

// In-memory only — never persisted, so a page refresh re-derives it from
// GET /api/admin/auth/me (which re-issues the token every call). This is
// what makes the double-submit CSRF check work regardless of whether the
// frontend and backend end up same-site or cross-site.
let csrfToken: string | undefined;

export function setCsrfToken(token: string | undefined) {
  csrfToken = token;
}

export function getCsrfToken() {
  return csrfToken;
}

const MUTATING_METHODS = new Set(["POST", "PATCH", "PUT", "DELETE"]);

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  isFormData?: boolean;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, isFormData, headers, method = "GET", ...rest } = options;

  const finalHeaders = new Headers(headers);
  if (!isFormData && body !== undefined) {
    finalHeaders.set("content-type", "application/json");
  }
  if (MUTATING_METHODS.has(method.toUpperCase()) && csrfToken) {
    finalHeaders.set("x-csrf-token", csrfToken);
  }

  const incomingCookie = getIncomingCookieHeader();
  if (incomingCookie) finalHeaders.set("cookie", incomingCookie);

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
    ...rest,
    method,
    credentials: "include",
    headers: finalHeaders,
    body: body === undefined ? undefined : isFormData ? (body as FormData) : JSON.stringify(body),
  });

  const text = await response.text();
  const json = text ? JSON.parse(text) : { success: response.ok, data: null };

  if (!response.ok || !json.success) {
    throw new ApiError(
      response.status,
      json?.error?.message ?? "Request failed",
      json?.error?.details,
    );
  }

  return json.data as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, body?: unknown) => request<T>(path, { method: "POST", body }),
  patch: <T>(path: string, body?: unknown) => request<T>(path, { method: "PATCH", body }),
  put: <T>(path: string, body?: unknown) => request<T>(path, { method: "PUT", body }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
  upload: <T>(path: string, formData: FormData) =>
    request<T>(path, { method: "POST", body: formData, isFormData: true }),
};

export async function downloadFile(path: string, filename: string) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
    credentials: "include",
  });
  if (!response.ok) throw new ApiError(response.status, "Export failed");
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
