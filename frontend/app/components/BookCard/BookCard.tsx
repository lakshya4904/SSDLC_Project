'use client';
import { Button, Card, CardBody, CardFooter, CardHeader, Chip } from '@nextui-org/react';
import React from 'react';
import Image from 'next/image';
import { FaRegBookmark, FaStar } from "react-icons/fa";
import Link from 'next/link';

interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  rating: number;
}

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  

  return (
    <Link href={`book/${book.id}`} >
      <Card isFooterBlurred className="w-full h-full shadow-lg hover:shadow-xl transition-shadow container hover:scale-110 ease-in-out duration-300 " radius='lg'>
        <CardHeader className="absolute z-10 flex justify-between items-start">
          <div className='flex-col'>
            
          <Chip className=" uppercase font-bold" color='default' radius='full'>New</Chip>
          {/* <h4 className=" font-medium text-lg">Acme camera</h4> */}
          </div>
          <Chip className='px-2 text-white' color='primary' radius='md' startContent={<FaStar/>}>
            
            <p>{book.rating}</p>
          </Chip>
        </CardHeader>
        {/* <CardBody className=""> */}
        {/* Image of the Book */}
        <Image
          src={book.coverImage}
          alt={book.title}
          width={200}
          height={300}

          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover flex-wrap "
        />
        {/* </CardBody> */}
        <CardFooter className="flex absolute bottom-0 justify-between items-center p-4 bg-default-100 opacity-90">
          {/* Book Name */}
          <div className={`w-4/6 overflow-hidden`}>
            <h6 className="line truncate">{book.title?book.title:"Book Title"}</h6>
            <p className=" text-sm truncate">{book.author?book.author:"Book Author"}</p>
          </div>
          <Button className="text-tiny w-2/6 ml-4 text-white" color="primary" radius="full" size="sm">
          <FaRegBookmark />
          </Button>
          {/* <p className="font-semibold text-center text-lg">{"bookName"}</p> */}
        </CardFooter>
      </Card>
    </Link>
  )
}

export default BookCard