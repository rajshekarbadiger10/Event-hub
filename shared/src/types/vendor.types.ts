export interface IVendorProfile {
  businessName: string
  description?: string
  category: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  coverImage?: string
  gallery?: string[]
  rating: number
  reviewCount: number
  isVerified: boolean
  isApproved: boolean
}

export interface IVendor {
  _id: string
  userId: string
  profile: IVendorProfile
  createdAt: string
  updatedAt: string
}
