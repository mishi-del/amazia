import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 120,
    },
    passwordHash: { type: String, default: null },
    googleId: { type: String, default: null, sparse: true, unique: true },
    avatar: { type: String, default: null },
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String, default: null },
    emailVerificationExpires: { type: Date, default: null },
    newsletterSubscribed: { type: Boolean, default: false },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true }
)

userSchema.methods.toSafeObject = function () {
  return {
    id: this._id.toString(),
    name: this.name,
    email: this.email,
    avatar: this.avatar,
    emailVerified: Boolean(this.googleId || this.emailVerified),
    newsletterSubscribed: this.newsletterSubscribed,
    authProvider: this.googleId ? 'google' : 'email',
    createdAt: this.createdAt,
  }
}

export const User = mongoose.model('User', userSchema)
