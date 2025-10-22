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

export default { createAppointment };
