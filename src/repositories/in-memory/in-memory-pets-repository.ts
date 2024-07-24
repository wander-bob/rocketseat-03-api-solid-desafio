import { Prisma, Pet, Org } from '@prisma/client';
import { PetsRepository, SearchPetRequestParams } from '../pets-repository';
import { randomUUID } from 'crypto';

export class InMemoryPetsRepository implements PetsRepository {
   public database: Pet[] = [];
   public orgsDatabase: Org[] = [];
   async create(data: Prisma.PetUncheckedCreateInput) {
      const pet = {
         id: data.id ?? randomUUID(),
         name: data.name,
         about: data.about,
         age: data.age,
         energy_level: data.energy_level,
         space_required: data.space_required,
         size: data.size,
         independency: data.independency,
         org_id: data.org_id,
      };
      this.database.push(pet);
      return pet;
   }

   async findById(id: string) {
      const pet = this.database.find((pet) => pet.id === id);
      if (!pet) {
         return null;
      }
      const org = this.orgsDatabase.find((org) => org.id === pet.org_id);
      return {
         ...pet,
         org: {
            org_name: org?.org_name,
            city: org?.city,
            state: org?.state,
            whatsapp: org?.whatsapp,
         },
      };
   }

   async findManyByStateAndCity(params: SearchPetRequestParams) {
      const orgsByStateAndCity = this.orgsDatabase.filter(
         (org) => org.state === params.state && org.city === params.city,
      );

      const pets = this.database
         .filter((pet) =>
            orgsByStateAndCity.some((org) => org.id === pet.org_id),
         )
         .filter((pet) => (params.age ? pet.age === params.age : true))
         .filter((pet) =>
            params.energy_level
               ? pet.energy_level === params.energy_level
               : true,
         )
         .filter((pet) => (params.size ? pet.size === params.size : true))
         .filter((pet) =>
            params.space_required
               ? pet.space_required === params.space_required
               : true,
         );

      return pets;
   }
}
