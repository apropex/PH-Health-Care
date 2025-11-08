import type { tUserRole, tUserStatus } from "../constants";

import "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    id: string;
    secondaryId: string;
    email: string;
    role: tUserRole;
    needPasswordChange: boolean;
    status: tUserStatus;
  }
}
