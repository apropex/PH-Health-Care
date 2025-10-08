import { buildHash } from "../../../utils/bcrypt";
import { prisma } from "../../shared/prisma";
import { iCreatePatient } from "./user.interface";

const createPatient = async ({ patient, user }: iCreatePatient) => {
  const hashed = await buildHash(user.password);

  const userExists = !!(await prisma.user.count({ where: { email: user.email } }));

  if (userExists) throw new Error("User already exists");

  return await prisma.$transaction(async (trx) => {
    await trx.user.create({
      data: {
        ...user,
        password: hashed,
      },
    });

    return await trx.patient.create({
      data: {
        ...patient,
        name: user.name,
        email: user.email,
      },
    });
  });
};

export default {
  createPatient,
};
