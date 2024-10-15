 import { StaticImageData } from "next/image";
import cover1984 from "../public/1984.jpg";
 import coverCrimeAndPunishment from "../public/CrimeAndPunishment.jpg";
 import coverMobyDick from "../public/MobyDick.jpg";
 import coverPrideAndPrejudice from "../public/PrideAndPrejudice.jpg";
 import coverTheBrothersKaramazov from "../public/TheBrothersKaramazov.jpg";
 import coverTheCatcherInTheRye from "../public/TheCatcherInTheRye.jpg";
 import coverTheGreatGatsby from "../public/TheGreatGatsby.jpg";
 import coverTheOdyssey from "../public/TheOdyssey.jpg";
 import coverToKillAMockingbird from "../public/ToKillAMockingbird.jpg";
 import coverWarAndPeace from "../public/WarAndPeace.jpg";

// Define the IBook interface directly in this file
export interface IDemoBook {
  id: string;
  title: string;
  author: string;
  coverImageId: StaticImageData;
  summary: string;
  genres: string[];
  publishedDate: Date;
  rating: number;
  publishers: string;
  isbn: string;
  series: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the books array with 10 sample records
const books: IDemoBook[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImageId: coverTheGreatGatsby,
    summary: "A classic novel about the American dream in the 1920s, exploring themes of wealth, society, and the American identity.",
    genres: ["Classic", "Fiction"],
    publishedDate: new Date("1925-04-10"),
    rating: 5,
    publishers: "Charles Scribner's Sons",
    isbn: "978-0-7432-7356-5",
    series: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    coverImageId: cover1984,
    summary: "A dystopian novel set in a totalitarian society ruled by Big Brother.",
    genres: ["Dystopian", "Political Fiction"],
    publishedDate: new Date("1949-06-08"),
    rating: 4.5,
    publishers: "Secker & Warburg",
    isbn: "978-0-452-28423-4",
    series: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImageId: coverToKillAMockingbird,
    summary: "A novel about the serious issues of rape and racial inequality.",
    genres: ["Classic", "Fiction"],
    publishedDate: new Date("1960-07-11"),
    rating: 4.8,
    publishers: "J.B. Lippincott & Co.",
    isbn: "978-0-06-112008-4",
    series: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImageId: coverPrideAndPrejudice,
    summary: "A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet.",
    genres: ["Classic", "Romance"],
    publishedDate: new Date("1813-01-28"),
    rating: 4.7,
    publishers: "T. Egerton",
    isbn: "978-0-19-953556-9",
    series: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    coverImageId: coverTheCatcherInTheRye,
    summary: "A novel about the events and circumstances that occur around the protagonist, Holden Caulfield.",
    genres: ["Classic", "Fiction"],
    publishedDate: new Date("1951-07-16"),
    rating: 4.3,
    publishers: "Little, Brown and Company",
    isbn: "978-0-316-76948-0",
    series: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6",
    title: "Moby-Dick",
    author: "Herman Melville",
    coverImageId: coverMobyDick,
    summary: "A novel about the voyage of the whaling ship Pequod.",
    genres: ["Adventure", "Classic"],
    publishedDate: new Date("1851-10-18"),
    rating: 4.1,
    publishers: "Harper & Brothers",
    isbn: "978-0-14-243724-7",
    series: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "7",
    title: "War and Peace",
    author: "Leo Tolstoy",
    coverImageId: coverWarAndPeace,
    summary: "A novel that chronicles the history of the French invasion of Russia.",
    genres: ["Historical Fiction", "Classic"],
    publishedDate: new Date("1869"),
    rating: 4.8,
    publishers: "The Russian Messenger",
    isbn: "978-0-14-044793-4",
    series: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "8",
    title: "The Odyssey",
    author: "Homer",
    coverImageId: coverTheOdyssey,
    summary: "An epic poem that focuses on the Greek hero Odysseus.",
    genres: ["Epic", "Classic"],
    publishedDate: new Date("-800"),
    rating: 4.6,
    publishers: "Ancient Greece",
    isbn: "978-0-14-026886-7",
    series: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "9",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    coverImageId: coverCrimeAndPunishment,
    summary: "A novel about the mental anguish and moral dilemmas of Rodion Raskolnikov.",
    genres: ["Psychological Fiction", "Classic"],
    publishedDate: new Date("1866"),
    rating: 4.7,
    publishers: "The Russian Messenger",
    isbn: "978-0-14-044913-6",
    series: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "10",
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    coverImageId: coverTheBrothersKaramazov,
    summary: "A novel that explores deep philosophical and theological themes.",
    genres: ["Philosophical Fiction", "Classic"],
    publishedDate: new Date("1880"),
    rating: 4.9,
    publishers: "The Russian Messenger",
    isbn: "978-0-14-044924-2",
    series: "",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default books;