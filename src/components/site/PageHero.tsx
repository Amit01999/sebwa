import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export function PageHero({ title, crumb }: { title: string; crumb?: string }) {
  return (
    <section className="bg-gradient-to-r from-navy via-navy to-[#2a3a4d] text-white py-16">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h1>
        <nav className="mt-4 flex items-center gap-2 text-sm text-white/80">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-orange">
            <Home className="h-3.5 w-3.5" /> Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-60" />
          <span className="text-orange">{crumb ?? title}</span>
        </nav>
      </div>
    </section>
  );
}
