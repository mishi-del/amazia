import mongoose from 'mongoose'

const newsletterSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    source: { type: String, enum: ['popup', 'footer_section'], default: 'footer_section' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
)

newsletterSchema.index({ email: 1 }, { unique: true })

export const Newsletter =
  mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema)
