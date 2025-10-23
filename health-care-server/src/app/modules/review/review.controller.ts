import catchAsync from "../../shared/catchAsync";
import _response from "../../shared/sendResponse";
import services from "./review.service";

const createReview = catchAsync(async (req, res) => {
  req.body.patientId = req.decoded?.secondaryId;
  const result = await services.createReview(req.body);

  _response(res, {
    message: "Review created successfully",
    data: result,
  });
});

export default { createReview };
