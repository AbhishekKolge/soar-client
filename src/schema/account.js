import { z } from "zod";

export const addAccountSchema = z.object({
  imageUrl: z.any().optional(),
  number: z
    .string()
    .trim()
    .max(16, {
      message: "Account number is not valid",
    })
    .min(16, {
      message: "Account number is not valid",
    }),
  name: z
    .string()
    .trim()
    .max(50, {
      message: "Max 50 characters allowed",
    })
    .min(3, {
      message: "Min 3 characters required",
    }),
  identity: z
    .string()
    .trim()
    .max(50, {
      message: "Max 50 characters allowed",
    })
    .min(3, {
      message: "Min 3 characters required",
    })
    .optional()
    .nullable(),
  bank: z.object({
    id: z.string().trim().min(1, {
      message: "Required",
    }),
    name: z.string().trim().min(1, {
      message: "Required",
    }),
  }),
});

export const updateAccountSchema = z.object({
  imageUrl: z.any().optional(),
  number: z
    .string()
    .trim()
    .max(16, {
      message: "Account number is not valid",
    })
    .min(16, {
      message: "Account number is not valid",
    }),
  name: z
    .string()
    .trim()
    .max(50, {
      message: "Max 50 characters allowed",
    })
    .min(3, {
      message: "Min 3 characters required",
    }),
  identity: z
    .string()
    .trim()
    .max(50, {
      message: "Max 50 characters allowed",
    })
    .min(3, {
      message: "Min 3 characters required",
    })
    .optional()
    .nullable(),
  bank: z.object({
    id: z.string().trim().min(1, {
      message: "Required",
    }),
    name: z.string().trim().min(1, {
      message: "Required",
    }),
  }),
});
