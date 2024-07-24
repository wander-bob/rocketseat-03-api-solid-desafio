import { FastifyInstance } from 'fastify';
import { create } from './create-pet';
import { findMany } from './find-many-by-state-and-city';
import { findPetById } from './find-by-id';
import { verifyJWT } from '../../middlewares/verify-jwt';

export async function petsRouter(app: FastifyInstance) {
   app.post('/pets', { onRequest: [verifyJWT] }, create);
   app.get('/pets/search', findMany);
   app.get('/pets/search/:id', findPetById);
}
