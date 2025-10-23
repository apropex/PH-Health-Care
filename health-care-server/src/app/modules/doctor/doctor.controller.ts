import fileUploader from "../../../lib/fileUploader";
import catchAsync from "../../shared/catchAsync";
import _response from "../../shared/sendResponse";
import services from "./doctor.service";

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

const getAllDoctors = catchAsync(async (req, res) => {
  const { data, meta } = await services.getAllDoctors(req.query);

  _response(res, {
    message: "Doctors retrieved successfully",
    data,
    meta,
  });
});

const updateDoctor = catchAsync(async (req, res) => {
  const result = await services.updateDoctor(req.params.id, req.body);

  _response(res, {
    message: "Doctor updated successfully",
    data: result,
  });
});

const getAISuggestion = catchAsync(async (req, res) => {
  const result = await services.getAISuggestion(req.body);

  _response(res, {
    message: "AI suggestion retrieved successfully",
  });
});

const getDoctorById = catchAsync(async (req, res) => {
  const result = await services.getDoctorById(req.params.id);

  _response(res, {
    message: "Doctor retrieved successfully",
    data: result,
  });
});

export default {
  createDoctor,
  getAllDoctors,
  updateDoctor,
  getAISuggestion,
  getDoctorById,
};
