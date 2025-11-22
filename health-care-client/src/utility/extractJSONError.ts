/* eslint-disable @typescript-eslint/no-explicit-any */
export function extractJSONError(input: unknown) {
  const errorStr =
    typeof input === "string"
      ? input
      : (input as any)?.message || (input as any)?.toString?.() || JSON.stringify(input);

  const match = errorStr.match(/({[\s\S]*})/);
  if (!match) return null;

  try {
    const json = JSON.parse(match[1]);
    return {
      success: json.success ?? false,
      message: json.message,
    };
  } catch {
    return {};
  }
}
