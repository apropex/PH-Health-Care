import sCode from "../../../utils/statusCode";
import catchAsync from "../../shared/catchAsync";
import _response from "../../shared/sendResponse";
import services from "./doctorSchedule.service";

const createDoctorSchedule = catchAsync(async (req, res) => {
  const result = await services.createDoctorSchedule(req);

  _response(res, {
    statusCode: sCode.CREATED,
    message: "Doctor-schedule created successfully",
    data: result,
  });
});

export default { createDoctorSchedule };
