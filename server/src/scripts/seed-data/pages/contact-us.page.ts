import type { PageSeed } from "../types.js";

// The original page's address/phone/email/hours copy is NOT duplicated
// here — that lives in site-settings.seed.ts and is rendered by the
// public ContactPage component directly from SiteSettings. Only this
// page's own "Get in touch" heading/intro (which sits beside the form,
// not the contact-info list itself) is carried as the leadForm section's
// heading/intro — a disclosed simplification since the schema has no
// separate "two-column intro + form" section type; the "Send us a
// message" card heading is a static UI label the LeadForm component
// itself renders, not page data.
export const contactUsPage: PageSeed = {
  slug: "contact-us",
  title: "Contact Us",
  seo: {
    title: "Contact Us — SEBWA",
    description: "Get in touch with SEBWA in Chattogram, Bangladesh.",
  },
  sections: [
    { type: "pageHero", data: { title: "Contact Us" } },
    {
      type: "leadForm",
      data: {
        variant: "contact",
        heading: "Get in touch",
        intro:
          "Have a question about our programs, the application process, or partnering with SEBWA? Our team is ready to help.",
      },
    },
  ],
};
