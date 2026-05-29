import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    name: { type: String, required: true, trim: true, maxlength: 80 },
    city: { type: String, required: true, trim: true, maxlength: 60 },
    skinType: { type: String, required: true, trim: true },
    daysOfUse: { type: String, default: 'Not specified' },
    rating: { type: String, required: true },
    review: { type: String, required: true, maxlength: 600 },
    email: { type: String, default: 'Not provided', trim: true, lowercase: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
)

export const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema)
