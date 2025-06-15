import { z } from "zod";

const assetsSchema = z
  .object({
    type: z.enum(["furniture", "equipment", "vehicles"]),
    classification: z
      .string()
      .min(1, "Classification cannot be empty")
      .max(50, "Classification cannot exceed 50 characters"),
    description: z
      .string()
      .min(1, "Description cannot be empty")
      .max(200, "Description cannot exceed 200 characters"),
    color: z
      .string()
      .min(1, "Color cannot be empty")
      .max(20, "Color cannot exceed 20 characters"),
    brand: z
      .string()
      .min(1, "Brand cannot be empty")
      .max(20, "Brand cannot exceed 20 characters"),
    model: z
      .string()
      .min(1, "Model cannot be empty")
      .max(20, "Model cannot exceed 20 characters"),
    serial: z
      .string()
      .max(20, "Serial number cannot exceed 20 characters")
      .optional(),
    height: z.number().nonnegative().optional(),
    width: z.number().nonnegative().optional(),
    depth: z.number().nonnegative().optional(),
    plate: z.string().optional(),
    bodywork: z.string().optional(),
    engine: z.string().optional(),
    year_of_the_vehicle: z.number().int().optional(),
    acquisition_value: z.number().nonnegative(),
    use_status: z.enum(["optimal", "average", "appalling"]),
    conservation_status: z.enum(["operational", "inoperative"]),
    observation: z
      .string()
      .max(200, "Observation cannot exceed 200 characters")
      .optional(),
    physical_location: z
      .string()
      .min(1, "Physical location cannot be empty")
      .max(100, "Physical location cannot exceed 100 characters"),
    direction_dependency: z
      .string()
      .min(1, "Direction dependency cannot be empty")
      .max(100, "Direction dependency cannot exceed 100 characters"),
    level: z
      .string()
      .min(1, "Level cannot be empty")
      .max(20, "Level cannot exceed 20 characters"),
    analyst: z
      .string()
      .min(1, "Analyst cannot be empty")
      .max(50, "Analyst cannot exceed 50 characters"),
  })

  //----------------------------------------------------------------

  .superRefine((data, ctx) => {
    if (data.type === "vehicles") {
      if (!data.plate)
        ctx.addIssue({
          path: ["plate"],
          message: "Vehicles must have a plate number",
        });
      if (!data.bodywork)
        ctx.addIssue({
          path: ["bodywork"],
          message: "Vehicles must have a bodywork identifier",
        });
      if (!data.engine)
        ctx.addIssue({
          path: ["engine"],
          message: "Vehicles must have an engine number",
        });
      if (!data.year_of_the_vehicle)
        ctx.addIssue({
          path: ["year_of_the_vehicle"],
          message: "Vehicles must have a manufacturing year",
        });
    }

    if (data.type === "furniture") {
      if (!data.height)
        ctx.addIssue({
          path: ["height"],
          message: "Furniture must have a height",
        });
      if (!data.width)
        ctx.addIssue({
          path: ["width"],
          message: "Furniture must have a width",
        });
      if (!data.depth)
        ctx.addIssue({
          path: ["depth"],
          message: "Furniture must have a depth",
        });
      if (
        data.plate ||
        data.bodywork ||
        data.engine ||
        data.year_of_the_vehicle
      ) {
        ctx.addIssue({
          path: ["plate", "bodywork", "engine", "year_of_the_vehicle"],
          message:
            "Furniture should not have a plate, engine, or bodywork identifier",
        });
      }
    }

    if (data.type === "equipment") {
      if (
        data.plate ||
        data.bodywork ||
        data.engine ||
        data.year_of_the_vehicle
      ) {
        ctx.addIssue({
          path: ["plate", "bodywork", "engine", "year_of_the_vehicle"],
          message:
            "Equipment should not have a plate, engine, or bodywork identifier",
        });
      }
    }
  });

export default assetsSchema;
