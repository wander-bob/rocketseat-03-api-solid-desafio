import { PrismaOrgsRepository } from '../../repositories/prisma/prisma-orgs-repository';
import { CreateOrgUseCase } from '../orgs/create-org-use-case';

export function makeCreateOrgUseCase() {
   const repository = new PrismaOrgsRepository();
   const useCase = new CreateOrgUseCase(repository);
   return useCase;
}
