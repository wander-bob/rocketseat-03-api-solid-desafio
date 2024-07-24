import { Prisma } from '@prisma/client';
import { PetsRepository, SearchPetRequestParams } from '../pets-repository';
import { prisma } from '../../utils/prisma';

export class PrismaPetsRepository implements PetsRepository {
   async create(data: Prisma.PetUncheckedCreateInput) {
      const pet = await prisma.pet.create({
         data,
      });
      return pet;
   }
   async findById(id: string) {
      const pet = await prisma.pet.findFirst({
         where: { id },
         include: {
            org: {
               select: {
                  org_name: true,
                  city: true,
                  state: true,
                  whatsapp: true,
               },
            },
         },
      });
      return pet;
   }
   async findManyByStateAndCity({
      city,
      state,
      age,
      energy_level,
      size,
      space_required,
   }: SearchPetRequestParams) {
      const pets = await prisma.pet.findMany({
         where: {
            age,
            energy_level,
            size,
            space_required,
            org: {
               city: city,
               state: state,
            },
         },
      });

      return pets;
   }
}
