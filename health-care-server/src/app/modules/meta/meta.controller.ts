import catchAsync from "../../shared/catchAsync";
import _response from "../../shared/sendResponse";
import services from "./meta.service";

const fetchDashboardMetaData = catchAsync(async (req, res) => {
  const result = await services.fetchDashboardMetaData(req.decoded || {});

  _response(res, {
    message: "",
    data: result,
  });
});

export default { fetchDashboardMetaData };
