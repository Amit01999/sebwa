import type { FragmentSeed } from "./types.js";

// Transcribed from the `courses` array, byte-for-byte identical in both
// src/routes/wace-international-years-11-and-12.tsx and
// src/routes/wam-international-year-12.tsx (verified against git HEAD).
// Values are "Yes" strings or "" in the original — kept as strings here
// rather than coerced to booleans, so empty cells stay empty rather than
// becoming a rendered "No".
export const contentFragmentsSeed: FragmentSeed[] = [
  {
    key: "wace-wam-course-availability",
    type: "courseTable",
    data: {
      // The "(...)" suffix on each column groups it under a shared spanning
      // header in CourseTableRefBlock — this reproduces the original
      // table's two-row rowSpan/colSpan header ("WACE course" | "Southern
      // hemisphere academic calendar" ATAR/General | "Northern hemisphere
      // academic calendar" ATAR/General).
      columns: [
        "WACE course",
        "ATAR (Southern hemisphere academic calendar)",
        "General (Southern hemisphere academic calendar)",
        "ATAR (Northern hemisphere academic calendar)",
        "General (Northern hemisphere academic calendar)",
      ],
      rows: [
        { program: "Accounting and Finance", values: ["Yes", "Yes", "Yes", ""] },
        { program: "Applied Information Technology", values: ["Yes", "Yes", "", "Yes"] },
        { program: "Biology", values: ["Yes", "", "", ""] },
        { program: "Business Management and Enterprise", values: ["Yes", "Yes", "Yes", ""] },
        { program: "Career and Enterprise", values: ["Yes", "Yes", "", ""] },
        { program: "Chemistry", values: ["Yes", "", "Yes", ""] },
        { program: "Chinese: First Language", values: ["Yes", "", "", ""] },
        { program: "Chinese: Second Language", values: ["Yes", "", "", ""] },
        { program: "Computer Science", values: ["Yes", "Yes", "", "Yes"] },
        { program: "Design", values: ["", "Yes", "", ""] },
        { program: "Drama", values: ["", "Yes", "", ""] },
        { program: "Economics", values: ["Yes", "Yes", "Yes", ""] },
        { program: "Engineering", values: ["", "Yes", "", ""] },
        { program: "English", values: ["Yes", "Yes", "Yes", "Yes"] },
        {
          program: "English as an Additional Language or Dialect",
          values: ["Yes", "Yes", "Yes", ""],
        },
        { program: "Food Science and Technology", values: ["", "Yes", "", ""] },
        { program: "Human Biology", values: ["Yes", "", "Yes", ""] },
        { program: "Literature", values: ["Yes", "", "", ""] },
        { program: "Mathematics Applications", values: ["Yes", "", "Yes", ""] },
        { program: "Mathematics Essential", values: ["", "Yes", "", ""] },
        { program: "Mathematics Methods", values: ["Yes", "", "Yes", ""] },
        { program: "Mathematics Specialist", values: ["Yes", "", "Yes", ""] },
        { program: "Media Production and Analysis", values: ["Yes", "Yes", "", ""] },
        { program: "Modern History", values: ["Yes", "", "", ""] },
        { program: "Physics", values: ["Yes", "", "Yes", ""] },
        { program: "Politics and Law", values: ["", "Yes", "", ""] },
        { program: "Psychology", values: ["Yes", "", "Yes", ""] },
      ],
    },
  },
];
