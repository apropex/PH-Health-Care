//

//* USER CONTROLLERS *//

import fileUploader from "../../../lib/fileUploader";
import catchAsync from "../../shared/catchAsync";
import _response from "../../shared/sendResponse";
import services from "./user.service";

//

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

//

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

//

const createDoctor = catchAsync(async (req, res) => {
  const payload = req.body;

  if (req.file) {
    const uploadResult = await fileUploader(req.file);
    if (uploadResult?.secure_url) {
      payload.doctor.profilePhoto = uploadResult.secure_url;
    }
  }

  const result = await services.createDoctor(payload);

  _response(res, {
    message: "Doctor created successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const { data, meta } = await services.getAllUsers(req.query);

  _response(res, {
    message: "All users retrieved successfully",
    data,
    meta,
  });
});

export default {
  createPatient,
  createAdmin,
  createDoctor,
  getAllUsers,
};
