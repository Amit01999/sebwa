type ApiEnvelope<T> = { success: true; data: T } | { success: false; error: { message: string } };

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export async function publicFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  const body = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok || !body || body.success === false) {
    const message =
      body && body.success === false ? body.error.message : `Request failed: ${response.status}`;
    throw new Error(message);
  }

  return body.data;
}
