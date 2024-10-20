'use client';
import { Button, Card, CardBody, CardFooter, CardHeader, Chip } from '@nextui-org/react';
import React from 'react';
import Image from 'next/image';
import { FaRegBookmark, FaStar } from "react-icons/fa";
import Link from 'next/link';



const BookCard = ({ book }: any) => {
  
  return (
    <Link href={`book/${book._id}`} >
      <Card isFooterBlurred className="h-full shadow-lg hover:shadow-xl transition-shadow container hover:scale-110 ease-in-out duration-300 aspect-novel" radius='lg'>
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
          // width={200}
          // height={'450'}
          fill
          loading='lazy'
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="z-0"
        />
        {/* </CardBody> */}
        <CardFooter className="flex absolute bottom-0 justify-between items-center p-4 bg-default-100 opacity-90">
          {/* Book Name */}
          <div className={`w-5/6 overflow-hidden`}>
            <h6 className="line truncate">{book.title?book.title:"Book Title"}</h6>
            <p className=" text-sm truncate">{book.author?book.author:"Book Author"}</p>
          </div>
          <Button isIconOnly className="text-tiny ml-4 !aspect-square text-white" color="primary" radius="full" size="sm">
          <FaRegBookmark size={'18px'} />
          </Button>
          {/* <p className="font-semibold text-center text-lg">{"bookName"}</p> */}
        </CardFooter>
      </Card>
    </Link>
  )
}

export default BookCard