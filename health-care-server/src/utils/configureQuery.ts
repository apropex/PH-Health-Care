//

//* QUERY CONFIGURATION *\\

import pickQuery from "./pickQuery";

export default function configureQuery<
  T extends Record<string, unknown>,
  K extends keyof T,
>(query: T, ...keys: K[]) {
  const { limit, sortBy, sortOrder, search } = query;
  const filters = pickQuery(query, ...keys);

  const page = Number(query.page || "1");
  const take = Number(limit || "12");
  const skip = (page - 1) * take;
  const orderBy = {
    [(sortBy as string) || "createdAt"]: sortOrder === "asc" ? "asc" : "desc",
  };

  return { page, take, skip, orderBy, search, filters };
}

export function checkBoolean<T extends Record<string, unknown>, K extends keyof T>(
  query: T | null | undefined,
  ...keys: K[]
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
