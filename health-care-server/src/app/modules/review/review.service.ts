import { Prisma } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../error-handler/ApiError";
import { prisma } from "../../shared/prisma";

type CreateInput = Prisma.ReviewCreateInput & {
  appointmentId: string;
  patientId: string;
};

const createReview = async (payload: CreateInput) => {
  const existingAppointment = await prisma.appointment.findUniqueOrThrow({
    where: { id: payload.appointmentId },
    include: { patient: true },
  });

  if (payload.patientId !== existingAppointment.patientId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      `You are not permitted to create the review, only ${existingAppointment.patient.name} can create a review for this appointment`,
    );
  }

  return await prisma.$transaction(async (trx) => {
    const review = await trx.review.create({
      data: {
        appointmentId: existingAppointment.id,
        doctorId: existingAppointment.doctorId,
        patientId: existingAppointment.patientId,
        rating: payload.rating,
        comment: payload.comment,
      },
    });

    const avgRating = await trx.review.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        doctorId: existingAppointment.doctorId,
      },
    });

    await trx.doctor.update({
      where: { id: existingAppointment.doctorId },
      data: { averageRating: avgRating._avg.rating as number },
    });

    return review;
  });
};

export default { createReview };
