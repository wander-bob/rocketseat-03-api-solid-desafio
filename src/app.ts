import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { routes } from './http/controllers';
import { env } from './env';

const app = fastify();

app.register(fastifyCookie);
app.register(fastifyJwt, {
   secret: env.JWT_SECRET,
   sign: {
      expiresIn: '15m',
   },
});
app.register(routes);

export = app;
