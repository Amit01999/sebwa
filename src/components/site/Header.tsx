import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/sebwa-logo.png";
import { navigationQueryOptions } from "@/lib/queries/navigation";

export function Header() {
  const { data: navigation } = useSuspenseQuery(navigationQueryOptions());
  const nav = [...navigation.items].sort((a, b) => a.order - b.order);
  const ctaButton = navigation.ctaButton;

  const [open, setOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="SEBWA" className="h-24 w-24 object-contain" width={80} height={80} />
          <span className="sr-only">SEBWA</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {nav.map((item) => {
            const children = [...item.children].sort((a, b) => a.order - b.order);
            return (
              <div key={item.label} className="relative group">
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-orange data-[status=active]:text-orange"
                >
                  {item.label}
                  {children.length > 0 && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
                </Link>
                {children.length > 0 && (
                  <div className="absolute left-0 top-full pt-1 invisible opacity-0 translate-y-1 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
                    <ul className="min-w-[260px] rounded-md border border-border bg-[#003233] shadow-lg py-2">
                      {children.map((c) => (
                        <li key={c.to}>
                          <Link
                            to={c.to}
                            className="block px-4 py-2 text-sm text-white border-b border-border last:border-0 hover:bg-mist hover:text-orange"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
          <Link
            to={ctaButton.to}
            className="ml-2 inline-flex items-center rounded-sm bg-teal px-4 py-2 text-sm font-semibold text-teal-foreground shadow-sm transition-transform hover:scale-[1.03] hover:bg-teal/90"
          >
            {ctaButton.label}
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-white max-h-[80vh] overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
            {nav.map((item) => {
              const children = [...item.children].sort((a, b) => a.order - b.order);
              return (
                <div key={item.label}>
                  <div className="flex items-center justify-between">
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="flex-1 rounded px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-orange"
                    >
                      {item.label}
                    </Link>
                    {children.length > 0 && (
                      <button
                        onClick={() =>
                          setOpenMobileGroup((g) => (g === item.label ? null : item.label))
                        }
                        className="p-2 text-foreground/60"
                        aria-label="Expand"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${openMobileGroup === item.label ? "rotate-180" : ""}`}
                        />
                      </button>
                    )}
                  </div>
                  {children.length > 0 && openMobileGroup === item.label && (
                    <ul className="pl-4 pb-2 space-y-0.5">
                      {children.map((c) => (
                        <li key={c.to}>
                          <Link
                            to={c.to}
                            onClick={() => setOpen(false)}
                            className="block rounded px-3 py-1.5 text-sm text-foreground/70 hover:bg-mist hover:text-orange"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
            <Link
              to={ctaButton.to}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-sm bg-teal px-4 py-2 text-sm font-semibold text-teal-foreground"
            >
              {ctaButton.label}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
