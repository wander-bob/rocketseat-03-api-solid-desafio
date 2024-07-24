import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { NotFoundError } from '../../../use-cases/errors/not-found-error';
import { makeFindPetByIdUseCase } from '../../../use-cases/factories/make-find-by-id-use-case';

export async function findPetById(
   request: FastifyRequest,
   reply: FastifyReply,
) {
   const petIdSchema = z.object({
      id: z.string(),
   });
   const { id } = petIdSchema.parse(request.params);
   try {
      const findPetByIdUseCase = makeFindPetByIdUseCase();
      const pet = await findPetByIdUseCase.execute(id);
      return reply.status(200).send({ pet });
   } catch (error) {
      if (error instanceof NotFoundError) {
         return reply.status(404).send({ message: error.message });
      }
   }
}
