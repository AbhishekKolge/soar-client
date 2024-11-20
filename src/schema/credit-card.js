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
    .length(6, { message: "Pin must be exactly 6 digits" })
    .regex(/^\d+$/, { message: "Pin must only contain numbers" }),
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
    .length(6, { message: "Pin must be exactly 6 digits" })
    .regex(/^\d+$/, { message: "Pin must only contain numbers" })
    .optional(),
});
