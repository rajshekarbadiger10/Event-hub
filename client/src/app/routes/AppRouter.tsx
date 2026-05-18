import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { USER_ROLES } from '@eventhub/shared'
import { MainLayout } from '@/components/layout/MainLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { ProtectedRoute } from '@/components/common/ProtectedRoute'
import { RoleGuard } from '@/components/common/RoleGuard'
import { GuestOnlyRoute } from './GuestOnlyRoute'
import { HomePage } from '@/pages/public/HomePage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { CustomerDashboardPage } from '@/pages/customer/CustomerDashboardPage'
import { VendorDashboardPage } from '@/pages/vendor/VendorDashboardPage'
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage'
import { NotFoundPage } from '@/pages/errors/NotFoundPage'
import { UnauthorizedPage } from '@/pages/errors/UnauthorizedPage'
import { DashboardRedirectPage } from '@/pages/errors/DashboardRedirectPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route element={<GuestOnlyRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardRedirectPage />} />
          <Route element={<DashboardLayout />}>
            <Route element={<RoleGuard allowedRoles={[USER_ROLES.CUSTOMER]} />}>
              <Route path="customer/dashboard" element={<CustomerDashboardPage />} />
            </Route>
            <Route element={<RoleGuard allowedRoles={[USER_ROLES.VENDOR]} />}>
              <Route path="vendor/dashboard" element={<VendorDashboardPage />} />
            </Route>
            <Route element={<RoleGuard allowedRoles={[USER_ROLES.ADMIN]} />}>
              <Route path="admin/dashboard" element={<AdminDashboardPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="unauthorized" element={<UnauthorizedPage />} />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
