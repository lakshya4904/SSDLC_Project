import { connectDB } from '@/lib/db';
import Book from '@/lib/models/book'; // Make sure your Book model is correctly referenced
import { NextResponse } from 'next/server';

// Call this in every API route file

export async function GET() {
  if (await connectDB()) {
    try {
      const books = await Book.find();
      return NextResponse.json({result: books, success: true});
    } catch (error) {
      return NextResponse.json({result: error, success:false });
    }
  } else {
    return NextResponse.json({ message: 'Method Not Allowed',success:false });
  }
}


export async function POST(req:any, res:any) {
  if (await connectDB()) {
    try {
      const data = await req.json();
      const newBook = new Book(data);
      await newBook.save();
      return NextResponse.json({ result: newBook, success: true });
    } catch (error) {
      return NextResponse.json({ result: error, success: false });
    }
  } else {
    return NextResponse.json({ message: 'Method Not Allowed', success: false });
  }
}



