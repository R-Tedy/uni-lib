import { auth } from '@/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const layout = async ({children} : {children : ReactNode}) => {
  const session = await auth();

  if(session) redirect('/');

  return (
    <main className='auth-container'>
      <section className='auth-form'>
        <div className='auth-box'>
          <div className='flex flex-row gap-2'>
            <Image
              src='/icons/logo.svg'
              alt='logo'
              width={37}
              height={37}
            />
            <h1 className='text-2xl font-semibold text-white'>UniLib</h1>
          </div>

          <div>
            {children}
          </div>
        </div>
      </section>

      <section className='auth-illustration p-3'>
        <Image
          src='/images/auth-illustration.jpg'
          alt='auth illustration'
          height={1000}
          width={1000}
          className='size-full object-cover rounded-lg border-2 border-light-500'
        />
      </section>
    </main>
  )
}

export default layout