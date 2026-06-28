import { asyncHandler } from '../../utils/asyncHandler.js'
import { sendSuccess, sendError } from '../../utils/apiResponse.js'
import { vendorService } from '../../services/vendor/vendor.service.js'

export const getVendors = asyncHandler(async (req, res) => {
  const { category, city, search, page = 1, limit = 12 } = req.query
  const result = await vendorService.getAllVendors({ category, city, search, page: +page, limit: +limit })
  sendSuccess(res, { message: 'Vendors retrieved', data: result })
})

export const getVendorsByCategory = asyncHandler(async (req, res) => {
  const vendors = await vendorService.getVendorsByCategory(req.params.category)
  sendSuccess(res, { message: 'Vendors by category', data: vendors })
})

export const getVendorProfile = asyncHandler(async (req, res) => {
  const vendor = await vendorService.getVendorProfile(req.params.vendorId)
  sendSuccess(res, { message: 'Vendor profile', data: vendor })
})

export const searchVendors = asyncHandler(async (req, res) => {
  const { q, category } = req.query
  if (!q || q.trim().length === 0) return sendError(res, { statusCode: 400, message: 'Search term required' })
  const vendors = await vendorService.searchVendors(q, category)
  sendSuccess(res, { message: 'Search results', data: vendors })
})
