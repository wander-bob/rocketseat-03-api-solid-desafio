import { FastifyInstance } from 'fastify';
import { create } from './create-org';
import { auth } from './auth-org';

export async function orgsRouter(app: FastifyInstance) {
   app.post('/orgs', create);
   app.post('/orgs/auth', auth);
}
