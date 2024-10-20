import mongoose, { Schema, Document } from 'mongoose';

export interface IGenre extends Document {
  id: number;
  name: string;
}

const GenreSchema: Schema<IGenre> = new Schema<IGenre>({
  name: {
    type: String,
    required: true,
    unique: true
  },
});

const Genre = mongoose.models.Genre || mongoose.model<IGenre>('Genre', GenreSchema);
export default Genre;

export const initializeGenre = (data:Partial<IGenre>):IGenre => {
  return new Genre({
    id: data.id || 0,
    name: data.name || '',
  });
}