import { useState } from "react";
import { Send } from "lucide-react";

export type LeadFormProps = {
  variant: "contact" | "lead";
  heading?: string;
  intro?: string;
  pageSlug: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const inputCls =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-orange/50";

async function postSubmission(body: {
  formType: "contact" | "lead";
  pageSlug: string;
  name: string;
  email: string;
  fields: Record<string, string>;
}) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
  const response = await fetch(`${API_BASE_URL}/api/forms/submit`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = (await response.json().catch(() => null)) as
    | { success: true; data: { referenceId: string } }
    | { success: false; error: { message: string } }
    | null;

  if (!response.ok || !json || json.success === false) {
    throw new Error(
      json && json.success === false
        ? json.error.message
        : "Something went wrong. Please try again.",
    );
  }
  return json.data;
}

function ContactVariant({
  heading,
  intro,
  pageSlug,
}: {
  heading?: string;
  intro?: string;
  pageSlug: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      await postSubmission({
        formType: "contact",
        pageSlug,
        name: values.name,
        email: values.email,
        fields: { subject: values.subject, message: values.message },
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-border rounded-md p-6 shadow-sm space-y-4 h-fit"
    >
      <h2 className="text-2xl font-semibold text-navy">{heading ?? "Send us a message"}</h2>
      {intro && <p className="text-sm text-foreground/70">{intro}</p>}
      {status === "success" ? (
        <p className="rounded bg-mist p-4 text-foreground/80">
          Thanks — your message has been received. We'll get back to you shortly.
        </p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                name="name"
                value={values.name}
                onChange={handleChange}
                required
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                required
                className={inputCls}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              name="subject"
              value={values.subject}
              onChange={handleChange}
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={values.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full rounded border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
            />
          </div>
          {status === "error" && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center gap-2 rounded-sm bg-teal px-5 py-2.5 text-sm font-semibold text-teal-foreground hover:bg-teal/90 disabled:opacity-60"
          >
            <Send className="h-4 w-4" /> {status === "submitting" ? "Sending…" : "Send Message"}
          </button>
        </>
      )}
    </form>
  );
}

function LeadVariant({
  heading,
  intro,
  pageSlug,
}: {
  heading?: string;
  intro?: string;
  pageSlug: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    givenName: "",
    surname: "",
    phone: "",
    email: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      await postSubmission({
        formType: "lead",
        pageSlug,
        name: `${values.givenName} ${values.surname}`.trim(),
        email: values.email,
        fields: {
          givenName: values.givenName,
          surname: values.surname,
          phone: values.phone,
          location: values.location,
        },
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <p className="rounded-md bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm">
        Thank you! A member of SEBWA will be in touch shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      {heading && <h2 className="text-2xl md:text-3xl font-semibold text-navy">{heading}</h2>}
      {intro && <p className="text-foreground/85">{intro}</p>}
      <div>
        <label className="block text-sm font-medium mb-1">Given Name</label>
        <input
          name="givenName"
          value={values.givenName}
          onChange={handleChange}
          required
          className={inputCls}
          placeholder="Given Name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Surname</label>
        <input
          name="surname"
          value={values.surname}
          onChange={handleChange}
          required
          className={inputCls}
          placeholder="Surname"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Phone number (include International Dialling Code)
        </label>
        <input
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          required
          className={inputCls}
          placeholder="+880 ..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">E-mail</label>
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          required
          className={inputCls}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          name="location"
          value={values.location}
          onChange={handleChange}
          required
          className={inputCls}
          placeholder="City, Country"
        />
      </div>
      {status === "error" && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-orange px-8 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {status === "submitting" ? "sending…" : "send"}
      </button>
    </form>
  );
}

export function LeadForm({ variant, heading, intro, pageSlug }: LeadFormProps) {
  return variant === "lead" ? (
    <LeadVariant heading={heading} intro={intro} pageSlug={pageSlug} />
  ) : (
    <ContactVariant heading={heading} intro={intro} pageSlug={pageSlug} />
  );
}
