import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository';
import { FindPetByIdUseCase } from '../pets/find-by-id-use-case';
export function makeFindPetByIdUseCase() {
   const petsRepository = new PrismaPetsRepository();
   const useCase = new FindPetByIdUseCase(petsRepository);
   return useCase;
}
