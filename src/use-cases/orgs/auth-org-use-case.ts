import { Org } from '@prisma/client';
import { compare } from 'bcryptjs';

import { OrgsRepository } from '../../repositories/orgs-repository';
import { InvalidAuthError } from '../errors/invalid-auth';

interface AuthOrgUseCaseRequest {
   email: string;
   password: string;
}

interface AuthOrgUseCaseResponse {
   org: Org;
}

export class AuthOrgUseCase {
   constructor(private orgsRepository: OrgsRepository) {}
   async execute({
      email,
      password,
   }: AuthOrgUseCaseRequest): Promise<AuthOrgUseCaseResponse> {
      const org = await this.orgsRepository.findByEmail(email);
      if (!org) {
         throw new InvalidAuthError();
      }
      const isPasswordValid = await compare(password, org.password_hash);

      if (!isPasswordValid) {
         throw new InvalidAuthError();
      }
      return { org };
   }
}
