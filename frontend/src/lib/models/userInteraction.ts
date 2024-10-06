import mongoose, { Schema, Document } from 'mongoose';

const userInteractionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  interactionType: {
    type: String,
    enum: ['wishlist', 'bookmark', 'favorite'], // Define different interaction types
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

const UserInteraction = mongoose.models.UserInteraction || mongoose.model('UserInteraction', userInteractionSchema);

export { UserInteraction };
