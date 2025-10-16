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

export default {
  getAllUsers,
};
