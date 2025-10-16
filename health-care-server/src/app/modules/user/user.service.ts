//

//* USER SERVICES *//

import { Prisma } from "@prisma/client";
import configureQuery, {
  getSearchFilters,
} from "../../../utils/configureQuery";
import { iQuery } from "../../shared/global-query-interfaces";
import { prisma } from "../../shared/prisma";
import {
  userBooleanFields,
  userFilterFields,
  userSearchFields,
} from "./user.constants";
// import { iCreateAdmin, iCreateDoctor, iCreatePatient } from "./user.interface";

const getAllUsers = async (query: iQuery) => {
  const { page, take, skip, orderBy, search, filters } = configureQuery(query, {
    filterFields: userFilterFields,
    booleanFields: userBooleanFields,
  });

  const where = getSearchFilters({
    searchFields: userSearchFields,
    search,
    filters,
  }) as Prisma.UserWhereInput;

  const [users, total_data, filtered_data] = await Promise.all([
    prisma.user.findMany({ where, skip, take, orderBy }),
    prisma.user.count(),
    prisma.user.count({ where }),
  ]);

  return {
    data: users,
    meta: {
      total_data,
      filtered_data,
      total_page: Math.ceil(filtered_data / take),
      present_page: page,
      skip,
      limit: take,
    },
  };
};

export default {
  getAllUsers,
};
