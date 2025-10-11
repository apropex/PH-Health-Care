//

//* QUERY CONFIGURATION *\\

import { iQuery } from "../app/shared/global-query-interfaces";
import pickQuery from "./pickQuery";

//* CONFIGURE QUERY
export default function configureQuery<
  T extends Record<string, unknown>,
  K extends keyof T,
>(query: T, keys: K[]) {
  const { limit, sortBy, sortOrder, search = "" } = query;
  const filters = pickQuery(query, ...keys);

  const page = Number(query.page || "1");
  const take = Number(limit || "12");
  const skip = (page - 1) * take;
  const orderBy = {
    [(sortBy as string) || "createdAt"]: sortOrder === "asc" ? "asc" : "desc",
  };

  return { page, take, skip, orderBy, search, filters };
}

//* GET SEARCH FILTERS
interface iWhereInputs {
  OR: { [key: string]: { contains: string; mode: "insensitive" } }[];
  AND: { [key: string]: string }[];
}

export function getSearchFilters<T extends iWhereInputs>(
  searchFields: string[],
  search: string,
  filters: iQuery,
): T {
  const where: T = {} as T;

  if (search) {
    where.OR = searchFields.map((field) => ({
      [field]: { contains: search as string, mode: "insensitive" },
    }));
  }

  if (filters && Object.keys(filters).length > 0) {
    where.AND = Object.keys(filters).map((key) => ({
      [key]: (filters as Record<string, string>)[key],
    }));
  }

  return where;
}

/*
  const where: Prisma.UserWhereInput = {};

  if (search) {
    where.OR = userSearchFields.map((field) => ({
      [field]: { contains: search as string, mode: "insensitive" },
    }));
  }

  if (filters && Object.keys(filters).length > 0) {
    where.AND = Object.keys(filters).map((key) => ({
      [key]: (filters as Record<string, string>)[key],
    }));
  }
  */
