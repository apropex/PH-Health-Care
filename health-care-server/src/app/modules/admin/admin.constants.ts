import { iAdminSearchQuery } from "../../shared/global-query-interfaces";

//* ADMIN CONSTANTS *\\
type iAdmin = (keyof iAdminSearchQuery)[];

export const adminFilterFields: iAdmin = [
  "email",
  "name",
  "contactNumber",
  "isDeleted",
];
export const adminSearchFields: iAdmin = ["email", "name", "contactNumber"];
export const adminBooleanFields: iAdmin = ["isDeleted"];
