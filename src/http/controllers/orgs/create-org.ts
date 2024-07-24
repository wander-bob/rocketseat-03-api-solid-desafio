import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { hash } from 'bcryptjs';
import { makeCreateOrgUseCase } from '../../../use-cases/factories/make-create-org-use-case';
import { EmailAlreadyRegisterd } from '../../../use-cases/errors/email-already-registered';

export async function create(request: FastifyRequest, reply: FastifyReply) {
   const orgRequestSchema = z.object({
      org_name: z.string().min(3),
      accountable_name: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
      whatsapp: z.string().min(10),
      zip_code: z.string().min(8).max(9),
      state: z.string(),
      city: z.string(),
      neighborhood: z.string(),
      street: z.string(),
      latitude: z.number().refine((value) => {
         return Math.abs(value) <= 90;
      }),
      longitude: z.number().refine((value) => {
         return Math.abs(value) <= 180;
      }),
   });

   const orgBodyRequest = orgRequestSchema.parse(request.body);

   try {
      const { password, ...orgWithoutPassword } = orgBodyRequest;

      const createOrgUseCase = makeCreateOrgUseCase();

      const { org } = await createOrgUseCase.execute({
         ...orgWithoutPassword,
         password_hash: await hash(password, 6),
      });
      return reply.status(201).send({ id: org.id });
   } catch (error) {
      if (error instanceof EmailAlreadyRegisterd) {
         return reply.status(409).send({ message: error.message });
      }
   }
}
