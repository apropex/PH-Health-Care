import { buildHash } from "../../../utils/bcrypt";
import { prisma } from "../../shared/prisma";
import { iCreatePatient } from "./patient.interface";

const createPatient = async ({ patient, user }: iCreatePatient) => {
  const hashed = await buildHash(user.password);

  const userExists = !!(await prisma.user.count({
    where: { email: user.email },
  }));

  if (userExists) throw new Error("User already exists");

  return await prisma.$transaction(async (trx) => {
    const createdUser = await trx.user.create({
      data: {
        ...user,
        password: hashed,
      },
    });

    return await trx.patient.create({
      data: {
        ...patient,
        user: {
          connect: {
            email: createdUser.email,
          },
        },
      },
    });
  });
};

export default { createPatient };
