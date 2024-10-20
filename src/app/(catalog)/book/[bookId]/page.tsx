'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegBookmark, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import path from "path";


type Props = {
  params: {
    bookId: string;
    // book:Book;
  };
}

// export const revalidate = 3600;

// export async function genrateStaticParams(){
//   const bookIds = Book.find({}).select('_id').exec();

//   return (await bookIds).map((bookId) => ({
//     // params: { bookId: book._id.toString() },
//     bookId,
//   }));
// }



const BookDetails = ({ params }: Props) => {
  const [book, setBook] = useState();
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    if (params.bookId) {
      // Replace the URL with the correct path to your book data
      fetch(`/api/books?_id=${params.bookId}`) // Adjust this path according to where your book data is stored
        .then(async response => {
          const result = await response.json();
          // const foundBook = data.((book) => book._id === params.bookId); 
          // console.log('data:- ', result);
          // console.log('foundBook:- ',foundBook);
          setBook(result.data);

        })
        .catch(error => console.error('Error fetching book data:', error));
    }
  }, [params.bookId]); // Only fetch the book data when the bookId changes


  if (!book) {
    return <p>Loading...</p>; // Display loading state
  }

  const handleReadBook = () => {
    // Add your logic to handle reading the book here
    window.open(book.file, '_blank');
  };

  const handleDownloadBook = () => {
    const link = document.createElement('a');
    link.href = book.file;
    link.download = `${book.title}${path.extname(book.file)}`; // Adjust the file extension if necessary
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="my-4 h-full">
      <section className="bg-default-100 p-6 flex-col flex md:flex-row rounded-3xl gap-8" >
        <div className="relative aspect-novel h-[300px] md:my-6  w-[200px] mx-auto flex justify-center items-center">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            objectFit="cover"

            className="rounded-lg"
            loading='lazy'
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

        </div>
        <div className=" flex flex-col w-full gap-4">
          <h1 className="text-2xl md:text-4xl my-6 font-bold">{book.title}</h1>
          <span>
            <a href="#" className={`text-lg underline transition-colors duration-300 ease-in-out text-primary-400 hover:text-primary-300 mb-4`}>{book.author}</a>
          </span>
          <div className=" flex-col gap-4 mt-4 flex md:flex-row items-center justify-center">
            <a className="flex items-center justify-center hover:text-default-400 transition-colors duration-300" >
              <FaRegStar size={"20px"} />
              <p className="text-orange-400">&nbsp;{book.rating.toFixed(1)}</p> / 5.0
            </a>
            <div className=" mt-4 md:mt-0 flex items-center justify-center gap-6 h-fit">
              <a className="hover:text-default-400 transition-colors duration-300" >
                <FaRegHeart size={"20px"} />
              </a>
              <a className="hover:text-default-400 transition-colors duration-300" >
                <FaRegBookmark size={"20px"} />
              </a>
            </div>
          </div>
          <div className=" my-5 ">
            <p id="summary" className={`${readMore ? ' ' : 'line-clamp-5'} m-0`}>{book.summary} </p>
            <a href="#" className="underline" onClick={() => { setReadMore(!readMore) }}>{readMore ? 'Read Less' : 'Read More'}</a>
          </div>

          <div className="grid md:grid-cols-2 gap-2">

            <div className="grid grid-cols-2 gap-y-2">
              <div className="">Genre:</div>
              <div className="">
                <a className="underline overflow-clip">None</a>
              </div>
              <div className="">PublishedDate:</div>
              <div className="">
                <p className="">{book.publishedDate ? book.publishedDate : '--/--'}</p>
              </div>
              <div className="">Series:</div>
              <div className="">
                <a className="underline">None</a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-2">

              <div className="">ISBN:</div>
              <div className="">
                <a className="underline">{book.isbn}</a>
              </div>
              <div className="">publisher:</div>
              <div className="">
                <a className="underline">{book.publisher}</a>
              </div>

              <div className="">Volume:</div>
              <div className="">
                <p className="">--</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-10 md:flex-row justify-center content-evenly">
            <Button
              className=""
              color="primary"
              radius="sm"
              onClick={handleReadBook}
            >
              Read Book
            </Button>
            <Button
              className=""
              color="default"
              radius="sm"
              onClick={handleDownloadBook}
            >
              Download
            </Button>

          </div>
        </div>
      </section>
    </div>
  );
};

export default BookDetails;
