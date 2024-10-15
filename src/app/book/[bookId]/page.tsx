// 'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Book } from '@/app/types/book';
import { Metadata } from 'next';


type Props = {
  params: {
    bookId: string;
    // book:Book;
  };
}

export const generateMetadata = ({params}:Props) : Metadata => {
  return {
    // title: params.book.title? "" : `Book ${params.bookId}`,
    title: `Book ${params.bookId}`,
  };
};

const BookDetails = ({ params }: Props) => {
  // const {bookId} = useParams();
  // console.log(bookId);


  //const { bookId } = router.query; // Extract bookId from query parameters
  // const [book, setBook] = useState(null);

  // useEffect(() => {
  //   if (bookId) {
  //     // Replace the URL with the correct path to your book data
  //     fetch('/api/books') // Adjust this path according to where your book data is stored
  //       .then(response => response.json())
  //       .then(data => {
  //         const foundBook = data.find((book) => book.id === bookId); 
  //         setBook(foundBook);
  //       })
  //       .catch(error => console.error('Error fetching book data:', error));
  //   }
  // }, [bookId]);

  // if (!book) {
  //   return <p>Loading...</p>; // Display loading state
  // }

  return (
    <div>
      <h1>Book Details {params.bookId}</h1>
      {/* <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.description}</p> */}
      {/* Add more book details here */}
    </div>
  );
};

export default BookDetails;
