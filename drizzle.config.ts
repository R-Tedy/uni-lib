import {config} from 'dotenv'
import 'dotenv/config';
import {defineConfig} from 'drizzle-kit';

config({path: '.env.local'});

export default defineConfig({
  out: './migrations',
  schema: './db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  }
})