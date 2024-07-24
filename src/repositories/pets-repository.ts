import { Pet, Prisma } from '@prisma/client';

export interface SearchPetRequestParams {
   state: string;
   city: string;
   age?: number;
   size?: string;
   energy_level?: number;
   space_required?: string;
}

export interface PetsRepository {
   create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
   findManyByStateAndCity(params: SearchPetRequestParams): Promise<Pet[] | []>;
   findById(petId: string): Promise<Pet | null>;
}
