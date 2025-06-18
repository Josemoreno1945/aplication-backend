import { z } from "zod";

const reportSchema = z.object({
    priority: z
    .enum(["low", "medium", "high"]),
    description: z
    .string()
    .min(1, "The description cannot be empty")
    .max(100, "The description cannot exceed 100 characters")
});

export default reportSchema;