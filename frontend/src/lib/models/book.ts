import mongoose, { Schema, Document, Types }from "mongoose";

// Define the interface for the Book document
export interface IBook {
  id: Types.ObjectId;
  title: string;
  authors: string;
  publishers: string;
  series: string;
  isbn: string;
  summary: string;
  publishedDate: Date;
  coverImageURL?: string;
  fileId?: mongoose.Types.ObjectId;
  filename?: string;
  format?: string;
  genres: Types.ObjectId[]; // Store an array of ObjectId referencing the Genre collection
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new mongoose.Schema({
  title:            { type: String, trim: true },
  authors:          { type: String, default: null, trim: true },
  publishers:       { type: String, default: null, trim: true },
  series:           { type: String, default: null, trim: true },
  genres:           { type: mongoose.Types.ObjectId, default: null, ref: 'Genre' },
  publishedDate:    { type: Date, default: null},
  isbn:             { type: String, default: null, trim: true },
  summary:          { type: String, default: null, trim: true },
  coverImageURL:    { type: String, default: null, trim: true },
  fileId:           { type: mongoose.Types.ObjectId, default: null, trim: true },
  filename:         { type: Number },
  format:           { type: String, default: null, trim: true }
},
{
    timestamps: true //createdAt, updatedAt
}
);

// Compile model from schema
const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

export default Book;

// Function to initialize a Book object with default values
export const initializeBook = (data: Partial<IBook>): IBook => {
  return {
    id: data.id || new mongoose.Types.ObjectId(),
    title: data.title || '',
    authors: data.authors || '',
    publishers: data.publishers || '',
    series: data.series || '',
    isbn: data.isbn || '',
    summary: data.summary || '',
    publishedDate: data.publishedDate || new Date(),
    coverImageURL: data.coverImageURL || '',
    fileId: data.fileId,
    filename: data.filename || '',
    format: data.format || '',
    genres: data.genres || [],
    createdAt: data.createdAt || new Date(),
    updatedAt: data.updatedAt || new Date()
  };
};