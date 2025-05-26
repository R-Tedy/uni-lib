import dummyBooks from '@/dummyBooks.json'
// import { db } from '.';
import { books } from './schema';
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

config({path: '.env.local'});

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({client: sql})

const seed = async () => {
  console.log('seeding data...')


  try {
    for (const book of dummyBooks){

      await db.insert(books).values({
        ...book,
      })

      console.log('Data seeded sucessfully')
    }
  } catch (error) {
    console.error('Error seeding data: ', error);
  }
}

seed();