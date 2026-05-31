import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useState } from "react";

export const Route = createFileRoute("/curriculum-activation-program")({
  head: () => ({
    meta: [
      { title: "Curriculum Activation Program — SEBWA" },
      {
        name: "description",
        content:
          "A sequenced plan to help schools access the Western Australian curriculum, resources and professional learning.",
      },
    ],
  }),
  component: CurriculumActivationProgram,
});

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

function CurriculumActivationProgram() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-5xl px-4 lg:px-8 py-14 space-y-10 text-foreground/85 leading-relaxed text-[15.5px]">

        {/* Intro paragraphs */}
        <div className="space-y-4">
          <p>
            The Curriculum Activation Program provides a sequenced plan for international schools to
            access the Western Australian curriculum, supporting resources and professional learning.
            The SCSA International team will work with each approved international school to ensure
            that professional learning and ongoing support are provided to implement and deliver the
            approved curriculum program or programs.
          </p>
          <p>
            Designed for schools that are delivering the Western Australian curriculum for the first
            time, the Curriculum Activation Program involves a step-by-step process facilitated by
            the SCSA to guide schools through the first two years of implementation of the curriculum
            program or programs that they have been approved to deliver. Where a third party is
            involved in supporting the international school, this third party will be included in
            discussions about the curriculum implementation timeline.
          </p>
          <p>
            The Implementation Guide for WA Early Years International and WA K–10 International and
            the Implementation Guide for WACE International and WAM International are made available
            in the Curriculum Activation Program. They contain introductory information about the
            various services and resources provided by the SCSA to support the establishment of
            Western Australian curriculum programs.
          </p>
          <p>
            The SCSA understands that international schools may have a number of operational and
            strategic activities to undertake in addition to SCSA's required preparation processes
            for the implementation of the curriculum. As they conceptualise implementation of the
            curriculum, common questions asked by international schools include the following.
          </p>
        </div>

        {/* Why is a curriculum plan important? */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            Why is a curriculum plan important?
          </h2>
          <p>
            The SCSA provides syllabus documents that set out curriculum content. These are used to
            plan curriculum delivery across the school over the academic year. This planning will
            show how learning is sequenced and developed within and across the learning areas and the
            year levels. A whole-school curriculum plan can form the basis for all other layers of
            curriculum planning by teachers, using yearly overviews and/or a scope and sequence
            document. This makes clear to teachers what they should be teaching and when, as well as
            the progression of teaching across the year levels. A curriculum plan can also be used to
            show the opportunities for integrated or interdisciplinary teaching and learning by
            illustrating connections between related content.
          </p>
        </section>

        {/* Who should lead */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            Who should lead curriculum planning at the school level?
          </h2>
          <p>
            School leaders can designate curriculum leaders within the school who will work with
            teaching teams to implement and deliver the school's teaching and learning program.
          </p>
        </section>

        {/* Local context */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What about the local context of each school?
          </h2>
          <p>
            Each school is unique and should therefore shape delivery of the curriculum to meet the
            context of the school and the students. Implementation and delivery of the curriculum is
            an ongoing process that will benefit from review, evaluation and adjustment.
          </p>
        </section>

        {/* Academic calendar */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What about academic calendar alignment?
          </h2>
          <p>
            Schools in Western Australia have an academic calendar that operates from late January to
            December. SCSA International offers Year 12 ATAR examinations aligned to both the
            Southern and Northern hemisphere academic calendars.
          </p>
        </section>

        {/* Teacher selection */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What about teacher selection?
          </h2>
          <p>
            Teacher selection is at the discretion of the school. Teacher qualifications are as per
            in-country requirements.
          </p>
        </section>

        {/* Conclusion of program */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            What happens at the conclusion of the Curriculum Activation Program?
          </h2>
          <p>
            Following the completion of the program, it is anticipated that a school will enter into
            a consolidation phase. In this phase, the school will continue to be supported by the
            SCSA but operate with a higher level of independence and confidence, accessing
            appropriate systems and processes as needed.
          </p>
        </section>

        {/* How can I find out more */}
        <section className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-semibold text-navy">
            How can I find out more?
          </h2>
          <p>
            To find out more about SCSA International's Curriculum Activation Program, complete the
            form below. A member of SEBWA will be in touch.
          </p>
          <ContactForm />
        </section>

      </article>
    </SiteLayout>
  );
}
