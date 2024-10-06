import { connectDB } from '@/lib/db';
import User from '@/lib/models/user'; // Make sure your User model is correctly referenced
import { NextResponse } from 'next/server';


// Put API
export async function PUT(req, res) {
  if (await connectDB()) {
    try {
      const identifier = res.params.identifier;
      // const filter = {_id:identifier};
      const payload = await req.json();

      const result = await User.findByIdAndUpdate(identifier,payload,{new : true});

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
      const identifier = res.params.identifier;
      const result = await User.findByIdAndDelete(identifier);
      return NextResponse.json({ result: result, success: true });

    } catch (error) {
      return NextResponse.json({ message: 'Internal Server Error', success: false });
    }
  } else {
    return NextResponse.json({ message: 'Database connection failed', success: false });
  }
}



export async function GET(req, res) {
  try {
    
    const identifier = res.params.identifier;
    console.log(identifier);
    
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found', success: false });
    }

    return NextResponse.json({ result: user, success: true });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: 'Internal Server Error', success: false });
  }
}




