"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BookCard from '@/components/BookCard/BookCard'; // Adjust the path as necessary
import { IBook } from '@/lib/models/book'; // Ensure this file does not import 'mongodb'

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>([]);

  useEffect(() => {
    if (Object.keys(query).length === 0) return;

    //console.log(query);

    const searchQuery = {
      title: query.title?.toLowerCase() || '',
      author: query.author?.toLowerCase() || '',
      genres: query.genres?.toLowerCase() || '',
      isbn: query.isbn?.toLowerCase() || '',
      series: query.series?.toLowerCase() || '',
      rating: parseFloat(query.rating || '')
    };

    // console.log(searchQuery);
    

    // Assuming `books` is a client-side array of book objects
    const books: IBook[] = []; // Replace with actual data source

    const results = books.filter(book =>
      (searchQuery.title ? book.title.toLowerCase().includes(searchQuery.title) : true) &&
      (searchQuery.author ? book.author.toLowerCase().includes(searchQuery.author) : true) &&
      (searchQuery.genres ? book.genres.some(genre => genre.toString().toLowerCase().includes(searchQuery.genres)) : true) &&
      (searchQuery.isbn ? book.isbn.toLowerCase().includes(searchQuery.isbn) : true) &&
      (searchQuery.series ? book.series.toLowerCase().includes(searchQuery.series) : true) &&
      (searchQuery.rating ? book.rating <= searchQuery.rating : true)
    );

    setFilteredBooks(results);
  }, [query]);

  return (
    <div>
      {filteredBooks.length > 0 ? (
        filteredBooks.map(book => (
          <BookCard key={book.id.toString()} book={book} />
        ))
      ) : (
        <p>Book Not Found</p>
      )}
    </div>
  );
};

export default SearchPage;