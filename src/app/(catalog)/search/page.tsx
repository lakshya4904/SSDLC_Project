"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BookCard from '@/components/BookCard/BookCard'; // Adjust the path as necessary

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [filteredBooks, setFilteredBooks] = useState([]);



  useEffect(() => {
    fetch(`/api/books?${searchParams.toString()}`) // Adjust this path according to where your book data is stored
      .then(async response => {
        const result = await response.json();
        if (result.success)
          setFilteredBooks(result.data);
        else {
          setFilteredBooks([]);
          console.log('Error fetching book data:', result.error);
        }

      })
      .catch(error => console.error('Error fetching book data:', error));

  }, [searchParams]);

  return (
    <div>
      {filteredBooks.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8'>
          {filteredBooks.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

      ) : (
        <p>Book Not Found</p>
      )}
    </div>
  );
};

export default SearchPage;