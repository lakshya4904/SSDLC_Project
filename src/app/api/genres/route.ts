import { connectDB } from '@/lib/db';
import Genre, { initializeGenre } from '@/lib/models/genre'; // Make sure your Genre model is correctly referenced
import { NextResponse } from 'next/server';

// Call this in every API route file

export async function GET(req: any) {
  try {
    const { searchParams } = new URL(req.url);
    
    const query: any = {};

    

    const id = searchParams.get('id'); 
    const name = searchParams.get('name'); 
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');
    // Parse the JSON body to get the genre instance from the request
    // const genreData = await req.json();


    // If an ID is provided, find the book by ID
    if (id) {
      const genre = await Genre.findById(id)
        .exec();

      if (!genre) {
        return NextResponse.json({
          success: false,
          message: "Genre not found",
        }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        data: genre,
      });
    }

    if(name) query.name = name;

    //check if query is empty or not
    if(Object.keys(query).length === 0) {
      console.log("query empty");
    }


    console.log(query);
    

    // Connect to the database
    if (await connectDB()) {
      try {
        // Find the genre based on the data passed (e.g., genrename or email)
        const genre = await Genre.find(Object.keys(query).length > 0 ? query : {})
        .sort(sort && order ? { [sort]: order === 'asc' ? 1 : -1 } : {}) // Sort by 
        .exec();

        // If the genre is not found, return an appropriate message
        if (genre.length === 0) {
          return NextResponse.json({ error: 'Genre not found', success: false });
        }

        // Return the found genre as a response
        return NextResponse.json({ result: genre, success: true });
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

const capitalizeGenres = (str: string) => {
  return str
    .split(/([-\s])/g) // Split on spaces and hyphens, but keep the delimiter (hyphen or space) in the array
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(''); // Rejoin the string without altering hyphens or spaces
};

export async function POST(req:any, res:any) {
  if (await connectDB()) {
    try {
      const data = await req.json();
      data.name = capitalizeGenres(data.name);
      const newGenre = new Genre(data);
      await newGenre.save();
      return NextResponse.json({ result: newGenre, success: true });
    } catch (error) {
      return NextResponse.json({ result: error, success: false });
    }
  } else {
    return NextResponse.json({ message: 'Method Not Allowed', success: false });
  }
}

