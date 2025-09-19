import type { z } from "zod";
import type { summarizeSchema } from "./summarize.shema";

export type SummarizeTypes = z.infer<typeof summarizeSchema>;
