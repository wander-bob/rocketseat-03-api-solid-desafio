import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
   DATABASE_URL: z.string(),
   PORT: z.coerce.number().default(3333),
   JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
   console.error(
      'Failed on checking environment variables.',
      _env.error.format(),
   );
   throw new Error('Failed on checking environment variables.');
}

export const env = _env.data;
