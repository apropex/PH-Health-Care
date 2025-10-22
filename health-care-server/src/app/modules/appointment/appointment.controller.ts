import catchAsync from "../../shared/catchAsync";
import _response from "../../shared/sendResponse";
import services from "./appointment.service";

const createAppointment = catchAsync(async (req, res) => {
  const { appointment, paymentUrl } = await services.createAppointment(req);

  _response(res, {
    message: "Doctor created successfully",
    data: appointment,
    meta: {
      options: { paymentUrl },
    },
  });
});

const getAllAppointments = catchAsync(async (req, res) => {
  const { data, meta } = await services.getAllAppointments(req.query);

  _response(res, {
    message: "All appointments retrieved successfully",
    data,
    meta,
  });
});

const getMyAppointments = catchAsync(async (req, res) => {
  const { data, meta } = await services.getMyAppointments(
    req.decoded!,
    req.query,
  );

  _response(res, {
    message: "My appointments retrieved successfully",
    data,
    meta,
  });
});

const updateAppointmentStatus = catchAsync(async (req, res) => {
  req.body.id = req.params.id;
  const result = await services.updateAppointmentStatus(req);

  _response(res, {
    message: "Appointment status updated successfully",
    data: result,
  });
});

export default {
  createAppointment,
  getAllAppointments,
  getMyAppointments,
  updateAppointmentStatus,
};
