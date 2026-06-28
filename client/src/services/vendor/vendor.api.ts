import { apiClient } from '@/lib/api/client'
import type { IApiSuccessResponse, IVendor } from '@eventhub/shared'

export interface VendorsResponse {
  vendors: IVendor[]
  pagination: { page: number; limit: number; total: number; pages: number }
}

export const vendorApi = {
  getVendors: async (filters?: { category?: string; city?: string; search?: string; page?: number; limit?: number }) => {
    const res = await apiClient.get<IApiSuccessResponse<VendorsResponse>>('/vendors', { params: filters })
    return res.data.data
  },

  getVendorProfile: async (vendorId: string) => {
    const res = await apiClient.get<IApiSuccessResponse<IVendor>>(`/vendors/profile/${vendorId}`)
    return res.data.data
  },

  searchVendors: async (q: string, category?: string) => {
    const res = await apiClient.get<IApiSuccessResponse<IVendor[]>>('/vendors/search', { params: { q, category } })
    return res.data.data
  },
}
