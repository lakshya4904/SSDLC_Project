import mongoose, { Schema, Document } from 'mongoose';

const ReviewSchema: Schema = new Schema({
  userId:           { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookId:           { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  rating:           { type: Number, required: true, min: 1, max: 5 },
  reviewText:       { type: String, required: true },
  createdAt:        { type: Date, default: Date.now }
});

const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

export default Review;
