//

import z from "zod";
import { CreateAdminSchema } from "./admin.validation";

export type iCreateAdmin = z.infer<typeof CreateAdminSchema> & {
  admin: {
    profilePhoto?: string;
  };
};
