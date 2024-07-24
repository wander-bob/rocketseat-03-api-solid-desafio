import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository';
import { CreateOrgUseCase } from './create-org-use-case';
import { EmailAlreadyRegisterd } from '../errors/email-already-registered';

let repository: InMemoryOrgsRepository;
let sut: CreateOrgUseCase;

describe('Create Org Use Case', () => {
   beforeEach(() => {
      repository = new InMemoryOrgsRepository();
      sut = new CreateOrgUseCase(repository);
   });
   it('should be able to register as an organization', async () => {
      const orgData = {
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
      };

      const { org } = await sut.execute(orgData);

      expect(org.id).toEqual(expect.any(String));
   });
   it('should not be able to register as an organization with already registered e-mail', async () => {
      const orgData = {
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
      };
      await sut.execute(orgData);

      expect(async () => {
         await sut.execute(orgData);
      }).rejects.toBeInstanceOf(EmailAlreadyRegisterd);
   });
});
