import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository';
import { FindManyByStateAndCityPetsUseCase } from '../pets/find-many-by-state-and-city-use-case';

export function makeFindManyByStateAndCityUseCase() {
   const petsRepository = new PrismaPetsRepository();
   const useCase = new FindManyByStateAndCityPetsUseCase(petsRepository);
   return useCase;
}
