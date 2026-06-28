import { Vendor } from '../../models/Vendor.js'
import { AppError } from '../../utils/AppError.js'

export const vendorService = {
  async getAllVendors(filters = {}) {
    const query = { isApproved: true, isActive: true }
    if (filters.category) query['profile.category'] = filters.category
    if (filters.city) query['profile.city'] = new RegExp(filters.city, 'i')
    if (filters.search) query['profile.businessName'] = new RegExp(filters.search, 'i')

    const page = filters.page || 1
    const limit = filters.limit || 12
    const skip = (page - 1) * limit

    const [vendors, total] = await Promise.all([
      Vendor.find(query).populate('userId', 'name email').skip(skip).limit(limit).sort({ rating: -1 }),
      Vendor.countDocuments(query),
    ])

    return { vendors, pagination: { page, limit, total, pages: Math.ceil(total / limit) } }
  },

  async getVendorProfile(vendorId) {
    const vendor = await Vendor.findById(vendorId).populate('userId', 'name email phone')
    if (!vendor) throw new AppError('Vendor not found', 404)
    return vendor
  },

  async getVendorsByCategory(category) {
    return Vendor.find({ 'profile.category': category, isApproved: true, isActive: true })
      .populate('userId', 'name email')
      .sort({ rating: -1 })
  },

  async searchVendors(query, category) {
    const filter = {
      isApproved: true,
      isActive: true,
      'profile.businessName': new RegExp(query, 'i'),
    }
    if (category) filter['profile.category'] = category
    return Vendor.find(filter).populate('userId', 'name email').sort({ rating: -1 }).limit(20)
  },
}
