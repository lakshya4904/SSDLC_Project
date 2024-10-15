"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BookCard from '@/components/BookCard/BookCard'; // Adjust the path as necessary
import { IBook } from '@/lib/models/book'; // Ensure this file does not import 'mongodb'
import books, { IDemoBook } from '../types/book';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [filteredBooks, setFilteredBooks] = useState<IDemoBook[]>([]);

  function binarySearchBooks(books: IDemoBook[], title: string): IDemoBook[] {
    let left = 0;
    let right = books.length - 1;
    const results: IDemoBook[] = [];

    console.log("search function:----");

    function collectMatches(index, searchTerm) {
      // Collect the matching element at the found index
      results.push(books[index]);

      let i = index - 1;
      while (i >= 0 && books[i].title.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push(books[i]);
        i--;
      }

      // Collect any matching elements after the index
      let j = index + 1;
      while (j < books.length && books[j].title.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push(books[j]);
        j++;
      }
    }

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midTitle = books[mid].title.toLowerCase();
  
      if (midTitle.includes(title.toLowerCase())) {
        // Collect all matches starting from this middle point
        collectMatches(mid, title);
        break; // Stop binary search as we found a matching point
      } else if (midTitle < title.toLowerCase()) {
        left = mid + 1; // Search in the right half
      } else {
        right = mid - 1; // Search in the left half
      }
    }

    return results;
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    // console.log(params);

    if (!params) return;

    const searchQuery = Object.fromEntries(
      Object.entries(params).flatMap(([key, value]) =>
        key.split('&').map((pair) => {
          const [k, v] = pair.split('=');
          return [k.trim(), v ? v.trim().toLowerCase() : ''];
        })
      )
    );

    console.log(searchQuery);

    // Assuming `books` is a client-side array of book objects

    // let results = books.filter(book =>
    //   (searchQuery.title ? book.title.toLowerCase().includes(searchQuery.title) : true) 
    //   &&
    //   (searchQuery.author ? book.author.toLowerCase().includes(searchQuery.author) : true) &&
    //   (searchQuery.genres ? book.genres.some(genre => genre.toString().toLowerCase().includes(searchQuery.genres)) : true) &&
    //   (searchQuery.isbn ? book.isbn.toLowerCase().includes(searchQuery.isbn) : true) &&
    //   (searchQuery.series ? book.series.toLowerCase().includes(searchQuery.series) : true) &&
    //   (searchQuery.rating ? book.rating <= parseFloat(searchQuery.rating) : true)
    // );

    const sortedBooks: IDemoBook[] = books.sort((a, b) => a.title.localeCompare(b.title));

    let results;
    // Assuming the books array is already sorted by title
    const searchTitle = searchQuery.title;
    if (searchTitle) {
      results = binarySearchBooks(sortedBooks, searchTitle);
    }

    console.log(books);
    console.log(results);

    if (results) {
      setFilteredBooks(results)
    };
  }, [searchParams]);

  return (
    <div>
      <h1>Searched Result</h1>
      {filteredBooks.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8'>
          {filteredBooks.map(book => (
            <BookCard key={book.id.toString()} book={book} />
          ))}
        </div>

      ) : (
        <p>Book Not Found</p>
      )}
    </div>
  );
};

export default SearchPage;