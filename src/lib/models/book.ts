import mongoose, { Schema, Document, Types }from "mongoose";

// Define the interface for the Book document
export interface IBook {
  id: Types.ObjectId;
  title: string;
  author: string;
  publishers: string;
  series: string;
  isbn: string;
  summary: string;
  publishedDate: Date;
  coverImageId?: string;
  fileId?: mongoose.Types.ObjectId;
  filename?: string;
  format?: string;
  genres: Types.ObjectId[]; // Store an array of ObjectId referencing the Genre collection
  rating:number;
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new mongoose.Schema({
  title:            { type: String, trim: true },
  author:           { type: String, default: null, trim: true },
  publishers:       { type: String, default: null, trim: true },
  series:           { type: String, default: null, trim: true },
  genres:           [{ type: Schema.Types.ObjectId, default: null, ref: 'Genre' }],
  publishedDate:    { type: Date, default: null},
  isbn:             { type: String, default: null, trim: true },
  summary:          { type: String, default: null, trim: true },
  rating:           { type: Number, default: null, trim: true },
  coverImageId:     { type: Schema.Types.ObjectId, default: null, trim: true },
  fileId:           { type: Schema.Types.ObjectId, default: null, trim: true },
  filename:         { type: String },
  format:           { type: String, default: null, trim: true }
},
{
    timestamps: true //createdAt, updatedAt
}
);

// Compile model from schema
const Book = mongoose.model('Book', bookSchema);

export default Book;

// Function to initialize a Book object with default values
export const initializeBook = (data: Partial<IBook>): IBook => {
  return {
    id: data.id || new Types.ObjectId(),
    title: data.title || '',
    author: data.author || '',
    publishers: data.publishers || '',
    series: data.series || '',
    isbn: data.isbn || '',
    summary: data.summary || '',
    rating: data.rating || 0,
    publishedDate: data.publishedDate || new Date(),
    coverImageId: data.coverImageId || '',
    fileId: data.fileId || new Types.ObjectId(),
    filename: data.filename || '',
    format: data.format || '',
    genres: data.genres || [new Types.ObjectId()],
    createdAt: data.createdAt || new Date(),
    updatedAt: data.updatedAt || new Date()
  };
};