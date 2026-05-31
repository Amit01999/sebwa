import { createFileRoute, Link } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";

export const Route = createFileRoute("/start-teaching")({
  head: () => ({ meta: [{ title: "Start Teaching — SEBWA" }, { name: "description", content: "Get started teaching the Western Australian curriculum with SCSA guidance and professional learning." }] }),
  component: () => (
    <ContentPage
      title="Start Teaching"
      intro="Schools approved to deliver Western Australian curriculum programs receive guidance to support implementation and delivery."
      blocks={[
        { type: "p", text: "Members of the SCSA International team facilitate a Curriculum Activation Program and provide professional learning pathways to support curriculum delivery, including advice about teaching, assessment and reporting." },
        { type: "h2", text: "Find out more" },
        { type: "node", node: (
          <div className="flex flex-wrap gap-3 not-prose">
            <Link to="/curriculum-activation-program" className="inline-flex items-center rounded-sm bg-teal px-4 py-2 text-sm font-semibold text-teal-foreground hover:bg-teal/90">
              Curriculum Activation Program
            </Link>
            <Link to="/professional-learning-pathways-and-support" className="inline-flex items-center rounded-sm bg-orange px-4 py-2 text-sm font-semibold text-white hover:bg-orange/90">
              Professional Learning Pathways
            </Link>
          </div>
        )},
      ]}
    />
  ),
});
