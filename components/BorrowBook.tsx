'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { borrowBook } from '@/lib/actions/book';

interface Props {
  userId: string;
  bookId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  }
}

const BorrowBook = ({userId, bookId, borrowingEligibility: {isEligible, message}} : Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrow = async () => {
    if (!isEligible) {
      toast(message);
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({bookId, userId});

      if(result.success) {
        toast('Book Borrowed Successfully')
        router.push('/')
      }  else {
        toast(result.error);
      }

    } catch (error) {
      toast('An Error occured while borrowing the book');
    } finally {
      setBorrowing(false);
    }
  }
  
  return (
    <>
      <Button className='book-overview_btn cursor-pointer' onClick={handleBorrow} disabled={borrowing}>
        <Image src='/icons/book.svg' alt='book' height={20} width={20}/>
        <p className='font-bebas-neue text-xl text-dark-100'>
          {borrowing ? 'Borrowing ...' : 'Borrow Book'}
        </p>
      </Button>
    </>
  )
}

export default BorrowBook