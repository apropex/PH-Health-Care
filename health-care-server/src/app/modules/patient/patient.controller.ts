//

import fileUploader from "../../../lib/fileUploader";
import catchAsync from "../../shared/catchAsync";
import _response from "../../shared/sendResponse";
import services from "./patient.service";

const createPatient = catchAsync(async (req, res) => {
  const payload = req.body;

  if (req.file) {
    const uploadResult = await fileUploader(req.file);
    if (uploadResult?.secure_url) {
      payload.patient.profilePhoto = uploadResult.secure_url;
    }
  }

  const result = await services.createPatient(payload);

  _response(res, {
    message: "Patient created successfully",
    data: result,
  });
});

export default { createPatient };
