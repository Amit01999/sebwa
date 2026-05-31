import { createFileRoute, Link } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";

export const Route = createFileRoute("/how-do-i-apply")({
  head: () => ({ meta: [{ title: "How Do I Apply — SEBWA" }, { name: "description", content: "How to apply to deliver the Western Australian curriculum at your school." }] }),
  component: () => (
    <ContentPage
      title="How Do I Apply"
      intro="Prospective SCSA International partners supply information the SCSA uses to evaluate school preparedness to deliver the nominated Western Australian curriculum program or programs."
      blocks={[
        { type: "p", text: "Members of the SCSA International team are available to provide guidance and support with the online application process. During this process commercial arrangements are discussed and relevant timeframes are established. All applications for accreditation must be approved by the SCSA's Board." },
        { type: "h2", text: "Next steps" },
        { type: "node", node: (
          <div className="flex flex-wrap gap-3">
            <Link to="/school-approval-process" className="inline-flex items-center rounded-sm bg-teal px-4 py-2 text-sm font-semibold text-teal-foreground hover:bg-teal/90">
              School Approval Process
            </Link>
            <Link to="/contact-us" className="inline-flex items-center rounded-sm bg-orange px-4 py-2 text-sm font-semibold text-white hover:bg-orange/90">
              Contact SEBWA
            </Link>
          </div>
        )},
      ]}
    />
  ),
});
