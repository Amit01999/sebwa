import { FormSubmission } from "../models/FormSubmission.js";

function randomDigits(length: number) {
  let digits = "";
  for (let i = 0; i < length; i++) digits += Math.floor(Math.random() * 10);
  return digits;
}

export async function generateReferenceId(): Promise<string> {
  const year = new Date().getFullYear();

  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = `SEBWA-${year}-${randomDigits(6)}`;
    const exists = await FormSubmission.exists({ referenceId: candidate });
    if (!exists) return candidate;
  }

  // Extremely unlikely fallback: timestamp-based, effectively unique.
  return `SEBWA-${year}-${Date.now().toString().slice(-6)}`;
}
