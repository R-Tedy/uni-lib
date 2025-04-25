import {drizzle} from 'drizzle-orm/neon-http';
import config from '@/lib/config';
import { neon } from '@neondatabase/serverless';

const {
  env: {
    databaseURL,
  }
} = config;

const sql = neon(databaseURL as string)
export const db = drizzle({client: sql});