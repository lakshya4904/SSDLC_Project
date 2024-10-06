import { connectDB } from '@/lib/db';
import User from '@/lib/models/user'; // Make sure your User model is correctly referenced
import { NextResponse } from 'next/server';

// Call this in every API route file

export async function GET(req,res) {
  if (await connectDB()) {
    try {
      const users = await User.find();
      return NextResponse.json({result: users, success: true});
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
      const data = await req.json();
      const newUser = new User(data);
      await newUser.save();
      return NextResponse.json({ result: newUser, success: true });
    } catch (error) {
      return NextResponse.json({ result: error, success: false });
    }
  } else {
    return NextResponse.json({ message: 'Method Not Allowed', success: false });
  }
}

