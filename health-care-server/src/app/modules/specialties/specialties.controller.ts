import { Request, Response } from "express";
import httpStatus from "http-status";
import fileUploader from "../../../lib/fileUploader";
import catchAsync from "../../shared/catchAsync";
import _response from "../../shared/sendResponse";
import services from "./specialties.service";

const createSpecialty = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  if (req.file) {
    const secure_url = (await fileUploader(req.file))?.secure_url;
    if (secure_url) payload.icon = secure_url;
  }

  console.log("req.file :", req.file);
  console.log("req.body :", req.body);

  const result = await services.createSpecialty(payload);

  _response(res, {
    statusCode: httpStatus.CREATED,
    message: "Specialties created successfully!",
    data: result,
  });
});

const getAllSpecialties = catchAsync(async (req: Request, res: Response) => {
  const result = await services.getAllSpecialties();
  _response(res, {
    statusCode: httpStatus.OK,
    message: "Specialties data fetched successfully",
    data: result,
  });
});

const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await services.deleteSpecialty(id);
  _response(res, {
    statusCode: httpStatus.OK,
    message: "Specialty deleted successfully",
    data: result,
  });
});

export default {
  createSpecialty,
  getAllSpecialties,
  deleteSpecialty,
};
