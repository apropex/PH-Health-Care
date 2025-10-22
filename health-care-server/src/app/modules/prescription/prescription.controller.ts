import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import _response from "../../shared/sendResponse";
import services from "./prescription.service";

const createPrescription = catchAsync(async (req, res) => {
  const result = await services.createPrescription(req);

  _response(res, {
    statusCode: httpStatus.CREATED,
    message: "Prescription created successfully",
    data: result,
  });
});

const getMyPrescriptions = catchAsync(async (req, res) => {
  const { data, meta } = await services.getMyPrescriptions(
    req.decoded!,
    req.query,
  );

  _response(res, {
    message: "Prescriptions retrieved successfully",
    data,
    meta,
  });
});

export default { createPrescription, getMyPrescriptions };
