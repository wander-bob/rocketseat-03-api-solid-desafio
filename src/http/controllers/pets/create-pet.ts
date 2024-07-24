import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeCreatePetUseCase } from '../../../use-cases/factories/make-create-pet-use-case';
import { NotFoundError } from '../../../use-cases/errors/not-found-error';

export async function create(request: FastifyRequest, reply: FastifyReply) {
   const createPetSchema = z.object({
      name: z.string(),
      about: z.string(),
      age: z.number(),
      energy_level: z.number(),
      space_required: z.string(),
      size: z.string(),
      independency: z.string(),
      org_id: z.string(),
   });
   const createPetBody = createPetSchema.parse(request.body);

   try {
      const createPetUseCase = makeCreatePetUseCase();

      const pet = await createPetUseCase.execute(createPetBody);

      return reply.status(201).send({
         message: 'created',
         pet,
      });
   } catch (error) {
      if (error instanceof NotFoundError) {
         return reply.status(400).send({ message: error.message });
      }
   }
}
