/* eslint-disable @typescript-eslint/no-explicit-any */

import z from "zod";

export interface iZodValidatorReturns {
  success: boolean;
  errors?: {
    field: PropertyKey;
    message: string;
  }[];
}

export const zodErrorReturn = <T>(
  zodRes: z.ZodSafeParseResult<T>
): iZodValidatorReturns => ({
  success: false,
  errors: zodRes?.error?.issues.map((issue: any) => ({
    field: issue.path[0],
    message: issue.message,
  })),
});

export const getZodError = (state: any, fieldName: string): string | null => {
  if (state?.errors) {
    return state.errors.find((error: any) => error.field === fieldName)?.message;
  } else return null;
};
