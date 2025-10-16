import { Prisma, Specialties } from "@prisma/client";
import { prisma } from "../../shared/prisma";

const createSpecialty = async (payload: Prisma.SpecialtiesCreateInput) => {
  const result = await prisma.specialties.create({
    data: payload,
  });

  return result;
};

const getAllSpecialties = async (): Promise<Specialties[]> => {
  return await prisma.specialties.findMany();
};

const deleteSpecialty = async (id: string): Promise<Specialties> => {
  const result = await prisma.specialties.delete({
    where: {
      id,
    },
  });
  return result;
};

export default { createSpecialty, deleteSpecialty, getAllSpecialties };
