import { Org } from '@prisma/client';
import { OrgsRepository } from '../../repositories/orgs-repository';

interface FindOrgsNearbyUseCaseResponse {
   orgs: Org[];
}

export class FindOrgsNearbyUseCase {
   constructor(private orgsRepository: OrgsRepository) {}
   async execute(
      userLatitude: number,
      userLongitude: number,
   ): Promise<FindOrgsNearbyUseCaseResponse> {
      const orgs = await this.orgsRepository.findNearby(
         userLatitude,
         userLongitude,
      );
      return { orgs };
   }
}
