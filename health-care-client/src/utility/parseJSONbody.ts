//

import { iResponse } from "@/interfaces";

export default async function parseJSONbody<T>(
  res: Response
): Promise<iResponse<T | null>> {
  try {
    return await res.json();
  } catch {
    return { success: false, message: "Invalid response from server", data: null };
  }
}
