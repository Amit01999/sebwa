/**
 * One-time script: uploads the frontend's current static image assets
 * (src/assets/**) to Cloudinary, tagging each with a stable "seed:*" tag.
 * migrateContent.ts resolves those tags to real MediaAsset ids. Explicit
 * file->tag mapping (rather than blind directory iteration) so every tag
 * referenced by seed-data/pages/*.ts is guaranteed to have a matching
 * upload — run this before `npm run migrate`.
 *
 * Requires real CLOUDINARY_* credentials in .env; safe to re-run (each
 * upload just creates a new asset tagged the same way — the project this
 * was written for runs it once against a fresh Cloudinary account).
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { uploadFromPath } from "../services/cloudinary.service.js";
import { MediaAsset } from "../models/MediaAsset.js";
import { connectToDatabase } from "../db/connect.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// server/src/scripts -> repo root -> src/assets
const assetsRoot = path.resolve(__dirname, "../../../src/assets");

const files: { relativePath: string; tag: string }[] = [
  { relativePath: "Sebwa-Hero-Image.png", tag: "seed:hero-background" },
  { relativePath: "Programs-Image.png", tag: "seed:programs-hero" },
  { relativePath: "books-icon2.png", tag: "seed:programs-book-icon2" },

  {
    relativePath: "Universities/row1/Dhaka-University-150x100.png",
    tag: "seed:university-row1-dhaka",
  },
  {
    relativePath: "Universities/row1/Chittagong-University-150x100.png",
    tag: "seed:university-row1-chittagong",
  },
  {
    relativePath: "Universities/row1/harvard-university-150x100.png",
    tag: "seed:university-row1-harvard",
  },
  {
    relativePath: "Universities/row1/Cornell-University-150x100.png",
    tag: "seed:university-row1-cornell",
  },
  {
    relativePath: "Universities/row1/Auckland-University-150x100.png",
    tag: "seed:university-row1-auckland",
  },
  {
    relativePath: "Universities/row1/Brown-University-150x100.png",
    tag: "seed:university-row1-brown",
  },
  {
    relativePath: "Universities/row1/Columbia-University-150x100.png",
    tag: "seed:university-row1-columbia",
  },
  {
    relativePath: "Universities/row1/Australian-National-University-150x100.png",
    tag: "seed:university-row1-anu",
  },
  {
    relativePath: "Universities/row1/Dartmouth-College-150x100.png",
    tag: "seed:university-row1-dartmouth",
  },
  { relativePath: "Universities/row1/BUET-150x100.png", tag: "seed:university-row1-buet" },

  {
    relativePath: "Universities/row2/Monash-University-150x100.png",
    tag: "seed:university-row2-monash",
  },
  {
    relativePath: "Universities/row2/Hong-Kong-University-150x100.png",
    tag: "seed:university-row2-hongkong",
  },
  { relativePath: "Universities/row2/IIT-Mumbai-150x100.png", tag: "seed:university-row2-iit" },
  { relativePath: "Universities/row2/KAIST-150x100.png", tag: "seed:university-row2-kaist" },
  {
    relativePath: "Universities/row2/McGill-University-150x100.png",
    tag: "seed:university-row2-mcgill",
  },
  { relativePath: "Universities/row2/NUS-Singapore-150x100.png", tag: "seed:university-row2-nus" },
  {
    relativePath: "Universities/row2/University-of-Adelaide-150x100.png",
    tag: "seed:university-row2-adelaide",
  },
  {
    relativePath: "Universities/row2/Princeton-University-150x100.png",
    tag: "seed:university-row2-princeton",
  },
  {
    relativePath: "Universities/row2/University-of-Alberta-150x100.png",
    tag: "seed:university-row2-alberta",
  },
  {
    relativePath: "Universities/row2/Lund-University-150x100.png",
    tag: "seed:university-row2-lund",
  },

  {
    relativePath: "Universities/row3/University-of-Toronto-150x100.png",
    tag: "seed:university-row3-toronto",
  },
  {
    relativePath: "Universities/row3/University-of-British-Columbia-150x100.png",
    tag: "seed:university-row3-ubc",
  },
  {
    relativePath: "Universities/row3/University-of-Pennsylvania-150x100.png",
    tag: "seed:university-row3-penn",
  },
  {
    relativePath: "Universities/row3/University-of-Melbourne-150x100.png",
    tag: "seed:university-row3-melbourne",
  },
  {
    relativePath: "Universities/row3/University-of-Queensland-150x100.png",
    tag: "seed:university-row3-queensland",
  },
  {
    relativePath: "Universities/row3/University-of-Sydney-150x100.png",
    tag: "seed:university-row3-sydney",
  },
  { relativePath: "Universities/row3/UWA-150x100.png", tag: "seed:university-row3-uwa" },
  {
    relativePath: "Universities/row3/University-of-Toyko-150x100.png",
    tag: "seed:university-row3-tokyo",
  },
  { relativePath: "Universities/row3/UNSW-Sydney-150x100.png", tag: "seed:university-row3-unsw" },
  {
    relativePath: "Universities/row3/Yale-University-150x100.png",
    tag: "seed:university-row3-yale",
  },

  { relativePath: "footer/F1-1.png", tag: "seed:footer-accreditation-1" },
  { relativePath: "footer/F2-e1693126415655.png", tag: "seed:footer-accreditation-2" },
  {
    relativePath: "footer/WhatsApp-Image-2023-12-03-at-12.13.09.jpeg",
    tag: "seed:footer-accreditation-3",
  },
  { relativePath: "footer/F5.png", tag: "seed:footer-accreditation-4" },

  { relativePath: "Slide2.jpg", tag: "seed:the-scsa-and-sebwa-slide2" },
  { relativePath: "scsa-international/3.jpg", tag: "seed:scsa-international-3" },
  { relativePath: "scsa-international/Slide1.jpg", tag: "seed:scsa-international-slide1" },
];

async function main() {
  await connectToDatabase();

  for (const file of files) {
    const existing = await MediaAsset.findOne({ tags: file.tag }).lean();
    if (existing) {
      console.log(`skip: ${file.tag} already uploaded (publicId=${existing.publicId})`);
      continue;
    }

    const absolutePath = path.join(assetsRoot, file.relativePath);
    const result = await uploadFromPath(absolutePath, { folder: "sebwa/seed", tags: [file.tag] });

    await MediaAsset.create({
      publicId: result.public_id,
      url: result.secure_url,
      resourceType: result.resource_type === "video" ? "video" : "image",
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      altText: "",
      tags: [file.tag],
    });

    console.log(`uploaded: ${file.relativePath} -> ${file.tag} (${result.public_id})`);
  }

  console.log("\nDone.");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
