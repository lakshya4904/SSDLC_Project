import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req:any, res:any) {
  const { identifier } = req.query;

  if (await connectDB()) {
    try {
      if (!mongoose.connection.db) {
        return NextResponse.json({ message: 'Database connection not established', success: false });
      }

      const bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads',
      });

      const downloadStream = bucket.openDownloadStream(identifier);

      downloadStream.on('data', (chunk:any) => {
        res.write(chunk);
      });

      downloadStream.on('end', () => {
        res.end();
      });

      downloadStream.on('error', (error:any) => {
        return NextResponse.json({ message: `File not found: ${error.message}`, success: false });
      });
    } catch (error) {
      return NextResponse.json({ result: error, success: false });
    }
  } else {
    return NextResponse.json({ message: 'Method Not Allowed', success: false });
  }
}
