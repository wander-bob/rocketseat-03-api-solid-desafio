import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFindNearbyUseCase } from '../../../use-cases/factories/make-find-nearby-use-case';

export async function nearbyOrgs(request: FastifyRequest, reply: FastifyReply) {
   const nearbyOrgsSchema = z.object({
      latitude: z.coerce.number().refine((value) => {
         return Math.abs(value) <= 90;
      }),
      longitude: z.coerce.number().refine((value) => {
         return Math.abs(value) <= 180;
      }),
   });

   const { latitude, longitude } = nearbyOrgsSchema.parse(request.query);

   const findNearbyOrgsUseCase = makeFindNearbyUseCase();

   const { orgs } = await findNearbyOrgsUseCase.execute(latitude, longitude);
   return reply.status(200).send({
      orgs,
   });
}
