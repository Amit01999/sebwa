import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact-us")({
  head: () => ({ meta: [{ title: "Contact Us — SEBWA" }, { name: "description", content: "Get in touch with SEBWA in Chattogram, Bangladesh." }] }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
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
            <li className="flex gap-3">
              <MapPin className="h-5 w-5 text-orange flex-none mt-0.5" />
              <span>House 11, Road 1, Nasirabad H/S<br />Chattogram – 4000, Bangladesh</span>
            </li>
            <li className="flex gap-3">
              <Phone className="h-5 w-5 text-orange flex-none mt-0.5" />
              <span>
                <a href="tel:+8801717149453" className="hover:text-orange block">+880 1717 149 453</a>
                <a href="tel:+8801730035475" className="hover:text-orange block">+880 1730 035 475</a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="h-5 w-5 text-orange flex-none mt-0.5" />
              <a href="mailto:sebwa.net@gmail.com" className="hover:text-orange">sebwa.net@gmail.com</a>
            </li>
            <li className="flex gap-3">
              <Clock className="h-5 w-5 text-orange flex-none mt-0.5" />
              <span>Sunday – Thursday: 10 AM – 6 PM</span>
            </li>
          </ul>
          <div className="mt-8 aspect-video w-full rounded-md overflow-hidden border border-border">
            <iframe
              title="SEBWA location"
              src="https://maps.google.com/maps?q=Nasirabad%20H%2FS%20Chattogram%20Bangladesh&t=m&z=14&output=embed"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="bg-white border border-border rounded-md p-6 shadow-sm space-y-4 h-fit"
        >
          <h2 className="text-2xl font-semibold text-navy">Send us a message</h2>
          {sent ? (
            <p className="rounded bg-mist p-4 text-foreground/80">
              Thanks — your message has been received. We'll get back to you shortly.
            </p>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <Field label="Subject" name="subject" />
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-sm bg-teal px-5 py-2.5 text-sm font-semibold text-teal-foreground hover:bg-teal/90"
              >
                <Send className="h-4 w-4" /> Send Message
              </button>
            </>
          )}
        </form>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
      />
    </div>
  );
}
