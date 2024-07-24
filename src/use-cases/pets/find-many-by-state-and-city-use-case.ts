import {
   PetsRepository,
   SearchPetRequestParams,
} from '../../repositories/pets-repository';

export class FindManyByStateAndCityPetsUseCase {
   constructor(private petsRepository: PetsRepository) {}
   async execute({
      city,
      state,
      age,
      energy_level,
      size,
      space_required,
   }: SearchPetRequestParams) {
      const pets = await this.petsRepository.findManyByStateAndCity({
         city,
         state,
         age,
         energy_level,
         size,
         space_required,
      });
      return { pets };
   }
}
