import { timeStamp } from "console";
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author', // Referencing the Author model
  },
  publisherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher', // Referencing the Publisher model
    
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Referencing the Category model
    
  },
  publicationDate: {
    type: Date,
  },
  isbn: {
    type: String,
    unique:true,
    trim: true
  },
  summary: {
    type: String,
    trim: true
  },
  coverImageUrl: {
    type: String,
    trim: true
  },
  fileUrl: {
    type: String,
    trim: true
  },
  fileSize: {
    type: Number, // File size in MB
  },
  format: {
    type: String, // e.g., 'pdf', 'epub'
    trim: true
  }
},{
    timestamps: true //createdAt, updatedAt
}
);

// Compile model from schema
const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

export default Book;