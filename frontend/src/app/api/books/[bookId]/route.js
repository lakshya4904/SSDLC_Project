import { connectDB } from '@/lib/db';
import Book from '@/lib/models/book'; // Make sure your Book model is correctly referenced
import { NextResponse } from 'next/server';


// Put API
export async function PUT(req, res) {
  if (await connectDB()) {
    try {
      const bookId = res.params.bookId;
      const filter = {_id:bookId};
      const payload = await req.json();

      const result = await Book.findByIdAndUpdate(filter,payload,{new : true});

      return NextResponse.json({ result: result, success: true });
    } catch (error) {
      return NextResponse.json({ message: 'Internal Server Error', success: false });
    }
  } else {
    return NextResponse.json({ message: 'Database connection failed', success: false });
  }
}

//make a delete api
export async function DELETE(req , res ) {
  if (await connectDB()) {
    try {
      const bookId = res.params.bookId;
      const result = await Book.findByIdAndDelete(bookId);
      return NextResponse.json({ result: result, success: true });

    } catch (error) {
      return NextResponse.json({ message: 'Internal Server Error', success: false });
    }
  } else {
    return NextResponse.json({ message: 'Database connection failed', success: false });
  }
}


export async function GET(req, res) {
  const bookId = res.params.bookId;
  
  if (!bookId) {
    return NextResponse.json({ error: 'Book ID is required', success: false });
  }

  const book = await Book.findById(bookId);

  if (!book) {
    return NextResponse.json({ error: 'Book not found', success: false });
  }

  return NextResponse.json({result: book, success: false });
}




