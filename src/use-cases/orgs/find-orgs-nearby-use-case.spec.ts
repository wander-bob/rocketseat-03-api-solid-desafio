import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository';
import { FindOrgsNearbyUseCase } from './find-orgs-nearby-use-case';

let orgsRepository: InMemoryOrgsRepository;
let sut: FindOrgsNearbyUseCase;

describe('Search Nearby Orgs', () => {
   beforeEach(async () => {
      orgsRepository = new InMemoryOrgsRepository();
      sut = new FindOrgsNearbyUseCase(orgsRepository);
   });
   it('should be able to find a nearby org', async () => {
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

      const { orgs } = await sut.execute(-23.658687, -46.6713071);
      expect(orgs).toHaveLength(1);
      expect(orgs).toEqual([
         expect.objectContaining({ org_name: 'Pet Safe Zone' }),
      ]);
   });
});
