import { Request } from "express";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import ApiError from "../../../error-handler/ApiError";
import make_payment from "../../../lib/make_payment";
import { prisma } from "../../shared/prisma";

//
const createAppointment = async (req: Request) => {
  const { secondaryId, status, email } = req.decoded as JwtPayload;
  const { scheduleId, doctorId } = req.body;
  const videoCallingId = uuid();
  const transactionId = uuid();

  if (status === "DELETED") {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `User (${email}) is deleted, contact to support`,
    );
  }

  const [doctor] = await Promise.all([
    prisma.doctor.findFirstOrThrow({
      where: { id: doctorId, isDeleted: false },
    }),
    prisma.doctorSchedule.findFirstOrThrow({
      where: { doctorId, scheduleId: scheduleId, isBooked: false },
    }),
  ]);

  return await prisma.$transaction(async (trx) => {
    const appointment = await trx.appointment.create({
      data: {
        patientId: secondaryId,
        doctorId: doctor.id,
        scheduleId,
        videoCallingId,
      },
    });

    await trx.doctorSchedule.update({
      where: { doctorId_scheduleId: { doctorId, scheduleId } },
      data: { isBooked: true },
    });

    const payment = await trx.payment.create({
      data: {
        appointmentId: appointment.id,
        amount: doctor.appointmentFee,
        transactionId,
      },
    });

    const session = await make_payment({
      email,
      doctorName: doctor.name,
      amount: doctor.appointmentFee,
      appointmentId: appointment.id,
      paymentId: payment.id,
      patientEmail: email,
    });

    return { appointment, paymentUrl: session.url };
  });
};

export default { createAppointment };
