//

//* SCHEDULE CONTROLLERS *//

import catchAsync from "../../shared/catchAsync";
import _response from "../../shared/sendResponse";
import services from "./schedule.service";

const createSchedule = catchAsync(async (req, res) => {
  const result = await services.createSchedule(req.body);

  _response(res, {
    statusCode: 201,
    message: "Schedule created successfully",
    data: result,
  });
});

const getAllSchedule = catchAsync(async (req, res) => {
  const { data, meta } = await services.getAllSchedule(req.query);

  _response(res, {
    message: "Schedule retrieved successfully",
    data,
    meta,
  });
});

const deleteSchedule = catchAsync(async (req, res) => {
  await services.deleteSchedule(req.params.id ?? "");

  _response(res, {
    message: "Schedule deleted successfully",
  });
});

export default {
  createSchedule,
  getAllSchedule,
  deleteSchedule,
};
