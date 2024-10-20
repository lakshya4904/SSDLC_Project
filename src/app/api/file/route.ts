import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';
import multer from 'multer';
import { connectDB } from '@/lib/db'; // Ensure you have a connectDB function
import Book from '@/lib/models/book'; // Ensure you have a Book model
import { NextResponse } from 'next/server';

// Initialize Multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to handle file uploads in the POST request
// export const config = {};

// Helper function to handle parsing the form data with multer
async function parseForm(req: any, res: any): Promise<{ fields: any; coverImage: any; file: any }> {
  return new Promise((resolve, reject) => {
    // Specify the fields for multer to handle
    const uploadFields = upload.fields([
      { name: 'coverImage', maxCount: 1 },
      { name: 'file', maxCount: 1 }
    ]);

    uploadFields(req, res, (err) => {
      if (err) {
        return reject(err);
      }
      resolve({ fields: req.body, coverImage: req.files['coverImage'] ? req.files['coverImage'][0] : null, file: req.files['file'] ? req.files['file'][0] : null });
    });
  });
}

export async function GET(req: any, res: any) {
  if (await connectDB()) {
    const { searchParams } = new URL(req.url);

    // Initialize an empty query object
    const query: any = {};

    // Extract parameters from query string
    const id = searchParams.get('id');          // e.g., Book ID
    const author = searchParams.get('author');   // e.g., ObjectId of author
    const title = searchParams.get('title');     // e.g., Book title
    const publisher = searchParams.get('publisher'); // e.g., ObjectId of publisher
    const genre = searchParams.get('genre');     // e.g., ObjectId of genre
    const series = searchParams.get('series');    // e.g., ObjectId of series
    const publishedDate = searchParams.get('publishedDate'); // e.g., Date string
    const isbn = searchParams.get('isbn');       // e.g., ISBN number

    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    try {
      // If an ID is provided, find the book by ID
      if (id) {
        const book = await Book.findById(id)
          .populate('genres') // Populate references for more info
          .exec();

        if (!book) {
          return NextResponse.json({
            success: false,
            message: "Book not found",
          }, { status: 404 });
        }

        return NextResponse.json({
          success: true,
          data: book,
        });
      }

      // Otherwise, build the query for other filters
      if (author) query.authors = author;
      if (title) query.title = { $regex: title, $options: 'i' }; // Case-insensitive search
      if (publisher) query.publishers = publisher;
      if (genre) query.genres = [new mongoose.Types.ObjectId(genre)];
      if (series) query.series = series;
      if (publishedDate) query.publishedDate = new Date(publishedDate);
      if (isbn) query.isbn = isbn;

      // Fetch books based on query or all if no parameters are given
      const books = await Book.find(Object.keys(query).length > 0 ? query : {})
        .sort(sort && order ? { [sort]: order === 'asc' ? 1 : -1 } : {})
        .populate('genres') // Populate references for more info
        .exec();

      return NextResponse.json({
        success: true,
        data: books,
      });
    } catch (error: any) {
      return NextResponse.json({
        error: error.message,
        success: false,
      }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: 'Method Not Allowed', success: false });
  }
}

export async function POST(req: any, res: any) {
  if (await connectDB()) {
    try {
      const { fields, coverImage, file } = await parseForm(req, res);

      const conn = mongoose.connection;
      if (!conn.db) {
        return NextResponse.json({ message: 'Database connection error', success: false });
      }
      const bucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });

      // Handle cover image upload
      let coverImageId;
      if (coverImage) {
        const coverStream = bucket.openUploadStream(coverImage.originalname);
        await new Promise((resolve, reject) => {
          coverStream.on('error', reject);
          coverStream.on('finish', resolve);
          coverStream.end(coverImage.buffer); // Assuming coverImage is a buffer
        });
        coverImageId = coverStream.id;
      }

      // Handle main book file upload
      let fileId;
      if (file) {
        const uploadStream = bucket.openUploadStream(file.originalname);
        await new Promise((resolve, reject) => {
          uploadStream.on('error', reject);
          uploadStream.on('finish', resolve);
          uploadStream.end(file.buffer); // Assuming file is a buffer
        });
        fileId = uploadStream.id;
      }

      // Create or update the book record
      const newBook = new Book({
        ...fields,
        coverImageId,
        fileId,
        filename: fields.filename,
        format: fields.format,
      });

      await newBook.save();

      return NextResponse.json({ result: newBook, success: true });
    } catch (error: any) {
      return NextResponse.json({ result: error.message || 'An error occurred', success: false });
    }
  } else {
    return NextResponse.json({ message: 'Method Not Allowed', success: false });
  }
}

export async function DELETE(req:any, res:any) {
  if (await connectDB()) {
      try {
          const bookId = req.query.id; // Assuming the ID is passed as a query parameter
          const book = await Book.findById(bookId);

          if (!book) {
              return NextResponse.json({ message: 'Book not found', success: false }, { status: 404 });
          }

      const conn = mongoose.connection;
          if (!conn.db) {
            return NextResponse.json({ message: 'Database connection error', success: false });
          }
          const bucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });

          // Delete associated files from GridFS if they exist
          if (book.fileId) {
              await bucket.delete(book.fileId); // Delete the main book file
          }

          if (book.coverImageId) {
              await bucket.delete(book.coverImageId); // Delete the cover image file
          }

          await Book.findByIdAndDelete(bookId); // Delete the book from the database
          return NextResponse.json({ message: 'Book and associated files deleted successfully', success: true });
      } catch (error:any) {
          return NextResponse.json({ result: error.message || 'An error occurred', success: false });
      }
  } else {
      return NextResponse.json({ message: 'Method Not Allowed', success: false });
  }
}
