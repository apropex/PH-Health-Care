/* eslint-disable @typescript-eslint/no-explicit-any */

export const errorResponse = (error: any, message?: string) => {
  console.error("🚨 ========================", error, "======================== 🚨");

  return {
    success: false,
    message: message || error.message || "Internal server error",
    data: null,
  };
};
