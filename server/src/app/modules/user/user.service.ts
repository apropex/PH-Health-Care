import { buildHash } from "@/utils/bcrypt";
import { iCreatePatient } from "./user.interface";
import { prisma } from "@/app/shared/prisma";

const createPatient = async (payload: iCreatePatient) => {
  const hashed = await buildHash(payload.password);

  const userExists = !!(await prisma.user.count({ where: { email:payload.email } }));

  const result = await prisma.$transaction(async trx => {

    await trx.user.create()

  })




};

export default {
  createPatient,
};
