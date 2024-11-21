import { z } from "zod";

export const transferAmountSchema = z.object({
  amount: z
    .string()
    .trim()
    .min(1, {
      message: "Required",
    })
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Amount must be a valid number" })
    .refine((val) => parseFloat(val) > 0, {
      message: "Amount must be greater than 0",
    }),
  pin: z
    .string()
    .trim()
    .length(6, { message: "Pin must be exactly 6 digits" })
    .regex(/^\d+$/, { message: "Pin must only contain numbers" }),
});

export const amountSchema = z.object({
  amount: z
    .string()
    .trim()
    .min(1, {
      message: "Required",
    })
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Amount must be a valid number" })
    .refine((val) => parseFloat(val) > 0, {
      message: "Amount must be greater than 0",
    }),
});
