import mongoose, { Schema, Document } from 'mongoose';

export interface IGenre extends Document {
  name: string;
}

const GenreSchema: Schema<IGenre> = new Schema<IGenre>({
  name: {
    type: String,
    required: true,
  },
});

const Genre = mongoose.model<IGenre>('Genre', GenreSchema);
export default Genre;
