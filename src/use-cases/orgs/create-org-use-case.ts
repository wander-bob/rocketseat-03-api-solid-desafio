import { Org, Prisma } from '@prisma/client';
import { OrgsRepository } from '../../repositories/orgs-repository';
import { EmailAlreadyRegisterd } from '../errors/email-already-registered';

type CreateOrgUseCaseRequest = Prisma.OrgCreateInput;

interface CreateOrgUseCaseResponse {
   org: Org;
}

export class CreateOrgUseCase {
   constructor(private orgsRepository: OrgsRepository) {}
   async execute(
      data: CreateOrgUseCaseRequest,
   ): Promise<CreateOrgUseCaseResponse> {
      const isEmailAlreadyRegistered = await this.orgsRepository.findByEmail(
         data.email,
      );

      if (isEmailAlreadyRegistered) {
         throw new EmailAlreadyRegisterd();
      }

      const org = await this.orgsRepository.create(data);

      return {
         org,
      };
   }
}
