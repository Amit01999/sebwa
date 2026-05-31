import { Link } from "@tanstack/react-router";
import { Phone, Mail, Home } from "lucide-react";
import logo from "@/assets/sebwa-logo.png";
import accred1 from "@/assets/footer/F1-1.png";
import accred2 from "@/assets/footer/F2-e1693126415655.png";
import accred3 from "@/assets/footer/WhatsApp-Image-2023-12-03-at-12.13.09.jpeg";
import accred4 from "@/assets/footer/F5.png";

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

export function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-12 pb-6">
      {/* Main 4-column section */}
      <div className="mx-auto max-w-7xl px-4 lg:px-8 grid gap-10 md:grid-cols-2 lg:grid-cols-4 text-center md:text-left">
        {/* Col 1 – Logo + Address */}
        <div>
          <img src={logo} alt="SEBWA" className="h-24 object-contain mb-4 mx-auto md:mx-0" loading="lazy" />
          <p className="text-sm text-foreground/80 flex items-start gap-2 justify-center md:justify-start">
            <Home className="h-4 w-4 mt-0.5 flex-none" />
            <span>
              House 11, Road 1, Nasirabad H/S
              <br />
              Chattogram – 4000, Bangladesh
            </span>
          </p>
        </div>

        {/* Col 2 – Contact Us */}
        <div>
          <h4 className="text-[#f5a623] font-semibold mb-4 text-base">Contact Us</h4>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <Phone className="h-4 w-4 flex-none" />
              +8801717149453
            </li>
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <Phone className="h-4 w-4 flex-none" />
              +8801730035475
            </li>
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <Mail className="h-4 w-4 flex-none" />
              sebwa.net@gmail.com
            </li>
            <li className="text-sm text-foreground/80">Sunday-Thursday: 10 AM – 6 PM</li>
          </ul>
        </div>

        {/* Col 3 – Navigation */}
        <div>
          <h4 className="text-[#f5a623] font-semibold mb-4 text-base">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about-us" className="text-foreground/70 hover:text-[#f5a623]">
                About Us
              </Link>
            </li>
            <li>
              <a href="#" className="text-foreground/70 hover:text-[#f5a623]">
                Success Stories
              </a>
            </li>
            <li>
              <a href="#" className="text-foreground/70 hover:text-[#f5a623]">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="text-foreground/70 hover:text-[#f5a623]">
                Privacy Policy
              </a>
            </li>
            <li>
              <Link to="/contact-us" className="text-foreground/70 hover:text-[#f5a623]">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4 – Follow Us */}
        <div>
          <h4 className="text-[#f5a623] font-semibold mb-4 text-base">Follow Us</h4>
          <div className="flex gap-2 justify-center md:justify-start">
            <a
              href="#"
              aria-label="Facebook"
              className="h-10 w-10 grid place-items-center rounded-md bg-[#1877f2] text-white hover:opacity-90 transition-opacity"
            >
              <FacebookIcon />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="h-10 w-10 grid place-items-center rounded-md bg-black text-white hover:opacity-90 transition-opacity"
            >
              <InstagramIcon />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="h-10 w-10 grid place-items-center rounded-md bg-[#ff0000] text-white hover:opacity-90 transition-opacity"
            >
              <YoutubeIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-4 lg:px-8 mt-10 border-t border-border pt-6">
        {/* Accreditation row */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          <span className="text-lg font-bold text-foreground shrink-0">Accreditation</span>
          <div className="flex flex-wrap items-center justify-center gap-20">
            <img src={accred1} alt="Accreditation 1" className="h-20 object-contain" />
            <img src={accred2} alt="Accreditation 2" className="h-20 object-contain" />
            <img src={accred3} alt="Accreditation 3" className="h-16 object-contain" />
            <img src={accred4} alt="Accreditation 4" className="h-20 object-contain" />
          </div>
        </div>

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
