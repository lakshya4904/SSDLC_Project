import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
  title:            { type: String, trim: true },
  authorId:         { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  publisherId:      { type: mongoose.Schema.Types.ObjectId, ref: 'Publisher' },
  categoryId:       { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  seriesId:         { type: mongoose.Schema.Types.ObjectId, ref: 'Series' },
  publicationDate:  { type: Date },
  isbn:             { type: String, trim: true },
  summary:          { type: String, trim: true },
  coverImageUrl:    { type: String, trim: true },
  fileUrl:          { type: String, trim: true },
  fileSize:         { type: Number },
  format:           { type: String, trim: true }
},
{
    timestamps: true //createdAt, updatedAt
}
);

// Compile model from schema
const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

export default Book;