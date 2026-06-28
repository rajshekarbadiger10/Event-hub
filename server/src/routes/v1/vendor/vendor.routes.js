import { Router } from 'express'
import * as vc from '../../../controllers/vendor/vendor.controller.js'

const router = Router()

router.get('/', vc.getVendors)
router.get('/search', vc.searchVendors)
router.get('/category/:category', vc.getVendorsByCategory)
router.get('/profile/:vendorId', vc.getVendorProfile)

export default router
