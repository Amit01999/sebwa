import type { SettingsSeed } from "./types.js";

// Transcribed verbatim from src/components/site/Footer.tsx. The 3 nav
// links and 3 social links that were `href="#"` placeholders in the
// original are carried over as-is (same labels/visible:true) rather than
// hidden or deleted, since that's the current live behaviour — the admin
// can fill in real URLs or toggle visibility later.
export const siteSettingsSeed: SettingsSeed = {
  contact: {
    phones: ["+8801717149453", "+8801730035475"],
    email: "sebwa.net@gmail.com",
    // Original markup rendered this as two lines separated by a <br />;
    // encoded here as a literal newline for the renderer to split on.
    address: "House 11, Road 1, Nasirabad H/S\nChattogram – 4000, Bangladesh",
    hours: "Sunday-Thursday: 10 AM – 6 PM",
  },
  social: {
    // All three were `href="#"` in the original — no real destination exists yet.
    facebook: "",
    instagram: "",
    youtube: "",
  },
  footer: {
    navLinks: [
      { label: "About Us", href: "/about-us", order: 0, visible: true },
      { label: "Success Stories", href: "#", order: 1, visible: true },
      { label: "FAQ", href: "#", order: 2, visible: true },
      { label: "Privacy Policy", href: "#", order: 3, visible: true },
      { label: "Contact Us", href: "/contact-us", order: 4, visible: true },
    ],
    accreditationLogos: [
      { mediaAssetTag: "seed:footer-accreditation-1", alt: "Accreditation 1", order: 0 },
      { mediaAssetTag: "seed:footer-accreditation-2", alt: "Accreditation 2", order: 1 },
      { mediaAssetTag: "seed:footer-accreditation-3", alt: "Accreditation 3", order: 2 },
      { mediaAssetTag: "seed:footer-accreditation-4", alt: "Accreditation 4", order: 3 },
    ],
  },
  seoDefaults: {
    titleSuffix: " — SEBWA",
  },
};
