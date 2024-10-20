import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';

export default async function uploadFile(file: File, title: string, suffix: string = ''): Promise<string> {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const sanitizedTitle = title.replace(/\s+/g, "_");
    const extension = path.extname(file.name);
    const filename = `${sanitizedTitle}_${Date.now()}${extension}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', suffix);
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    
    const filePath = path.join(uploadDir, filename);
    //console.log(filePath);

     await writeFile(filePath, buffer);
     //console.log('filePath: ',path.join('uploads',suffix,filename));
     
    return `/uploads${suffix}/${filename}`;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('File upload failed');
  }
}
