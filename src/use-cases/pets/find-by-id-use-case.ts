import { PetsRepository } from '../../repositories/pets-repository';
import { NotFoundError } from '../errors/not-found-error';

export class FindPetByIdUseCase {
   constructor(private petsRepository: PetsRepository) {}
   async execute(id: string) {
      const pet = await this.petsRepository.findById(id);
      if (!pet) {
         throw new NotFoundError();
      }
      return pet;
   }
}
