import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useState } from "react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/professional-learning-pathways-and-support")({
  head: () => ({
    meta: [
      { title: "Professional Learning Pathways and Support — SEBWA" },
      {
        name: "description",
        content:
          "Diverse professional learning pathways for school leaders, curriculum leaders and teachers.",
      },
    ],
  }),
  component: ProfessionalLearning,
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
        Thank you! A member of SEBWA will be in touch shortly.
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

function ProfessionalLearning() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-5xl px-4 lg:px-8 py-14 space-y-10 text-foreground/85 leading-relaxed text-[15.5px]">

        {/* Intro paragraphs */}
        <div className="space-y-4">
          <p>
            The SCSA offers a diverse range of professional learning pathways and support to help
            approved international schools implement and deliver the Western Australian curriculum.
            It has a well-established process to analyse, identify and tailor the provision of
            professional learning to address the different levels of experience school leaders,
            curriculum leaders and teachers have with the Western Australian curriculum.
          </p>
          <p>
            Implementing and delivering an international curriculum is a significant undertaking for
            schools. Therefore, as part of their agreement with the SCSA, schools participate in
            professional learning activities and information sharing meetings.
          </p>
          <p>
            The SCSA's professional learning pathways balance the expertise of the SCSA's curriculum
            specialists with the needs of the school to tailor a professional learning journey that
            is respectful of each teacher's professional standing. The design, creation and delivery
            of the SCSA's professional learning take into consideration school contexts and levels of
            experience with the Western Australian curriculum.
          </p>
        </div>

        {/* School leaders */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What professional learning does the SCSA provide for school leaders?
          </h2>
          <p>
            The breadth and depth of the SCSA professional learning help school and curriculum
            leaders to transition into delivering the Western Australian curriculum, in addition to
            providing ongoing support.
          </p>
          <p>The SCSA's professional learning modules will assist school and curriculum leaders to:</p>
          <Bullet
            items={[
              "understand the mandated requirements of a licensed school",
              "facilitate the school's implementation of the Western Australian curriculum",
              "develop policy (as required)",
              "develop whole-school curriculum planning (as required)",
              "map links to the school's current education system (as required).",
            ]}
          />
        </section>

        {/* Teachers */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What professional learning does the SCSA provide for teachers?
          </h2>
          <p>
            The SCSA offers a range of professional learning designed to meet the needs of teachers
            in international schools. These modules can be tailored to specific needs and/or areas
            of interest.
          </p>
          <p>The SCSA's professional learning modules will assist teachers to:</p>
          <Bullet
            items={[
              "understand learning area syllabus content",
              "understand the SCSA's mandated teaching, learning and assessment requirements",
              "design effective lesson plans",
              "optimise their ability to deliver the Western Australian curriculum in the classroom",
              "address pedagogy to meet the ways of teaching, learning and assessing in the Western Australian curriculum",
              "address the specific needs of the different phases of schooling",
              "reflect on their professional practice.",
            ]}
          />
        </section>

        {/* Other types */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What other types of professional learning are offered?
          </h2>
          <p>
            Regular and ongoing opportunities exist for teachers to explore, analyse and plan their
            teaching, learning, assessment and reporting practices with SCSA International officers.
            These officers are specialists in the fields of teaching, learning and assessment and can
            be contacted by phone, email or online communication platforms.
          </p>
        </section>

        {/* How facilitated */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            How is professional learning facilitated?
          </h2>
          <p>
            The professional learning is conducted through face‑to‑face sessions, either online or
            in‑country, self‑directed learning opportunities and tailored offerings. The design and
            delivery of the SCSA's professional learning are customised to the school's needs to
            ensure improved outcomes for students.
          </p>
        </section>

        {/* Find out more */}
        <section className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            How can I find out more?
          </h2>
          <p>
            To find out more about the professional learning pathways and support offered by SCSA
            International, complete the form below. A member of SEBWA will be in touch.
          </p>
          <ContactForm />
        </section>

      </article>
    </SiteLayout>
  );
}
