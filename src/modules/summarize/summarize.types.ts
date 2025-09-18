import type { z } from "zod";
import type { summarizeSchema } from "./summariza.shema";

export type SummarizeTypes = z.infer<typeof summarizeSchema>;
