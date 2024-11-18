import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";

export const zContactNumber = z
  .string()
  .optional()
  .nullable()
  .refine(
    (value) => {
      if (!value) return true;
      const phoneNumber = parsePhoneNumberFromString(value, {
        extract: false,
        defaultCountry: "IN",
      });
      return phoneNumber ? phoneNumber.isValid() : false;
    },
    {
      message: "Contact number is not valid",
    }
  );

export const zPasswordSchema = z
  .string()
  .trim()
  .max(50, { message: "Max 50 characters allowed" })
  .min(8, { message: "Min 8 characters required" })
  .regex(/[a-z]/, {
    message: "Min 1 lowercase character required",
  })
  .regex(/[A-Z]/, {
    message: "Min 1 uppercase character required",
  })
  .regex(/[0-9]/, {
    message: "Min 1 number required",
  })
  .regex(/[\W_]/, {
    message: "Min 1 special character required",
  });
