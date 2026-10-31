import type { NavSeed } from "./types.js";

// Transcribed verbatim from the `nav` array in src/components/site/Header.tsx.
export const navigationMenuSeed: NavSeed = {
  items: [
    { label: "Home", to: "/", order: 0, children: [] },
    {
      label: "About",
      to: "/about-us",
      order: 1,
      children: [
        { label: "About Us", to: "/about-us", order: 0 },
        { label: "The SCSA and SEBWA", to: "/the-scsa-and-sebwa", order: 1 },
        { label: "SCSA International", to: "/scsa-international", order: 2 },
        { label: "SCSA International Team", to: "/scsa-international-team", order: 3 },
      ],
    },
    {
      label: "Why",
      to: "/why-us",
      order: 2,
      children: [
        { label: "Why Us", to: "/why-us", order: 0 },
        {
          label: "The Western Australian Curriculum",
          to: "/the-western-australian-curriculum",
          order: 1,
        },
        { label: "Western Australia", to: "/western-australia", order: 2 },
      ],
    },
    {
      label: "Programs",
      to: "/western-australian-curriculum-programs",
      order: 3,
      children: [
        { label: "Curriculum Programs", to: "/western-australian-curriculum-programs", order: 0 },
        { label: "WAM International (Year 12)", to: "/wam-international-year-12", order: 1 },
        {
          label: "WACE International (Years 11–12)",
          to: "/wace-international-years-11-and-12",
          order: 2,
        },
        {
          label: "WA K–10 International",
          to: "/wa-k-10-international-kindergarten-to-year-10",
          order: 3,
        },
        {
          label: "WA Early Years International",
          to: "/wa-early-years-international-kindergarten-to-year-2",
          order: 4,
        },
      ],
    },
    {
      label: "Apply",
      to: "/how-do-i-apply",
      order: 4,
      children: [
        { label: "How Do I Apply", to: "/how-do-i-apply", order: 0 },
        { label: "School Approval Process", to: "/school-approval-process", order: 1 },
      ],
    },
    {
      label: "Start Teaching",
      to: "/start-teaching",
      order: 5,
      children: [
        { label: "Start Teaching", to: "/start-teaching", order: 0 },
        { label: "Curriculum Activation Program", to: "/curriculum-activation-program", order: 1 },
        {
          label: "Professional Learning Pathways",
          to: "/professional-learning-pathways-and-support",
          order: 2,
        },
      ],
    },
  ],
  ctaButton: { label: "Contact Us", to: "/contact-us" },
};
