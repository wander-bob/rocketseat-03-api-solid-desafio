import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository';
import { FindManyByStateAndCityPetsUseCase } from './find-many-by-state-and-city-use-case';
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository';

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: FindManyByStateAndCityPetsUseCase;

describe('Find Many Pets By State and City Use Case', () => {
   beforeEach(async () => {
      petsRepository = new InMemoryPetsRepository();
      orgsRepository = new InMemoryOrgsRepository();
      sut = new FindManyByStateAndCityPetsUseCase(petsRepository);

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

      await orgsRepository.create({
         id: 'org-02',
         org_name: 'Pet Safe Zone 2',
         accountable_name: 'John Doe',
         email: 'john.doe@example.com',
         password_hash: 'stronglikeahorse',
         whatsapp: '1122334455',
         zip_code: '44651-130',
         state: 'PR',
         city: 'Curitiba',
         neighborhood: '',
         street: '',
         latitude: -23.658687,
         longitude: -46.6713071,
      });

      await orgsRepository.create({
         id: 'org-03',
         org_name: 'Pet Home',
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
      await orgsRepository.create({
         id: 'org-04',
         org_name: 'Pet Spot',
         accountable_name: 'John Doe',
         email: 'john.doe@example.com',
         password_hash: 'stronglikeahorse',
         whatsapp: '1122334455',
         zip_code: '54651-130',
         state: 'MG',
         city: 'Belo Horizonte',
         neighborhood: '',
         street: '',
         latitude: -23.658687,
         longitude: -46.6713071,
      });
      orgsRepository.database.forEach((org) =>
         petsRepository.orgsDatabase.push(org),
      );

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
      await petsRepository.create({
         id: 'pet-01',
         name: 'Beholder',
         about: 'A really nice boy',
         age: 3,
         energy_level: 10,
         space_required: 'wide',
         size: 'big',
         independency: 'low',
         org_id: 'org-01',
      });
      await petsRepository.create({
         id: 'pet-01',
         name: 'Jackie',
         about: 'A really nice girl',
         age: 3,
         energy_level: 10,
         space_required: 'wide',
         size: 'big',
         independency: 'low',
         org_id: 'org-02',
      });
   });

   it('should be able to find a list of pets by city and state', async () => {
      const { pets } = await sut.execute({
         city: 'São Paulo',
         state: 'SP',
      });

      expect(pets).toHaveLength(2);
   });
});
