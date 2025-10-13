/*

export function pick<T extends Record<string, unknown>, K extends keyof T>(
  query: T,
  ...keys: K[]
): Partial<T> {
  const selectedQuery: Partial<T> = {};

  for (const key of keys) {
    if (query && Object.hasOwnProperty.call(query, key)) {
      selectedQuery[key] = query[key];
    }
  }

  return selectedQuery;
}

export function _pickQuery(
  query: iSearchQuery,
  ...keys: string[]
): Partial<iSearchQuery> {
  const selectedQuery: Partial<iSearchQuery> = {};

  keys.forEach((key) => {
    if (Object.hasOwnProperty.call(query, key)) {
      selectedQuery[key] = query[key];
    }
  });

  return selectedQuery;
}

*/

export default function pickQuery<
  T extends Record<string, unknown>,
  K extends keyof T,
>(query: T | null | undefined, ...keys: K[]): Partial<Pick<T, K>> {
  const selectedQuery: Partial<Pick<T, K>> = {};

  if (!query || Object.keys(query).length <= 0) return selectedQuery;

  keys.forEach((key) => {
    if (Object.hasOwnProperty.call(query, key)) {
      selectedQuery[key] = query[key];
    }
  });

  return selectedQuery;
}
