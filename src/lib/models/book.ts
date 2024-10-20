import mongoose, { Schema, Document, Types }from "mongoose";
// import  connectDB  from "../db";

// Define the interface for the Book document
export interface IBook {
  id: Types.ObjectId;
  title: string;
  author: string;
  publisher: string;
  series: string;
  isbn: string;
  summary: string;
  publishedDate: Date;
  coverImage?: string;
  file?: string;
  genres: Types.ObjectId[]; // Store an array of ObjectId referencing the Genre collection
  rating:number;
  createdAt: Date;
  updatedAt: Date;
}

export const BookSchema: Schema = new Schema({
  title:            { type: String, trim: true },
  author:           { type: String, trim: true },
  publisher:        { type: String, trim: true },
  series:           { type: String, trim: true },
  genres:           [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
  publishedDate:    { type: String, default: null },
  isbn:             { type: String, trim: true },
  summary:          { type: String, trim: true },
  rating:           { type: Number, default:0.0 },
  coverImage:       { type: String, trim: true },
  file:             { type: String, trim: true },
}, {
  timestamps: true // createdAt, updatedAt
});

// Compile model from schema
const Book = mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);

export default Book;

// Function to initialize a Book object with default values
export const initializeBook = (data: Partial<IBook>): IBook => {
  return {
    id: data.id || new Types.ObjectId(),
    title: data.title || '',
    author: data.author || '',
    publisher: data.publisher || '',
    series: data.series || '',
    isbn: data.isbn || '',
    summary: data.summary || '',
    rating: data.rating || 0,
    publishedDate: data.publishedDate || new Date(),
    coverImage: data.coverImage || '',
    file: data.file || '',
    genres: data.genres || [new Types.ObjectId()],
    createdAt: data.createdAt || new Date(),
    updatedAt: data.updatedAt || new Date()
  };
};