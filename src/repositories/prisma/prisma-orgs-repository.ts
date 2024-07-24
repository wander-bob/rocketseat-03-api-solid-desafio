import { Prisma } from '@prisma/client';
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
   async create(data: Prisma.OrgCreateInput) {
      const org = await prisma.org.create({
         data,
      });
      return org;
   }
}
