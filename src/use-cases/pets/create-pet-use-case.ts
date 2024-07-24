import { Prisma, Pet } from '@prisma/client';
import { PetsRepository } from '../../repositories/pets-repository';
import { OrgsRepository } from '../../repositories/orgs-repository';
import { NotFoundError } from '../errors/not-found-error';

export class CreatePetUseCase {
   constructor(
      private petsRepository: PetsRepository,
      private orgsRepository: OrgsRepository,
   ) {}
   async execute(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
      if (!data.org_id) {
         throw new NotFoundError();
      }
      const isOrgIdValid = await this.orgsRepository.findById(data.org_id);

      if (!isOrgIdValid) {
         throw new NotFoundError();
      }

      const pet = await this.petsRepository.create(data);

      return pet;
   }
}
