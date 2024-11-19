import { z } from "zod";
import { zContactNumber } from "./general";

export const updateUserSchema = z
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
    dob: z.string().datetime({ offset: true }).optional().nullable(),
    contactNumber: zContactNumber,
    contactCountryId: z.string().trim().optional().nullable(),
    present: z
      .string()
      .trim()
      .max(200, {
        message: "Max 200 characters allowed",
      })
      .optional()
      .nullable(),
    permanent: z
      .string()
      .trim()
      .max(200, {
        message: "Max 200 characters allowed",
      })
      .optional()
      .nullable(),
    city: z
      .string()
      .trim()
      .max(50, {
        message: "Max 50 characters allowed",
      })
      .optional()
      .nullable(),
    postalCode: z
      .string()
      .trim()
      .max(10, {
        message: "Max 10 characters allowed",
      })
      .optional()
      .nullable(),
    countryId: z.string().trim().optional().nullable(),
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

export const updateSecuritySchema = z.object({
  twoFactorAuth: z.boolean(),
});

export const deleteProfileSchema = z.object({
  email: z.string().trim().email({
    message: "Email is not valid",
  }),
});

export const updatePreferenceSchema = z.object({
  transactionAlert: z.boolean(),
  loginAlert: z.boolean(),
});
