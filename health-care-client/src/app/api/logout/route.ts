/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteCookie } from "@/proxy-utils/cookie";
import { NextResponse } from "next/server";

export const DELETE = async () => {
  try {
    // await deleteCookie("all", false);
    await deleteCookie("accessToken", false);
    await deleteCookie("refreshToken", false);

    return NextResponse.json(
      { success: true, message: "User logged out successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "User logged out failed" },
      { status: 500 }
    );
  }
};
