// 'use client'
import BookCard from "../components/BookCard/BookCard";
import styles from "./index.module.css";
import { useEffect, useState } from "react";

async function fetchBooks() {
  const response = await fetch('http://localhost:3000/api/books', {
    method: 'GET'
  });
  const result = await response.json();

  const data = result.data || [];
  // console.log(data);
  
  return data;
};

export default async function Home() {
  const books = await fetchBooks();

  return (
      <div className="">
        <h3 className="py-4 border-default border-b-2">Recents</h3>
        <br className=" "/>
        <div className={styles.bookRoll}>
          {books.map((book) => (
            <BookCard key={book._id ? book._id.toString() : Math.random().toString()} book={book} />
          ))}
        </div>
      </div>
  );
}
