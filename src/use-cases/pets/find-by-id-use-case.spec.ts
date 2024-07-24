import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository';
import { FindPetByIdUseCase } from './find-by-id-use-case';
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository';
import { NotFoundError } from '../errors/not-found-error';

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: FindPetByIdUseCase;

describe('Find Pet By Id Use Case', () => {
   beforeEach(async () => {
      petsRepository = new InMemoryPetsRepository();
      orgsRepository = new InMemoryOrgsRepository();
      sut = new FindPetByIdUseCase(petsRepository);

      await orgsRepository.create({
         id: 'org-01',
         org_name: 'Pet Safe Zone',
         accountable_name: 'John Doe',
         email: 'john.doe@example.com',
         password_hash: 'stronglikeahorse',
         whatsapp: '1122334455',
         zip_code: '04651-130',
         state: 'SP',
         city: 'São Paulo',
         neighborhood: 'São Paulo',
         street: 'Rua Másculo, 0',
         latitude: -23.658687,
         longitude: -46.6713071,
      });

      await petsRepository.create({
         id: 'pet-01',
         name: 'Buddy',
         about: 'A really nice boy',
         age: 3,
         energy_level: 10,
         space_required: 'wide',
         size: 'big',
         independency: 'low',
         org_id: 'org-01',
      });
   });

   it('should be able to find a pet by id', async () => {
      const pet = await sut.execute('pet-01');

      expect(pet.id).toEqual(expect.any(String));
   });

   it('should not be able to find a pet with wrong id', () => {
      expect(async () => {
         await sut.execute('not-found');
      }).rejects.toBeInstanceOf(NotFoundError);
   });
});
