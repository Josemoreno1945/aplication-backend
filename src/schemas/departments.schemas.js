import { z } from "zod";

const departmentSchema = z.object({
  name: z
    .string()
    .min(1, "Department name cannot be empty")
    .max(100, "Department name cannot exceed 100 characters"),
  address: z
    .string()
    .min(1, "Address cannot be empty")
    .max(150, "Address cannot exceed 150 characters"),
  phone: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only digits")
    .min(11, "Phone number must have at least 11 characters")
    .max(15, "Phone number cannot exceed 15 characters"),
  email: z.string().email("Must be a valid email"),
  operational_status: z.enum(["active", "inactive"]),
});

export default departmentSchema;
