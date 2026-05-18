import { Card } from '@/components/ui/card'
import { useAuthStore } from '@/store/slices/authStore'

export function VendorDashboardPage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Vendor Dashboard</h1>
        <p className="text-slate-600">Manage your services and incoming bookings.</p>
      </div>
      <Card title={`Welcome, ${user?.name}`} description="Your vendor workspace is ready.">
        <ul className="list-inside list-disc text-sm text-slate-600">
          <li>Create vendor profile & listings (coming soon)</li>
          <li>Manage booking requests (coming soon)</li>
          <li>View analytics (coming soon)</li>
        </ul>
      </Card>
    </div>
  )
}
