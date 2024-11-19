import { z } from "zod";

export const addCreditCardSchema = z.object({
  number: z
    .string()
    .trim()
    .max(16, {
      message: "Card number is not valid",
    })
    .min(16, {
      message: "Card number is not valid",
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
  isSelected: z.boolean(),
  validity: z.string().datetime({ offset: true }),
  pin: z
    .string()
    .trim()
    .min(6, {
      message: "Code is not valid",
    })
    .max(6, {
      message: "Code is not valid",
    }),
});

export const updateCreditCardSchema = z.object({
  name: z
    .string()
    .trim()
    .max(50, {
      message: "Max 50 characters allowed",
    })
    .min(3, {
      message: "Min 3 characters required",
    })
    .optional(),
  isSelected: z.boolean().optional(),
  pin: z
    .string()
    .trim()
    .min(6, {
      message: "Code is not valid",
    })
    .max(6, {
      message: "Code is not valid",
    })
    .optional(),
});
