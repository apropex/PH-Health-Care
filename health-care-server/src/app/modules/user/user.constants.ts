import { iUserSearchQuery } from "../../shared/global-query-interfaces";

//* USER CONSTANTS *\\
type iUser = (keyof iUserSearchQuery)[];

export const userFilterFields: iUser = ["status", "role", "needPasswordChange"];
export const userSearchFields: iUser = ["email"];
export const userBooleanFields: iUser = ["needPasswordChange"];
