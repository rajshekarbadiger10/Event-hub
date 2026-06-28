import mongoose from 'mongoose'

const vendorProfileSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true, enum: ['Catering', 'Photography', 'Venue', 'Decoration', 'Entertainment', 'Other'] },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
  phone: { type: String },
  website: { type: String },
  coverImage: { type: String },
  gallery: [{ type: String }],
})

const vendorSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    profile: { type: vendorProfileSchema, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    totalEarnings: { type: Number, default: 0 },
    completedBookings: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

vendorSchema.index({ userId: 1 })
vendorSchema.index({ 'profile.category': 1 })
vendorSchema.index({ isApproved: 1, isActive: 1 })

export const Vendor = mongoose.model('Vendor', vendorSchema)
