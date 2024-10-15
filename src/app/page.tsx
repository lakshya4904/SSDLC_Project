import Link from "next/link";
import { Button } from '@nextui-org/button';
import BookCard from "../components/BookCard/BookCard";
import styles from "./index.module.css";
import books from "./types/book";


export default function Home() {
  return (
    <main className="">
      {/* <h1>Hello World</h1> */}

      <div className="">
        <h3 className="my-4 border-default border-b-2">Recents</h3>
        <br className=" "/>
        <div className={styles.bookRoll}>
          {books.map((book) => (
            <BookCard key={book.id.toString()} book={book} />
          ))}
        </div>
      </div>
    </main>
  );
}
