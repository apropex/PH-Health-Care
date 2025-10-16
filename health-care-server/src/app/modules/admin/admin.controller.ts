import fileUploader from "../../../lib/fileUploader";
import catchAsync from "../../shared/catchAsync";
import _response from "../../shared/sendResponse";
import services from "./admin.service";

const createAdmin = catchAsync(async (req, res) => {
  const payload = req.body;

  if (req.file) {
    const uploadResult = await fileUploader(req.file);
    if (uploadResult?.secure_url) {
      payload.admin.profilePhoto = uploadResult.secure_url;
    }
  }

  const result = await services.createAdmin(payload);

  _response(res, {
    message: "Admin created successfully",
    data: result,
  });
});

export default { createAdmin };
