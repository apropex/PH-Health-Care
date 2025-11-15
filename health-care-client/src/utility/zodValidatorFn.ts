/* eslint-disable @typescript-eslint/no-explicit-any */

import { ZodObject } from "zod";

export interface iZodValidatorReturns<T = unknown> {
  success: boolean;
  errors?: {
    field: PropertyKey;
    message: string;
  }[];
  data?: T;
}

export const zodParseResult = <T>(
  payload: T,
  zodObject: ZodObject
): iZodValidatorReturns<T> => {
  const zodRes = zodObject.safeParse(payload);

  if (!zodRes.success)
    return {
      success: false,
      errors: zodRes?.error?.issues.map((issue: any) => ({
        field: issue.path[0],
        message: issue.message,
      })),
    };

  return zodRes as iZodValidatorReturns<T>;
};

export const getZodError = (state: any, fieldName: string): string | null => {
  if (state?.errors) {
    return state.errors.find((error: any) => error.field === fieldName)?.message;
  } else return null;
};
