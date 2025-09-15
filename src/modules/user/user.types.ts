import type z from "zod";
import type { userSchema } from "./user.schema";

export type UserTypes = z.infer<typeof userSchema>;
