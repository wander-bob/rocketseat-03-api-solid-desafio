import { Org, Prisma } from '@prisma/client';
import { OrgsRepository } from '../orgs-repository';
import { prisma } from '../../utils/prisma';

export class PrismaOrgsRepository implements OrgsRepository {
   async findById(orgId: string) {
      console.log(orgId);
      const org = await prisma.org.findUnique({
         where: {
            id: orgId,
         },
      });
      return org;
   }
   async findByEmail(email: string) {
      const org = await prisma.org.findUnique({
         where: {
            email,
         },
      });
      return org;
   }
   async findNearby(latitude: number, longitude: number) {
      const orgs = await prisma.$queryRaw<
         Org[]
      >`SELECT org_name, email, zip_code, state, city, whatsapp FROM orgs
         WHERE ( ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10 ) 
      `;
      return orgs;
   }
   async create(data: Prisma.OrgCreateInput) {
      const org = await prisma.org.create({
         data,
      });
      return org;
   }
}
