import { connectDB } from '@/lib/db';
import Book from '@/lib/models/book'; // Make sure your Book model is correctly referenced
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

// Call this in every API route file

export async function GET(req,res) {
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


export async function POST(req, res) {
  if (await connectDB()) {
    try {
      const { title, author, description, ...rest } = req.body;
      
      // Validate required fields
      if (!title || !author || !description) {
        return NextResponse.json({ message: 'Title, author, and description are required', success: false });
      }

      // Create a new book with additional dynamic fields
      const newBook = new Book({ title, author, description, ...rest });
      const result = await newBook.save();
      
      return NextResponse.json({ result: result, success: true });
    } catch (error) {
      console.error('Error saving book:', error);
      return NextResponse.json({ message: 'Internal Server Error', success: false });
    }
  } else {
    return NextResponse.json({ message: 'Database connection failed', success: false });
  }
}



