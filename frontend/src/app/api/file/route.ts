import { connectDB } from '@/lib/db';
import Book from '@/lib/models/book';
import { NextResponse } from 'next/server';
import multer from 'multer';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';
import { Readable } from 'stream';

// Initialize Multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to handle file uploads in the POST request
export const config = {
  api: {
    bodyParser: false, // Disable default body parser for file uploads
  },
};

// Helper function to handle parsing the form data with multer
async function parseForm(req: any, res: any): Promise<{ fields: any; file: any }> {
  return new Promise((resolve, reject) => {
    upload.single('file')(req, res, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          fields: req.body, // Other fields in the request (e.g., book metadata)
          file: req.file,   // The uploaded file
        });
      }
    });
  });
}

export async function GET() {
  if (await connectDB()) {
    try {
      const books = await Book.find();
      return NextResponse.json({ result: books, success: true });
    } catch (error) {
      return NextResponse.json({ result: error, success: false });
    }
  } else {
    return NextResponse.json({ message: 'Method Not Allowed', success: false });
  }
}

export async function POST(req:any, res:any) {
  if (await connectDB()) {
    try {
      // Parse the form data using multer
      const { fields, file } = await parseForm(req,res);

      if (!file) {
        return NextResponse.json({ message: 'No file uploaded', success: false });
      }

      if (!mongoose.connection.db) {
        return NextResponse.json({ message: 'Database connection not established', success: false });
      }

      const bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads', // Name of the GridFS bucket
      });

      // Create a readable stream from the uploaded file buffer
      const readableStream = Readable.from(file.buffer);

      // Write the file to GridFS
      const uploadStream = bucket.openUploadStream(file.originalname);
      readableStream.pipe(uploadStream);

      uploadStream.on('finish', async () => {
        // File upload completed, save book information
        const newBook = new Book({
          ...fields, // Fields like title, author, genre, etc.
          fileId: uploadStream.id, // Store the GridFS file ID in the book document
          filename: file.originalname, // Store the file name for later retrieval
        });

        await newBook.save();
        return NextResponse.json({ result: newBook, success: true });
      });

      uploadStream.on('error', (error) => {
        return NextResponse.json({ result: error, success: false });
      });
    } catch (error) {
      return NextResponse.json({ result: error, success: false });
    }
  } else {
    return NextResponse.json({ message: 'Method Not Allowed', success: false });
  }
}
