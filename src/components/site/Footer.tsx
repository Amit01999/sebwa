import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Phone, Mail, Home } from "lucide-react";
import logo from "@/assets/sebwa-logo.png";
import { settingsQueryOptions } from "@/lib/queries/settings";
import { assetUrl } from "./media";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

function SocialLink({
  href,
  label,
  bgClass,
  children,
}: {
  href: string;
  label: string;
  bgClass: string;
  children: ReactNode;
}) {
  const hasLink = Boolean(href);
  return (
    <a
      href={hasLink ? href : "#"}
      target={hasLink ? "_blank" : undefined}
      rel={hasLink ? "noopener noreferrer" : undefined}
      aria-label={label}
      className={`h-10 w-10 grid place-items-center rounded-md text-white hover:opacity-90 transition-opacity ${bgClass}`}
    >
      {children}
    </a>
  );
}

function FooterNavLink({ label, href }: { label: string; href: string }) {
  const className = "text-foreground/70 hover:text-[#f5a623]";
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {label}
    </a>
  );
}

export function Footer() {
  const { data: settings } = useSuspenseQuery(settingsQueryOptions());
  const { contact, social, footer } = settings;

  const navLinks = [...footer.navLinks]
    .filter((link) => link.visible !== false)
    .sort((a, b) => a.order - b.order);
  const accreditationLogos = [...footer.accreditationLogos]
    .sort((a, b) => a.order - b.order)
    .map((logo) => ({ ...logo, src: assetUrl(logo.mediaAsset) }))
    .filter((logo) => logo.src);

  return (
    <footer className="bg-white border-t border-border pt-12 pb-6">
      {/* Main 4-column section */}
      <div className="mx-auto max-w-7xl px-4 lg:px-8 grid gap-10 md:grid-cols-2 lg:grid-cols-4 text-center md:text-left">
        {/* Col 1 – Logo + Address */}
        <div>
          <img
            src={logo}
            alt="SEBWA"
            className="h-24 object-contain mb-4 mx-auto md:mx-0"
            loading="lazy"
          />
          {contact.address && (
            <p className="text-sm text-foreground/80 flex items-start gap-2 justify-center md:justify-start">
              <Home className="h-4 w-4 mt-0.5 flex-none" />
              <span className="whitespace-pre-line">{contact.address}</span>
            </p>
          )}
        </div>

        {/* Col 2 – Contact Us */}
        <div>
          <h4 className="text-[#f5a623] font-semibold mb-4 text-base">Contact Us</h4>
          <ul className="space-y-2 text-sm text-foreground/80">
            {contact.phones.map((phone) => (
              <li key={phone} className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="h-4 w-4 flex-none" />
                {phone}
              </li>
            ))}
            {contact.email && (
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="h-4 w-4 flex-none" />
                {contact.email}
              </li>
            )}
            {contact.hours && <li className="text-sm text-foreground/80">{contact.hours}</li>}
          </ul>
        </div>

        {/* Col 3 – Navigation */}
        <div>
          <h4 className="text-[#f5a623] font-semibold mb-4 text-base">Navigation</h4>
          <ul className="space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.label}>
                <FooterNavLink label={link.label} href={link.href} />
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 – Follow Us */}
        <div>
          <h4 className="text-[#f5a623] font-semibold mb-4 text-base">Follow Us</h4>
          <div className="flex gap-2 justify-center md:justify-start">
            <SocialLink href={social.facebook} label="Facebook" bgClass="bg-[#1877f2]">
              <FacebookIcon />
            </SocialLink>
            <SocialLink href={social.instagram} label="Instagram" bgClass="bg-black">
              <InstagramIcon />
            </SocialLink>
            <SocialLink href={social.youtube} label="YouTube" bgClass="bg-[#ff0000]">
              <YoutubeIcon />
            </SocialLink>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-4 lg:px-8 mt-10 border-t border-border pt-6">
        {/* Accreditation row */}
        {accreditationLogos.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-8">
            <span className="text-lg font-bold text-foreground shrink-0">Accreditation</span>
            <div className="flex flex-wrap items-center justify-center gap-20">
              {accreditationLogos.map((logo, i) => (
                <img key={i} src={logo.src} alt={logo.alt} className="h-20 object-contain" />
              ))}
            </div>
          </div>
        )}

        {/* Copyright */}
        <p className="text-center text-sm text-foreground/70 mt-8">
          © 2023 – SEBWA all rights reserved | Developed By{" "}
          <a href="https://it.bepro.com.bd/" className="text-[#f5a623] hover:underline font-medium">
            BePro IT
          </a>
        </p>
      </div>
    </footer>
  );
}
