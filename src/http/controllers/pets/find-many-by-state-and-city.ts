import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFindManyByStateAndCityUseCase } from '../../../use-cases/factories/make-find-many-by-state-and-city';

export async function findMany(request: FastifyRequest, reply: FastifyReply) {
   const petsParamsSchema = z.object({
      state: z.string(),
      city: z.string(),
      age: z.coerce.number().optional(),
      energy_level: z.coerce.number().optional(),
      size: z.string().optional(),
      space_required: z.string().optional(),
   });

   const searchParams = petsParamsSchema.parse(request.query);

   try {
      const searchPetsUseCase = makeFindManyByStateAndCityUseCase();
      const pets = await searchPetsUseCase.execute(searchParams);
      return reply.status(200).send({
         pets,
      });
   } catch (error) {
      console.log(error);
      return reply.status(500).send({ message: 'Internal server error.' });
   }
}
