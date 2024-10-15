import { connectDB } from '@/lib/db';
import User, { initializeUser } from '@/lib/models/user'; // Make sure your User model is correctly referenced
import { NextResponse } from 'next/server';

// Call this in every API route file

export async function GET(req: any) {
  try {
    const { searchParams } = new URL(req.url);
    
    const query: any = {};

    

    const id = searchParams.get('id'); 
    const type = searchParams.get('type'); 
    const email = searchParams.get('email'); 
    const username = searchParams.get('username');   
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');
    // Parse the JSON body to get the user instance from the request
    // const userData = await req.json();


    // If an ID is provided, find the book by ID
    if (id) {
      const user = await User.findById(id)
        .exec();

      if (!user) {
        return NextResponse.json({
          success: false,
          message: "User not found",
        }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        data: user,
      });
    }

    if(type) query.type = type;
    if(email) query.email = email;
    if(username) query.username = username;

    //check if query is empty or not
    if(Object.keys(query).length === 0) {
      console.log("query empty");
    }


    console.log(query);
    

    // Connect to the database
    if (await connectDB()) {
      try {
        // Find the user based on the data passed (e.g., username or email)
        const user = await User.find(Object.keys(query).length > 0 ? query : {})
        .sort(sort && order ? { [sort]: order === 'asc' ? 1 : -1 } : {}) // Sort by rating
        .exec();

        // If the user is not found, return an appropriate message
        if (!user) {
          return NextResponse.json({ error: 'User not found', success: false });
        }

        // Return the found user as a response
        return NextResponse.json({ result: user, success: true });
      } catch (error:any) {
        // Handle any potential errors that occur during the database query
        return NextResponse.json({ result: error.message, success: false });
      }
    } else {
      // If the database connection fails
      return NextResponse.json({ message: 'Database connection failed', success: false });
    }
  } catch (error) {
    // Catch any parsing errors (e.g., if the request body is not a valid JSON object)
    return NextResponse.json({ error: `Invalid request data: ${error}`, success: false });
  }
}


export async function POST(req:any, res:any) {
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

