import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository';
import { AuthOrgUseCase } from './auth-org-use-case';
import { InvalidAuthError } from '../errors/invalid-auth';
import { hash } from 'bcryptjs';

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthOrgUseCase;

describe('Auth Org Use Case', () => {
   beforeEach(async () => {
      orgsRepository = new InMemoryOrgsRepository();
      sut = new AuthOrgUseCase(orgsRepository);
      await orgsRepository.create({
         org_name: 'Pet Safe Zone',
         accountable_name: 'John Doe',
         email: 'john.doe@example.com',
         password_hash: await hash('stronglikeahorse', 6),
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

   it('should be ablo to authenticate a org with valid e-mail and password', async () => {
      const { org } = await sut.execute({
         email: 'john.doe@example.com',
         password: 'stronglikeahorse',
      });
      expect(org.id).toEqual(expect.any(String));
   });

   it('should not be able to authenticate with wrong e-mail', async () => {
      expect(async () => {
         await sut.execute({
            email: 'john.dooooe@example.com',
            password: 'stronglikeahorse',
         });
      }).rejects.toBeInstanceOf(InvalidAuthError);
   });

   it('should not be able to authenticate with wrong password', async () => {
      expect(async () => {
         await sut.execute({
            email: 'john.doe@example.com',
            password: 'stronglikeanunicorn',
         });
      }).rejects.toBeInstanceOf(InvalidAuthError);
   });
});
