import { PrismaOrgsRepository } from '../../repositories/prisma/prisma-orgs-repository';
import { FindOrgsNearbyUseCase } from '../orgs/find-orgs-nearby-use-case';

export function makeFindNearbyUseCase() {
   const orgRepository = new PrismaOrgsRepository();
   const useCase = new FindOrgsNearbyUseCase(orgRepository);
   return useCase;
}
