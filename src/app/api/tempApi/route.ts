import { connectDB } from '@/lib/db';
import User, { initializeUser } from '@/lib/models/user'; // Make sure your User model is correctly referenced
import multer from 'multer';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { writeFile } from 'fs/promises';
import uploadFile from '../util/UploadFile';
import Temp from '@/lib/models/temp';

// Ensure the uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// // Call this in every API route file
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads/temp')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, file.originalname + '_' + uniqueSuffix + path.extname(file.originalname))
//   }
// });
// const upload = multer({ storage: storage });

// export const config = {
//   api: {
//     bodyParser: false,
//   }
// }

export async function GET() {

}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('tempImage') as File;

    if (!file) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const tempImage = await uploadFile(file, path.parse(file.name).name, 'temp', uploadDir);

    const temp = new Temp({image: tempImage });

    await temp.save();



    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}
