import { FastifyInstance } from 'fastify';
import { create } from './create-org';
import { auth } from './auth-org';
import { nearbyOrgs } from './nearby-orgs';

export async function orgsRouter(app: FastifyInstance) {
   app.post('/orgs', create);
   app.post('/orgs/auth', auth);
   app.get('/orgs', nearbyOrgs);
}
