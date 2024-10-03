import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import React from 'react'
import Image from 'next/image'
import { FaStar } from "react-icons/fa"

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
    <div className='container '>
      <Card isFooterBlurred className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 m-4 " radius='lg'>
        <CardHeader className="absolute z-10 flex justify-between items-start">
          <div className='flex-col'>
          <p className=" uppercase font-bold">New</p>
          {/* <h4 className=" font-medium text-lg">Acme camera</h4> */}
          </div>
          <div className='flex items-center px-4'>
            <FaStar/>
            <p>&nbsp;{"4.5"}</p>
          </div>
        </CardHeader>
        {/* <CardBody className=""> */}
        {/* Image of the Book */}
        <Image
          src="https://nextui.org/images/card-example-6.jpeg"
          alt={book.title}
          width={200}
          height={300}

          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover flex-wrap "
        />
        {/* </CardBody> */}
        <CardFooter className="flex absolute bottom-0 justify-between items-center p-4">
          {/* Book Name */}
          <div>
            <p className="">{book.title?book.title:"Book Title"}</p>
            <p className="">{book.author?book.author:"Book Author"}</p>
          </div>
          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Notify Me
          </Button>
          {/* <p className="font-semibold text-center text-lg">{"bookName"}</p> */}
        </CardFooter>
      </Card>
    </div>
  )
}

export default BookCard