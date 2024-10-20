import { connectDB } from '@/lib/db'; // Ensure you have a connectDB function
import Book from '@/lib/models/book'; // Ensure you have a Book model
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import uploadFile from '../util/UploadFile';

export async function GET(req: any, res: any) {
  if (await connectDB()) {
    const { searchParams } = new URL(req.url);

    // Initialize an empty query object
    const query: any = {};

    // Extract parameters from query string
    const id = searchParams.get('_id');          // e.g., Book ID
    const author = searchParams.get('author');   // e.g., ObjectId of author
    const title = searchParams.get('title');     // e.g., Book title
    const publisher = searchParams.get('publisher'); // e.g., ObjectId of publisher
    // const genre = searchParams.get('genre');     // e.g., ObjectId of genre
    const series = searchParams.get('series');    // e.g., ObjectId of series
    const publishedDate = searchParams.get('publishedDate'); // e.g., Date string
    const isbn = searchParams.get('isbn');       // e.g., ISBN number

    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1'); // Default to page 1
    const limit = 15; // Limit the number of records per page
    const skip = (page - 1) * limit; // Skip based on page


    try {
      // If an ID is provided, find the book by ID
      if (id) {
        const book = await Book.findById(id)
          // .populate('genres') // Populate references for more info
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
      if (title) query.title = { $regex: title, $options: 'i'  }; 
      if (author) query.authors = { $regex: author, $options: 'i'  };
      if (publisher) query.publishers = { $regex: publisher, $options: 'i'  };
      // if (genre) query.genres = genre;
      if (series) query.series = series;
      if (publishedDate) query.publishedDate = publishedDate;
      if (isbn) query.isbn = isbn;
      

      // Fetch books based on query or all if no parameters are given
      const books = await Book.find(Object.keys(query).length > 0 ? query : {})
        .sort(sort && order ? { [sort]: order === 'asc' ? 1 : -1 } : {})
        .skip(skip) // Skip records for pagination
        .limit(limit) // Limit the results to 10 records
        // .populate('genres') // Populate references for more info
        .exec();

        if (books.length === 0) {
          return NextResponse.json({ error: 'Book not found', success: false });
        }

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
      const formData = await req.formData();

      const coverImageFile = formData.get('coverImage') as File;
      const bookFile = formData.get('file') as File;

      const newBook = new Book({
        title: formData.get('title'),
        author: formData.get('author'),
        publisher: formData.get('publisher'),
        publishedDate: formData.get('publishedDate'),
        series: formData.get('series'),
        isbn: formData.get('isbn'),
        summary: formData.get('summary'),
        rating: formData.get('rating'),
      });

      if (coverImageFile) {
        const coverImage = await uploadFile(coverImageFile, formData.get('title'), 'BookCovers');
        newBook.coverImage = coverImage;
        //return NextResponse.json({ error: "No files received." }, { status: 400 });
      }

      if (bookFile) {
        const file = await uploadFile(bookFile, formData.get('title'), 'Books');
        newBook.file = file;
        //return NextResponse.json({ error: "No files received." }, { status: 400 });
      }

      const savedBook = await newBook.save();
      if (!savedBook) {
        return NextResponse.json({ error: "Failed to save the book." }, { status: 500 });
      }

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

          await Book.findByIdAndDelete(bookId); // Delete the book from the database
          return NextResponse.json({ message: 'Book and associated files deleted successfully', success: true });
      } catch (error:any) {
          return NextResponse.json({ result: error.message || 'An error occurred', success: false });
      }
  } else {
      return NextResponse.json({ message: 'Method Not Allowed', success: false });
  }
}
