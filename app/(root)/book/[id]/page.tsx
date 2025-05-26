import { auth } from '@/auth';
import BookOverview from '@/components/BookOverview';
import { db } from '@/db';
import { books } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async ({params} : {params : Promise<{id: string}>}) => {
  const session = await auth();
  const id = (await params).id;

  const [bookDetails] = await db.select().from(books).where(eq(books.id, id)).limit(1);

  if (!bookDetails) redirect('/404');

  // console.log(bookDetails);
  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string}/>

      <div className='book-details'>
        <div className='flex-[1.5]'>
          <section className='flex flex-col gap-7'>
            <h3>Video</h3>
            <p className='text-red-700'>
              Sorry, no videos available at the moment
            </p>
          </section>
          <section className='flex flex-col gap-7'>
            <h3>Summary</h3>
            <div className='space-y-5 text-xl text-light-100'>
              {bookDetails.summary.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default page