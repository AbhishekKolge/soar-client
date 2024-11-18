import { z } from "zod";
import { zContactNumber, zPasswordSchema } from "./general";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .max(50, {
        message: "Max 50 characters allowed",
      })
      .min(3, {
        message: "Min 3 characters required",
      }),
    username: z
      .string()
      .trim()
      .max(50, {
        message: "Max 50 characters allowed",
      })
      .min(3, {
        message: "Min 3 characters required",
      }),
    email: z.string().trim().email({
      message: "Email is not valid",
    }),
    password: zPasswordSchema,
    dob: z.string().datetime({ offset: true }).optional().nullable(),
    contactNumber: zContactNumber,
    contactCountryId: z.string().trim().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.contactNumber && !data.contactCountryId) {
      ctx.addIssue({
        path: ["contactCountryId"],
        message: "Country is required",
      });
    }
    if (!data.contactNumber && data.contactCountryId) {
      ctx.addIssue({
        path: ["contactNumber"],
        message: "Number is required",
      });
    }
  });

export const loginSchema = z.object({
  email: z.string().trim().email({
    message: "Email is not valid",
  }),
  password: zPasswordSchema,
});

export const verifySchema = z.object({
  email: z.string().trim().email({
    message: "Email is not valid",
  }),
  code: z.string().trim().min(6, {
    message: "Code is not valid",
  }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email({
    message: "Email is not valid",
  }),
});

export const resetPasswordSchema = z.object({
  email: z.string().trim().email({
    message: "Email is not valid",
  }),
  code: z.string().trim().min(6, {
    message: "Code is not valid",
  }),
  password: zPasswordSchema,
});
