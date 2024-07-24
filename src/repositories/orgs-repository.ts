import { Org, Prisma } from '@prisma/client';

export interface OrgsRepository {
   findById(orgId: string): Promise<Org | null>;
   findByEmail(email: string): Promise<Org | null>;
   findNearby(latitude: number, longitude: number): Promise<Org[] | []>;
   create(data: Prisma.OrgCreateInput): Promise<Org>;
}
