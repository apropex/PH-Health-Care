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

const updateAdmin = catchAsync(async (req, res) => {
  const payload = req.body;

  if (req.file) {
    const uploadResult = await fileUploader(req.file);
    if (uploadResult?.secure_url) {
      payload.admin.profilePhoto = uploadResult.secure_url;
    }
  }

  const result = await services.updateAdmin(req.params.id, payload);

  _response(res, {
    message: "Admin updated successfully!",
    data: result,
  });
});

const getAllAdmins = catchAsync(async (req, res) => {
  const { data, meta } = await services.getAllAdmins(req.query);

  _response(res, {
    message: "Admins retrieved successfully!",
    data,
    meta,
  });
});
const getAdminById = catchAsync(async (req, res) => {
  const result = await services.getAdminById(req.params.id);

  _response(res, {
    message: "Admin retrieved successfully!",
    data: result,
  });
});
const softDeleteAdmin = catchAsync(async (req, res) => {
  await services.softDeleteAdmin(req.params.id);

  _response(res, {
    message: "Admin deleted successfully!",
  });
});

export default {
  createAdmin,
  updateAdmin,
  getAllAdmins,
  getAdminById,
  softDeleteAdmin,
};
