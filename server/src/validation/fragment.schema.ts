import { z } from "zod";

export const upsertFragmentSchema = z.object({
  type: z.literal("courseTable"),
  data: z.object({
    columns: z.array(z.string()),
    rows: z.array(
      z.object({
        program: z.string(),
        values: z.array(z.union([z.boolean(), z.string()])),
      }),
    ),
  }),
});
