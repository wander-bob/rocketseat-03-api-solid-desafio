import { Org, Prisma } from '@prisma/client';
import { OrgsRepository } from '../orgs-repository';
import { randomUUID } from 'crypto';

export class InMemoryOrgsRepository implements OrgsRepository {
   public database: Org[] = [];

   async create(data: Prisma.OrgCreateInput) {
      const org = {
         id: data.id ?? randomUUID(),
         org_name: data.org_name,
         accountable_name: data.accountable_name,
         email: data.email,
         password_hash: data.password_hash,
         whatsapp: data.whatsapp,
         zip_code: data.zip_code,
         state: data.state,
         city: data.city,
         neighborhood: data.neighborhood,
         street: data.street,
         latitude: new Prisma.Decimal(data.latitude.toString()),
         longitude: new Prisma.Decimal(data.longitude.toString()),
      };
      this.database.push(org);
      return org;
   }
   async findById(orgId: string) {
      const org = this.database.find((org) => org.id === orgId);
      if (!org) {
         return null;
      }
      return org;
   }
   async findByEmail(email: string) {
      const org = this.database.find((org) => org.email === email);
      if (!org) {
         return null;
      }
      return org;
   }
}
