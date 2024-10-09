import { connectDB } from '@/lib/db';
import Book from '@/lib/models/book'; // Ensure the Book model is correctly referenced
import { NextResponse } from 'next/server';
import multer from 'multer';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';
import { Readable } from 'stream';

// Initialize Multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false, // Disable body parser for file uploads
  },
};

// Helper function to parse form data and handle file upload
async function parseForm(req: any,res:any): Promise<{ fields: any; file: any }> {
  return new Promise((resolve, reject) => {
    upload.single('file')(req, res, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          fields: req.body, // Metadata of the book
          file: req.file,   // The uploaded file (cover, content)
        });
      }
    });
  });
}

// PUT API (Update book data and upload file)
export async function PUT(req: any, res: any) {
  const bookId = res.params.bookId;

  if (await connectDB()) {
    try {
      // Parse form data to get the file and fields
      const { fields, file } = await parseForm(req,res);

      // Initialize GridFS bucket for file storage
      if (!mongoose.connection.db) {
        return NextResponse.json({ message: 'Database connection is not established', success: false });
      }
      const bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads', // Name of the GridFS bucket
      });

      // If a file is uploaded, handle the file update
      if (file) {
        // Create a readable stream from the uploaded file buffer
        const readableStream = Readable.from(file.buffer);

        // Upload the file to GridFS
        const uploadStream = bucket.openUploadStream(file.originalname);
        readableStream.pipe(uploadStream);

        // Once the file upload completes, update the book data with the new file information
        uploadStream.on('finish', async () => {
          const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            {
              ...fields,             // Update other fields like title, author, etc.
              fileId: uploadStream.id, // Store the new file ID
              filename: file.originalname, // Store the new file name
            },
            { new: true }
          );

          return NextResponse.json({ result: updatedBook, success: true });
        });

        uploadStream.on('error', (error) => {
          return NextResponse.json({ message: `File upload failed: ${error.message}`, success: false });
        });
      } else {
        // If no file is uploaded, just update the book metadata
        const updatedBook = await Book.findByIdAndUpdate(bookId, fields, { new: true });
        return NextResponse.json({ result: updatedBook, success: true });
      }
    } catch (error) {
      return NextResponse.json({ message: 'Internal Server Error', success: false });
    }
  } else {
    return NextResponse.json({ message: 'Database connection failed', success: false });
  }
}

//make a delete api
export async function DELETE(req:any, res:any) {
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

export async function GET(req: any, res: any) {
  const bookId = res.params.bookId;

  if (await connectDB()) {
    try {
      const book = await Book.findById(bookId);

      if (!book) {
        return NextResponse.json({ error: 'Book not found', success: false });
      }

      // Add a file URL for retrieving the uploaded file (if available)
      const bookWithFileUrl = {
        ...book.toObject(),
        fileUrl: book.fileId ? `/api/books/file/${book.fileId}` : null, // Provide file URL if file exists
      };

      return NextResponse.json({ result: bookWithFileUrl, success: true });
    } catch (error) {
      return NextResponse.json({ message: 'Internal Server Error', success: false });
    }
  } else {
    return NextResponse.json({ message: 'Database connection failed', success: false });
  }
}





