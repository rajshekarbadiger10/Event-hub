/**
 * Seed sample approved vendors for development.
 * Usage: node scripts/seedVendors.js
 */
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { User } from '../src/models/User.js'
import { Vendor } from '../src/models/Vendor.js'
import { USER_ROLES } from '../src/constants/roles.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const SAMPLE_VENDORS = [
  {
    user: { name: 'Rajesh Kumar', email: 'rajesh@eventhub.local', password: 'Vendor@12345' },
    profile: {
      businessName: 'Spice Garden Catering',
      description: 'Premium Indian and continental catering for weddings, corporate events, and parties. 15+ years of experience.',
      category: 'Catering',
      city: 'Mumbai',
      state: 'Maharashtra',
      address: '123 Food Street, Andheri West',
      pincode: '400058',
    },
    rating: 4.8,
    reviewCount: 124,
  },
  {
    user: { name: 'Priya Sharma', email: 'priya@eventhub.local', password: 'Vendor@12345' },
    profile: {
      businessName: 'Moments Photography Studio',
      description: 'Award-winning wedding and event photography. Candid shots, cinematic videos, and drone coverage.',
      category: 'Photography',
      city: 'Delhi',
      state: 'Delhi',
      address: '45 Lens Lane, Connaught Place',
      pincode: '110001',
    },
    rating: 4.9,
    reviewCount: 89,
  },
  {
    user: { name: 'Amit Patel', email: 'amit@eventhub.local', password: 'Vendor@12345' },
    profile: {
      businessName: 'Grand Palace Banquet',
      description: 'Luxury banquet hall with capacity for 500+ guests. Full-service venue with in-house catering options.',
      category: 'Venue',
      city: 'Bangalore',
      state: 'Karnataka',
      address: '789 Palace Road, Whitefield',
      pincode: '560066',
    },
    rating: 4.6,
    reviewCount: 56,
  },
  {
    user: { name: 'Sneha Reddy', email: 'sneha@eventhub.local', password: 'Vendor@12345' },
    profile: {
      businessName: 'Bloom & Bliss Decorators',
      description: 'Creative floral arrangements and theme-based event decoration for all occasions.',
      category: 'Decoration',
      city: 'Hyderabad',
      state: 'Telangana',
      address: '12 Flower Market, Banjara Hills',
      pincode: '500034',
    },
    rating: 4.7,
    reviewCount: 72,
  },
  {
    user: { name: 'Vikram Singh', email: 'vikram@eventhub.local', password: 'Vendor@12345' },
    profile: {
      businessName: 'BeatBox Entertainment',
      description: 'Live bands, DJs, and performers for weddings, corporate galas, and private parties.',
      category: 'Entertainment',
      city: 'Pune',
      state: 'Maharashtra',
      address: '56 Music Avenue, Koregaon Park',
      pincode: '411001',
    },
    rating: 4.5,
    reviewCount: 43,
  },
]

const run = async () => {
  const uri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/eventhub'
  await mongoose.connect(uri)

  let created = 0
  for (const sample of SAMPLE_VENDORS) {
    const existing = await User.findOne({ email: sample.user.email })
    if (existing) {
      const vendorExists = await Vendor.findOne({ userId: existing._id })
      if (vendorExists) {
        console.log('Already exists:', sample.profile.businessName)
        continue
      }
      await Vendor.create({
        userId: existing._id,
        profile: sample.profile,
        rating: sample.rating,
        reviewCount: sample.reviewCount,
        isApproved: true,
        isVerified: true,
      })
      created++
      continue
    }

    const user = await User.create({
      ...sample.user,
      role: USER_ROLES.VENDOR,
    })
    await Vendor.create({
      userId: user._id,
      profile: sample.profile,
      rating: sample.rating,
      reviewCount: sample.reviewCount,
      isApproved: true,
      isVerified: true,
    })
    created++
  }

  console.log(`Seeded ${created} vendor(s)`)
  await mongoose.disconnect()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
