//

import * as z from "zod";
import { CreatePatientSchema } from "./user.validation";

export type iCreatePatient = z.infer<typeof CreatePatientSchema> & {
  patient: {
    profilePhoto?: string;
  };
};
