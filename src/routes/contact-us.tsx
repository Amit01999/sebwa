import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { LeadForm } from "@/components/site/LeadForm";
import { settingsQueryOptions } from "@/lib/queries/settings";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

// Contact info/map here are sourced from the same SiteSettings API as the
// footer (admin-managed), rather than a generic Page section — the
// two-column contact-info + map layout is bespoke to this one page and
// doesn't need to be forced into the richContent/leadForm section model.
export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact Us — SEBWA" },
      { name: "description", content: "Get in touch with SEBWA in Chattogram, Bangladesh." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { data: settings } = useSuspenseQuery(settingsQueryOptions());
  const { contact } = settings;

  return (
    <SiteLayout>
      <PageHero title="Contact Us" />
      <section className="mx-auto max-w-6xl px-4 lg:px-8 py-14 lg:py-20 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-navy mb-4">Get in touch</h2>
          <p className="text-foreground/80 mb-6">
            Have a question about our programs, the application process, or partnering with SEBWA?
            Our team is ready to help.
          </p>
          <ul className="space-y-4 text-foreground/85">
            {contact.address && (
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-orange flex-none mt-0.5" />
                <span className="whitespace-pre-line">{contact.address}</span>
              </li>
            )}
            {contact.phones.length > 0 && (
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-orange flex-none mt-0.5" />
                <span>
                  {contact.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="hover:text-orange block"
                    >
                      {phone}
                    </a>
                  ))}
                </span>
              </li>
            )}
            {contact.email && (
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-orange flex-none mt-0.5" />
                <a href={`mailto:${contact.email}`} className="hover:text-orange">
                  {contact.email}
                </a>
              </li>
            )}
            {contact.hours && (
              <li className="flex gap-3">
                <Clock className="h-5 w-5 text-orange flex-none mt-0.5" />
                <span>{contact.hours}</span>
              </li>
            )}
          </ul>
          {contact.address && (
            <div className="mt-8 aspect-video w-full rounded-md overflow-hidden border border-border">
              <iframe
                title="SEBWA location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(contact.address)}&t=m&z=14&output=embed`}
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          )}
        </div>

        <LeadForm variant="contact" pageSlug="contact-us" />
      </section>
    </SiteLayout>
  );
}
