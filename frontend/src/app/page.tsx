import Link from "next/link";
import { Button } from '@nextui-org/button';
import BookCard from "../components/BookCard/BookCard";
import styles from "./index.module.css";
import { Book } from "./types/book";

const books:Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    authorId: "F. Scott Fitzgerald",
    coverImageUrl: "https://www.google.com/imgres?q=Novel%20cover%20page%20ideas&imgurl=https%3A%2F%2Fimages-platform.99static.com%2F%2F7Tzd__lpPb0VX-WVWt7OyKfFc40%3D%2Ffit-in%2F500x500%2Fprojects-files%2F56%2F5686%2F568603%2Fcd37bbc0-40b8-46e1-8c91-96ef13fea333.jpg&imgrefurl=https%3A%2F%2F99designs.com%2Finspiration%2Fbook-covers%2Fsimple&docid=WoRI14h3UEzLaM&tbnid=8oZc63jmJrXxPM&vet=12ahUKEwjjxO7S3vKIAxVVd2wGHWEaDIEQM3oECBkQAA..i&w=313&h=500&hcb=2&ved=2ahUKEwjjxO7S3vKIAxVVd2wGHWEaDIEQM3oECBkQAA",
    summary: "A classic novel about the American dream in the 1920s, exploring themes of wealth, society, and the American identity.",
    genreId: "Fiction",
    publicationDate: 1925,
    rating: 5,
    publisherId: "",
    isbn: ""
  },
  {
    id: "2",
    title: "1984",
    authorId: "George Orwell",
    coverImageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    summary: "A dystopian novel about totalitarianism, surveillance, and the dangers of authorIditarianism.",
    genreId: "Dystopian Fiction",
    publicationDate: 1949,
    rating: 4.8,
    publisherId: "",
    isbn: ""
  },
  {
    id: "3",
    title: "To Kill a Mockingbird",
    authorId: "Harper Lee",
    coverImageUrl: "https://images.unsplash.com/photo-1544933780-9de02d42139e",
    summary: "A novel about racial inequality and injustice in the American South, seen through the eyes of a young girl.",
    genreId: "Historical Fiction",
    publicationDate: 1960,
    rating: 4.8,
    publisherId: "",
    isbn: ""
  },
  {
    id: "4",
    title: "Moby Dick",
    authorId: "Herman Melville",
    coverImageUrl: "https://images.unsplash.com/photo-1563201519-8a56d234f54e",
    summary: "A seafaring adventure that delves into obsession, revenge, and the human struggle against nature.",
    genreId: "Adventure Fiction",
    publicationDate: 1851,
    rating: 2.8,
    publisherId: "",
    isbn: ""
  },
  {
    id: "5",
    title: "Pride and Prejudice",
    authorId: "Jane Austen",
    coverImageUrl: "https://images.unsplash.com/photo-1516796189561-489d4e4b4b16",
    summary: "A romantic novel that explores the manners and matrimonial machinations of British Regency society.",
    genreId: "Romance",
    publicationDate: 1813,
    rating: 4,
    publisherId: "",
    isbn: ""
  },
  {
    id: "6",
    title: "The Catcher in the Rye",
    authorId: "J.D. Salinger",
    coverImageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    summary: "A story about adolescent alienation and the loss of innocence in the post-war era.",
    genreId: "Young Adult Fiction",
    publicationDate: 1951,
    rating: 4.8,
    publisherId: "",
    isbn: ""
  },
  {
    id: "7",
    title: "Brave New World",
    authorId: "Aldous Huxley",
    coverImageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
    summary: "A dystopian novel that imagines a future society defined by technological control, conditioning, and loss of individuality.",
    genreId: "Dystopian Fiction",
    publicationDate: 1932,
    rating: 3.8,
    publisherId: "",
    isbn: ""
  },
  {
    id: "8",
    title: "The Hobbit",
    authorId: "J.R.R. Tolkien",
    coverImageUrl: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b",
    summary: "A fantasy adventure following the journey of Bilbo Baggins as he embarks on an epic quest.",
    genreId: "Fantasy",
    publicationDate: 1937,
    rating: 4.3,
    publisherId: "",
    isbn: ""
  },
  {
    id: "9",
    title: "Frankenstein",
    authorId: "Mary Shelley",
    coverImageUrl: "https://images.unsplash.com/photo-1507149833265-60c372daea22",
    summary: "A gothic novel about a scientist who creates a monstrous lifeform, sparking themes of ambition, ethics, and humanity.",
    genreId: "Horror",
    publicationDate: 1818,
    rating: 5,
    publisherId: "",
    isbn: ""
  },
  {
    id: "10",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    authorId: "J.R.R. Tolkien",
    coverImageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    summary: "The first installment of the epic fantasy trilogy, where a young hobbit embarks on a journey to destroy a powerful ring.",
    genreId: "Fantasy",
    publicationDate: 1954,
    rating: 4.8,
    publisherId: "",
    isbn: ""
  }
]

export default function Home() {
  return (
    <main className="">
      {/* <h1>Hello World</h1> */}

      <div className="">
        <h3 className="my-4 border-default border-b-2">Recents</h3>
        <br className=" "/>
        <div className={styles.bookRoll}>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </main>
  );
}
