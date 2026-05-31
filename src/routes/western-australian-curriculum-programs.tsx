import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";

export const Route = createFileRoute("/western-australian-curriculum-programs")({
  head: () => ({
    meta: [
      { title: "Western Australian Curriculum Programs — SEBWA" },
      {
        name: "description",
        content:
          "World-class curriculum programs SCSA offers to international schools — Early Years, K–10, WACE and WAM.",
      },
    ],
  }),
  component: () => (
    <ContentPage
      title="Western Australian Curriculum Programs"
      blocks={[
        {
          type: "p",
          text: "The SCSA has a rich tradition of providing world-class curriculum programs to Western Australian and international schools. These curriculum programs, adopted and adapted from the Australian Curriculum, are relevant to students' learning needs and aspirations. They are evidence-based and forward-focused.",
        },
        {
          type: "p",
          text: "International schools can be approved by the SCSA Board to deliver any or all of the following Western Australian curriculum programs, which are the same as those delivered at schools in Western Australia:",
        },
        {
          type: "ul",
          items: [
            "Western Australian Early Years Learning Program International (WA Early Years International) Kindergarten to Year 2",
            "Western Australian Kindergarten to Year 10 Curriculum International (WA K–10 International) Kindergarten to Year 10",
            "Western Australian Certificate of Education International (WACE International) Years 11 and 12",
            "Western Australian Matriculation Program International (WAM International) Year 12 only.",
          ],
        },
        {
          type: "p",
          text: "Western Australian curriculum programs, and the resources and support SCSA provide, are designed to make a difference to students' lives. SCSA does this by ensuring students, teachers and schools have access to high quality and relevant education programs. Each program provides students with opportunities to develop academic English skills that are embedded in the teaching, learning and assessment resources.",
        },
        {
          type: "p",
          text: "SCSA use the latest international research on effective assessment practice to develop support materials for teaching and learning in schools. Grades are based on observable behaviours; students are graded on what they know and can do. Assessment support materials include annotated student samples (written and audiovisual), which SCSA publish online in a secure environment for teachers. These materials help teachers provide detailed and quality feedback on student learning, support teachers in their planning for student improvement and help to maximise future opportunities for students.",
        },
        {
          type: "p",
          text: "International schools may wish to apply to the SCSA to deliver one or more of the above Western Australian curriculum programs. The SCSA does not stipulate any student entry requirements for its curriculum programs and schools may wish to establish such requirements at their discretion.",
        },
      ]}
    />
  ),
});
