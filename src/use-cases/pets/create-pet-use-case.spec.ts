import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository';
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository';
import { CreatePetUseCase } from './create-pet-use-case';
import { NotFoundError } from '../errors/not-found-error';

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: CreatePetUseCase;

describe('Create Pet Use Case', () => {
   beforeEach(async () => {
      petsRepository = new InMemoryPetsRepository();
      orgsRepository = new InMemoryOrgsRepository();
      sut = new CreatePetUseCase(petsRepository, orgsRepository);
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
   });
   it('should be able to register a pet', async () => {
      const pet = await sut.execute({
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
      expect(pet.id).toEqual(expect.any(String));
   });

   it('should not be able to register with wrong org id', () => {
      expect(async () => {
         await sut.execute({
            id: 'pet-01',
            name: 'Buddy',
            about: 'A really nice boy',
            age: 3,
            energy_level: 10,
            space_required: 'wide',
            size: 'big',
            independency: 'low',
            org_id: 'org-02',
         });
      }).rejects.toBeInstanceOf(NotFoundError);
   });
});
