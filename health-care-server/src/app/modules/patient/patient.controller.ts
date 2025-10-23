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

const getAllPatients = catchAsync(async (req, res) => {
  const result = await services.getAllPatients(req.query);

  _response(res, {
    message: "All patients retrieved successfully",
    data: result,
  });
});

const getPatientById = catchAsync(async (req, res) => {
  const result = await services.getPatientById(req.params.id);

  _response(res, {
    message: "Patient retrieved successfully",
    data: result,
  });
});

const softDelete = catchAsync(async (req, res) => {
  const result = await services.softDelete(req.params.id);

  _response(res, {
    message: "Patient deleted successfully",
    data: result,
  });
});

const updateById = catchAsync(async (req, res) => {
  const result = await services.updateById(req);

  _response(res, {
    message: "Patient updated successfully",
    data: result,
  });
});

export default {
  createPatient,
  getAllPatients,
  getPatientById,
  softDelete,
  updateById,
};
