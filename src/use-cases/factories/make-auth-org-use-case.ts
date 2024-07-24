import { PrismaOrgsRepository } from '../../repositories/prisma/prisma-orgs-repository';
import { AuthOrgUseCase } from '../orgs/auth-org-use-case';

export function makeAuthOrgUseCase() {
   const repository = new PrismaOrgsRepository();
   const useCase = new AuthOrgUseCase(repository);
   return useCase;
}
