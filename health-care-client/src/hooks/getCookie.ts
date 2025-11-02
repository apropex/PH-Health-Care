import { headers } from "next/headers";

export async function getCookie(): Promise<string> {
  return (await headers()).get("cookie") ?? "";
}
