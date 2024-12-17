import { z } from "zod";

export const SearchSchema = z.object({
  city: z.string(),
});
