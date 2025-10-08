import catchAsync from "@/app/shared/catchAsync";
import services from "./user.service";

//

const createPatient = catchAsync(async (req, res) => {
  const result = await services.createPatient(req.body);
});

export default {
  createPatient,
};
