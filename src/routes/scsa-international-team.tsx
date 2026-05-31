import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";

export const Route = createFileRoute("/scsa-international-team")({
  head: () => ({ meta: [{ title: "SCSA International Team — SEBWA" }, { name: "description", content: "Meet the SCSA International team focused on the curriculum and assessment needs of international schools." }] }),
  component: () => (
    <ContentPage
      title="SCSA International Team"
      blocks={[
        { type: "p", text: "SCSA International has an established team focused on the curriculum and assessment needs of international schools. The team includes former principals, deputy principals, heads of school/department and senior teachers — all experienced educators who excel in supporting teachers to achieve the best possible outcomes for their students." },
        { type: "p", text: "The SCSA International approach to designing the curriculum is based on evidence gathered from teachers working in Western Australian schools and validated by university-based academics, curriculum specialists and measurement experts. The SCSA conducts regular quality reviews to ensure the curriculum remains relevant and focused on students' learning needs and aspirations." },
        { type: "p", text: "The team cultivates genuine partnerships with international schools to ensure students have the best possible opportunities to achieve their desired outcomes. It considers the unique cultural contexts in which international schools operate to support schools in the effective implementation of the Western Australian curriculum, and is assisted by the broader SCSA body corporate in conducting activities to support international schools." },
      ]}
    />
  ),
});
