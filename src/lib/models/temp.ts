import mongoose, { Schema, Document } from 'mongoose';

export interface ITemp {
  image: string;
}

const TempSchema: Schema = new Schema({
  image:             { type: String},
},
{
  timestamps: true //createdAt, updatedAt
});

const Temp =  mongoose.models.Temp || mongoose.model<ITemp>('Temp', TempSchema);

export default Temp;

//make an initialzer for temp interface
export const initializeTemp = (data: Partial<ITemp>): ITemp => {
  return {
    image: data.image || ''
  };
};