import type { PageSeed } from "../types.js";

export const aboutUsPage: PageSeed = {
  slug: "about-us",
  title: "About Us",
  seo: {
    title: "About Us — SEBWA",
    description:
      "Learn about Sunshine Grammar School, SEBWA and the School Curriculum and Standards Authority of Western Australia.",
  },
  sections: [
    { type: "pageHero", data: { title: "About Us" } },
    {
      type: "richContent",
      data: {
        intro:
          "Sunshine Education Bangladesh WACE Australia (SEBWA) brings the Western Australian curriculum to schools across Bangladesh through a partnership between Sunshine Grammar School and the School Curriculum and Standards Authority (SCSA).",
        blocks: [
          { type: "h2", text: "Sunshine Grammar School (SGS)" },
          {
            type: "p",
            text: "Sunshine Grammar School (SGS), owned by Sunshine Education Group (SEG), is a pioneer in English medium education in Bangladesh and was the first English medium school in Chattogram. SGS aims to provide a stimulating and challenging learning environment that enables students to develop a strong capacity for learning and the operating skills required to excel in a highly competitive and rapidly changing world. Since 1985, SGS has provided an innovative and positive approach to the development of its students' futures and has a proud academic history. Its students receive outstanding academic results, and its staff are recognised nationally and internationally for their teaching quality.",
          },
          { type: "h2", text: "Sunshine Education Bangladesh WACE Australia (SEBWA)" },
          {
            type: "p",
            text: "The next stage in SGS's journey of providing a world-class curriculum is making it accessible to more students and schools across Bangladesh. Following extensive research and discussions — including a Bangladesh delegation visit to Perth and a Western Australian ministerial mission to Bangladesh — SGS and the SCSA have partnered to expand the delivery of the Western Australian curriculum to a network of schools across Bangladesh under SEBWA. SEBWA is supported by the Chattogram and Dhaka Boards of Study, the Government of Western Australia and Austrade.",
          },
          { type: "h2", text: "School Curriculum and Standards Authority (SCSA)" },
          {
            type: "p",
            text: "The SCSA is the Western Australian Government certification authority responsible for the Western Australian curriculum from Kindergarten to Year 12. It reports directly to the Western Australian Ministers for Education, International Education and Early Childhood Studies, and is governed by a board of educators with experience in curriculum, assessment, measurement, school leadership and policy. Since 1987, the SCSA has been licensing international schools to deliver its curriculum programs globally.",
          },
          { type: "h3", text: "International recognition" },
          {
            type: "ul",
            items: [
              "Effective approach to curriculum design and certification standards.",
              "Rigorous assessment standards and moderation procedures informed by current research.",
              "ATAR courses that develop transferable personal, social and intercultural capabilities.",
              "Senior secondary English courses (EAL/D, English and Literature) that meet university English proficiency requirements internationally.",
            ],
          },
          {
            type: "p",
            text: "SEBWA facilitates introductions between interested schools and the SCSA, supports schools with the licensing application process, and assists approved schools with implementation of the Western Australian curriculum.",
          },
        ],
      },
    },
  ],
};
