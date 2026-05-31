import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useState } from "react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/school-approval-process")({
  head: () => ({
    meta: [
      { title: "School Approval Process — SEBWA" },
      {
        name: "description",
        content: "How the SCSA evaluates licensing applications from international schools.",
      },
    ],
  }),
  component: SchoolApprovalProcess,
});

function Bullet({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-1 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-none shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    givenName: "",
    surname: "",
    phone: "",
    email: "",
    location: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <p className="rounded-md bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm">
        Thank you! SEBWA will be in touch shortly.
      </p>
    );
  }

  const inputCls =
    "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-orange/50";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block text-sm font-medium mb-1">Given Name</label>
        <input
          name="givenName"
          value={form.givenName}
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
          value={form.surname}
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
          value={form.phone}
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
          value={form.email}
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
          value={form.location}
          onChange={handleChange}
          required
          className={inputCls}
          placeholder="City, Country"
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-orange px-8 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
      >
        send
      </button>
    </form>
  );
}

function SchoolApprovalProcess() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-5xl px-4 lg:px-8 py-14 space-y-10 text-foreground/85 leading-relaxed text-[15.5px]">

        <p>
          The SCSA considers applications from international schools, or third parties acting on
          their behalf, to license the delivery of Western Australian curriculum programs.
        </p>

        {/* Licensing application process */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What does the licensing application process involve?
          </h2>
          <p>
            The SCSA evaluates applications using information supplied by prospective schools or
            third parties through its online application process.
          </p>
          <p>The SCSA's evaluation process includes understanding the:</p>
          <Bullet
            items={[
              "curriculum program or programs in a school and/or courses that a school wishes to deliver",
              "resources available to deliver the nominated program or programs",
              "educational background of students likely to enrol in the program or programs",
              "school's approach to assisting students in meeting desired education outcomes.",
            ]}
          />
          <p>As part of the evaluation process, the SCSA will organise a:</p>
          <Bullet
            items={[
              "meeting with the school and/or its representatives via a web‑based conference to discuss the school, curriculum program or programs and services offered by the SCSA, as well as pricing",
              "visit by a member of the SCSA International team (conducted virtually or in‑country) to validate information provided in the online application and to meet with key people involved in the implementation of the curriculum program or programs (if approved).",
            ]}
          />
        </section>

        {/* How long */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            How long does the licensing application process take?
          </h2>
          <p>The application process is typically completed within 4–6 weeks.</p>
        </section>

        {/* What happens after */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What happens after the licensing application is submitted to the SCSA?
          </h2>
          <p>
            All applications are reviewed by the SCSA's International Education Advisory Committee
            (IEAC). The SCSA Board will approve or decline an application based on the IEAC's
            recommendation. If approved, the SCSA will provide the school with a licence to use and
            deliver its curriculum program or programs and an agreement is established that sets out
            the arrangements between the SCSA, the school and third parties (where applicable). The
            SCSA then commences its Curriculum Activation Program to support the school and its
            teachers with curriculum delivery.
          </p>
        </section>

        {/* Support available */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            Is support available during the licensing application process?
          </h2>
          <p>
            Yes. SCSA International team members will provide support to the school and/or its
            representatives during the licensing application process. Schools or third parties are
            advised to contact the SCSA before commencing the online licensing application process.
          </p>
        </section>

        {/* How do I get started */}
        <section className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">How do I get started?</h2>
          <p>
            To register your interest or find out more about the school approval process, complete
            the form below. SEBWA will be in touch.
          </p>
          <ContactForm />
        </section>

      </article>
    </SiteLayout>
  );
}
