import type { PageSeed } from "../types.js";

// Transcribed from src/routes/index.tsx and the Hero/About/Programs/
// WhyWace/Universities/CTA components it composes.
export const homePage: PageSeed = {
  slug: "home",
  title: "Home",
  seo: {
    title: "SEBWA — Sunshine Education Bangladesh WACE Australia",
    description:
      "SEBWA brings the Western Australian Curriculum to schools across Bangladesh — world-class programs, structured support and professional learning.",
  },
  sections: [
    {
      type: "hero",
      data: {
        backgroundImage: "seed:hero-background",
        eyebrowLines: [
          "The Western Australian Curriculum",
          "A Fresh Approach for Effective English Medium Curriculum Delivery",
        ],
        heading: "Join SEBWA's family of schools leading the way to a world of opportunity.",
        ctaLabel: "Find Out More",
        ctaHref: "#about",
      },
    },
    {
      type: "about",
      data: {
        eyebrow: "Why|",
        lead: "The School Curriculum and Standards Authority takes a holistic approach to the support it provides to oversee schools, which is informed by more than 34 years of operating its international education program.",
        bullets: [
          "Ongoing tailored expert support.",
          "Access to tools to monitor and report on student progress.",
          "Curriculum and assessment resources which enable effective teaching practices.",
          "Resources reflect teaching in diverse international contexts.",
          "Extensive professional learning accessible through flexible modes of delivery.",
        ],
        video: {
          provider: "vimeo",
          videoId: "727191185",
          h: "4809a8fffc",
          title: "A World of Opportunity",
        },
        closing: "A World of Opportunity Awaits",
      },
    },
    {
      type: "programsGrid",
      data: {
        heading: "Programs|",
        heroImage: "seed:programs-hero",
        icon: "seed:programs-book-icon2",
        items: [
          { title: "WAM International", sub: "(Year-12)" },
          { title: "WACE International", sub: "(Year 11 and 12)" },
          { title: "WA K-10 International", sub: "(Kindergarten to Year-10)" },
          { title: "WA Early Years International", sub: "(Kindergarten to Year-2)" },
        ],
      },
    },
    {
      type: "whyWace",
      data: {
        heading: "Why WACE?",
        paragraph:
          "The Western Australian Certificate of Education (WACE) is a highly regarded high school graduation certificate that is recognised by all the leading universities around the world. A WACE educational certification is your gateway to strong future opportunities, whether in a preferred tertiary degree qualification or entering the workforce.",
        bullets: [
          "50% Coursework & 50% Exam",
          "Emphasis on Applied Learning & Job Readiness",
          "Recognised by all leading universities of the world",
          "WACE graduates are prioritised for Prestigious Scholarships offered by Universities located in Western Australia",
        ],
      },
    },
    {
      type: "universitiesGrid",
      data: {
        heading: "Acceptance in World's Leading Universities",
        rows: [
          [
            { mediaAssetId: "seed:university-row1-dhaka", alt: "Dhaka University" },
            { mediaAssetId: "seed:university-row1-chittagong", alt: "Chittagong University" },
            { mediaAssetId: "seed:university-row1-harvard", alt: "Harvard University" },
            { mediaAssetId: "seed:university-row1-cornell", alt: "Cornell University" },
            { mediaAssetId: "seed:university-row1-auckland", alt: "Auckland University" },
            { mediaAssetId: "seed:university-row1-brown", alt: "Brown University" },
            { mediaAssetId: "seed:university-row1-columbia", alt: "Columbia University" },
            { mediaAssetId: "seed:university-row1-anu", alt: "Australian National University" },
            { mediaAssetId: "seed:university-row1-dartmouth", alt: "Dartmouth College" },
            { mediaAssetId: "seed:university-row1-buet", alt: "BUET" },
          ],
          [
            { mediaAssetId: "seed:university-row2-monash", alt: "Monash University" },
            { mediaAssetId: "seed:university-row2-hongkong", alt: "Hong Kong University" },
            { mediaAssetId: "seed:university-row2-iit", alt: "IIT Mumbai" },
            { mediaAssetId: "seed:university-row2-kaist", alt: "KAIST" },
            { mediaAssetId: "seed:university-row2-mcgill", alt: "McGill University" },
            { mediaAssetId: "seed:university-row2-nus", alt: "NUS Singapore" },
            { mediaAssetId: "seed:university-row2-adelaide", alt: "University of Adelaide" },
            { mediaAssetId: "seed:university-row2-princeton", alt: "Princeton University" },
            { mediaAssetId: "seed:university-row2-alberta", alt: "University of Alberta" },
            { mediaAssetId: "seed:university-row2-lund", alt: "Lund University" },
          ],
          [
            { mediaAssetId: "seed:university-row3-toronto", alt: "University of Toronto" },
            { mediaAssetId: "seed:university-row3-ubc", alt: "University of British Columbia" },
            { mediaAssetId: "seed:university-row3-penn", alt: "University of Pennsylvania" },
            { mediaAssetId: "seed:university-row3-melbourne", alt: "University of Melbourne" },
            { mediaAssetId: "seed:university-row3-queensland", alt: "University of Queensland" },
            { mediaAssetId: "seed:university-row3-sydney", alt: "University of Sydney" },
            { mediaAssetId: "seed:university-row3-uwa", alt: "UWA" },
            { mediaAssetId: "seed:university-row3-tokyo", alt: "University of Tokyo" },
            { mediaAssetId: "seed:university-row3-unsw", alt: "UNSW Sydney" },
            { mediaAssetId: "seed:university-row3-yale", alt: "Yale University" },
          ],
        ],
      },
    },
    {
      type: "cta",
      data: {
        heading: "World-Class Curriculum, Structured Support and Professional Learning",
        ctaLabel: "Get Connected With Us",
        ctaHref: "/contact-us",
      },
    },
  ],
};
