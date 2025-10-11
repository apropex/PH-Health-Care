//

//* CHECK BOOLEAN
export function checkBoolean<T extends Record<string, unknown>, K extends keyof T>(
  query: T | null | undefined,
  keys: K[],
): T {
  if (!query) return {} as T;

  const selectedQuery = { ...query };

  keys.forEach((key) => {
    if (Object.hasOwnProperty.call(query, key)) {
      const value = query[key];
      if (value === "true") selectedQuery[key] = true as T[K];
      else if (value === "false") selectedQuery[key] = false as T[K];
    }
  });

  return selectedQuery;
}

//* CHECK NUMBER
export function checkNumber<T extends Record<string, unknown>, K extends keyof T>(
  query: T | null | undefined,
  ...keys: K[]
): T {
  if (!query) return {} as T;

  const selectedQuery = { ...query };

  keys.forEach((key) => {
    if (Object.hasOwnProperty.call(query, key)) {
      const value = Number(query[key]);
      if (value || value === 0) selectedQuery[key] = value as T[K];
    }
  });

  return selectedQuery;
}

//* CHECK BOOLEAN AND NUMBER TOGETHER
export function checkBooleanAndNumber<
  T extends Record<string, unknown>,
  K extends keyof T,
>(query: T | null | undefined, b_keys?: K[], n_keys?: K[]): T {
  if (!query) return {} as T;

  const selectedQuery = { ...query };

  b_keys?.forEach((key) => {
    if (Object.hasOwnProperty.call(query, key)) {
      const value = query[key];
      if (value === "true") selectedQuery[key] = true as T[K];
      else if (value === "false") selectedQuery[key] = false as T[K];
    }
  });

  n_keys?.forEach((key) => {
    if (Object.hasOwnProperty.call(query, key)) {
      const value = Number(query[key]);
      if (value) selectedQuery[key] = value as T[K];
    }
  });

  return selectedQuery;
}
