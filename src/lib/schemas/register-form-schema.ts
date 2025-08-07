import { z } from "zod";
export const GOALS = [
  "Gain weight",
  "Lose weight",
  "Get fitter",
  "Gain more flexible",
  "Learn the basics",
] as const;

export const ACTIVITYlEVEL = ["level1", "level2", "level3", "level4", "level5"] as const;
// Step 1 schema (Personal Information)
const step1BaseSchema = z.object({
  firstName: z
    .string({ required_error: "register-first-name-required" })
    .min(1, { message: "register-first-name-required" })
    .min(2, { message: "register-firstName-min" })
    .max(35, { message: "register-firstName-max" }),
  lastName: z
    .string({ required_error: "register-last-name-required" })
    .min(1, { message: "register-last-name-required" })
    .min(2, { message: "register-lastName-min" })
    .max(35, { message: "register-firstName-max" }),
  email: z
    .string({ required_error: "register-email-required" })
    .min(1, { message: "register-email-required" })
    .email({ message: "register-email-valid" }),
  password: z
    .string({ required_error: "register-password-required" })
    .min(1, { message: "register-password-required" })
    .min(8, { message: "register-password-min" })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/, {
      message: "register-password-weak",
    }),
  rePassword: z
    .string({ required_error: "register-rePassword-required" })
    .min(1, { message: "register-rePassword-required" }),
});

export const step1Schema = step1BaseSchema.refine(
  (data) => {
    return data.password === data.rePassword;
  },
  {
    message: "register-password-not-match",
    path: ["rePassword"],
  }
);

// Step 2 schema (Gender)
export const step2Schema = z.object({
  gender: z.enum(["male", "female"], {
    required_error: "register-gender-required",
    invalid_type_error: "error",
  }),
});
// Step 3 schema (Age)
export const step3Schema = z.object({
  age: z
    .number({ required_error: "register-age-required" })
    .min(13, { message: "register-age-min" })
    .max(85, { message: "register-age-max" }),
});
// Step 4 schema (Weight)
export const step4Schema = z.object({
  weight: z
    .number({ required_error: "register-weight-required" })
    .min(20, { message: "register-weight-min" })
    .max(200, { message: "register-weight-max" }),
});

// Step 5 schema (Height)
export const step5Schema = z.object({
  height: z
    .number({ required_error: "register-height-required" })
    .min(50, { message: "register-height-min" })
    .max(250, { message: "register-height-max" }),
});

// Step 6 schema (Goal)
export const step6Schema = z.object({
  goal: z.enum(GOALS, { required_error: "register-gaol-required" }),
});

// Step 7 schema (Activity Level)
export const step7Schema = z.object({
  activityLevel: z.enum(["level1", "level2", "level3", "level4", "level5"], {
    required_error: "rgister-activity-level-required",
  }),
});

// Combined schema for final validation
export const baseRegisterSchema = z
  .object({
    ...step1BaseSchema.shape,
    ...step2Schema.shape,
    ...step3Schema.shape,
    ...step4Schema.shape,
    ...step5Schema.shape,
    ...step6Schema.shape,
    ...step7Schema.shape,
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });
