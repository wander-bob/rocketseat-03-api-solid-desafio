import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { InvalidAuthError } from '../../../use-cases/errors/invalid-auth';
import { makeAuthOrgUseCase } from '../../../use-cases/factories/make-auth-org-use-case';

export async function auth(request: FastifyRequest, reply: FastifyReply) {
   const authBodySchema = z.object({
      email: z.string(),
      password: z.string(),
   });

   const { email, password } = authBodySchema.parse(request.body);

   try {
      const authOrgUseCase = makeAuthOrgUseCase();

      const { org } = await authOrgUseCase.execute({ email, password });

      const token = await reply.jwtSign({}, { sign: { sub: org.id } });

      const refreshToken = await reply.jwtSign({}, { sign: { sub: org.id } });

      return reply
         .setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true,
         })
         .status(200)
         .send({ token });
   } catch (error) {
      if (error instanceof InvalidAuthError) {
         return reply.status(400).send({ message: error.message });
      }
   }
}
