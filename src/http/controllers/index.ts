import { FastifyInstance } from 'fastify';
import { petsRouter } from './pets/routes';
import { orgsRouter } from './orgs/routes';

export async function routes(app: FastifyInstance) {
   app.register(petsRouter);
   app.register(orgsRouter);
}
