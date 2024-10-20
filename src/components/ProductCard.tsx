import React from 'react'
import AddToCart from './AddToCart'
import { Card, CardHeader, CardBody, Image, CardFooter } from "@nextui-org/react";

const ProductCard = async () => {
  //const res = await fetch('http://localhost:4904/api/books',{cache : 'no-store'});

  return (
    <Card className="w-fit shadow-lg hover:shadow-xl transition-shadow duration-300" radius='lg'>
      <CardBody className="p-4">
        {/* Image of the Book */}
        <Image
          src="https://nextui.org/images/hero-card-complete.jpeg"
          alt={"bookName"}
          width={200}
          height={300}
          
          className=" h-[150px] object-cover "
        />
      </CardBody>
      <CardFooter className="flex justify-center items-center p-4">
        {/* Book Name */}
        <p className="font-semibold text-center text-lg">{"bookName"}</p>
      </CardFooter>
    </Card>
  )
}

export default ProductCard