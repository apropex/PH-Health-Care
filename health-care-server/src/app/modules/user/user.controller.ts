//

//* USER CONTROLLERS *//

import catchAsync from "../../shared/catchAsync";
import _response from "../../shared/sendResponse";
import services from "./user.service";

const getAllUsers = catchAsync(async (req, res) => {
  const { data, meta } = await services.getAllUsers(req.query);

  _response(res, {
    message: "All users retrieved successfully",
    data,
    meta,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const result = await services.getUserById(req.params.id);

  _response(res, {
    message: "User retrieved successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const result = await services.getUserById(req.decoded!.id);

  _response(res, {
    message: "User retrieved successfully",
    data: result,
  });
});

const changeProfileStatus = catchAsync(async (req, res) => {
  const result = await services.changeProfileStatus(
    req.params.id,
    req.body?.status,
  );

  _response(res, {
    message: "Status updated successfully",
    data: result,
  });
});

export default { getAllUsers, getMe, getUserById, changeProfileStatus };
