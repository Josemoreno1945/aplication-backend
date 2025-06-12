import { z } from "zod";

//name, address, phone, email, operational_status

const departmentSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre de departamento debe tener minimo 10 caracteres"),
  address: z.string().min(1, "La direccion debe tener minimo 10 caracteres"),
  phone: z
    .string()
    .min(12, "El numero debe tener al menos 12 caracteres")
    .max(15, "El numero no debe tener mas de 12 caracteres"),
  email: z.string().email("Debe ser un correo válido"),
  operational_status: z.enum(["active", "inactive"]),
});

export default departmentSchema;
