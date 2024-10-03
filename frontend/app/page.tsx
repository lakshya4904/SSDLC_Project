import Link from "next/link";
import { Button } from '@nextui-org/button';
import BookCard from "./components/BookCard/BookCard";
import styles from "./index.module.css";

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "https://www.google.com/imgres?q=Novel%20cover%20page%20ideas&imgurl=https%3A%2F%2Fimages-platform.99static.com%2F%2F7Tzd__lpPb0VX-WVWt7OyKfFc40%3D%2Ffit-in%2F500x500%2Fprojects-files%2F56%2F5686%2F568603%2Fcd37bbc0-40b8-46e1-8c91-96ef13fea333.jpg&imgrefurl=https%3A%2F%2F99designs.com%2Finspiration%2Fbook-covers%2Fsimple&docid=WoRI14h3UEzLaM&tbnid=8oZc63jmJrXxPM&vet=12ahUKEwjjxO7S3vKIAxVVd2wGHWEaDIEQM3oECBkQAA..i&w=313&h=500&hcb=2&ved=2ahUKEwjjxO7S3vKIAxVVd2wGHWEaDIEQM3oECBkQAA",
    description: "A classic novel about the American dream in the 1920s, exploring themes of wealth, society, and the American identity.",
    genre: "Fiction",
    publishedYear: 1925,
    rating: 5
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    description: "A dystopian novel about totalitarianism, surveillance, and the dangers of authoritarianism.",
    genre: "Dystopian Fiction",
    publishedYear: 1949,
    rating: 4.8
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage: "https://images.unsplash.com/photo-1544933780-9de02d42139e",
    description: "A novel about racial inequality and injustice in the American South, seen through the eyes of a young girl.",
    genre: "Historical Fiction",
    publishedYear: 1960,
    rating: 4.8
  },
  {
    id: 4,
    title: "Moby Dick",
    author: "Herman Melville",
    coverImage: "https://images.unsplash.com/photo-1563201519-8a56d234f54e",
    description: "A seafaring adventure that delves into obsession, revenge, and the human struggle against nature.",
    genre: "Adventure Fiction",
    publishedYear: 1851,
    rating: 2.8
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage: "https://images.unsplash.com/photo-1516796189561-489d4e4b4b16",
    description: "A romantic novel that explores the manners and matrimonial machinations of British Regency society.",
    genre: "Romance",
    publishedYear: 1813,
    rating: 4
  },
  {
    id: 6,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    coverImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    description: "A story about adolescent alienation and the loss of innocence in the post-war era.",
    genre: "Young Adult Fiction",
    publishedYear: 1951,
    rating: 4.8
  },
  {
    id: 7,
    title: "Brave New World",
    author: "Aldous Huxley",
    coverImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
    description: "A dystopian novel that imagines a future society defined by technological control, conditioning, and loss of individuality.",
    genre: "Dystopian Fiction",
    publishedYear: 1932,
    rating: 3.8
  },
  {
    id: 8,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverImage: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b",
    description: "A fantasy adventure following the journey of Bilbo Baggins as he embarks on an epic quest.",
    genre: "Fantasy",
    publishedYear: 1937,
    rating: 4.3
  },
  {
    id: 9,
    title: "Frankenstein",
    author: "Mary Shelley",
    coverImage: "https://images.unsplash.com/photo-1507149833265-60c372daea22",
    description: "A gothic novel about a scientist who creates a monstrous lifeform, sparking themes of ambition, ethics, and humanity.",
    genre: "Horror",
    publishedYear: 1818,
    rating: 5
  },
  {
    id: 10,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    description: "The first installment of the epic fantasy trilogy, where a young hobbit embarks on a journey to destroy a powerful ring.",
    genre: "Fantasy",
    publishedYear: 1954,
    rating: 4.8
  }
]

export default function Home() {
  return (
    <main className="container">
      {/* <h1>Hello World</h1> */}

      <div className="p-8 m-10">
        <h1 className="text-3xl font-bold !mb-8">Book Library</h1>
        <div className={styles.bookRoll}>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </main>
  );
}
