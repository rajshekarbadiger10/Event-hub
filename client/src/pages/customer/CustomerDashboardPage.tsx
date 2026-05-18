import { Card } from '@/components/ui/card'
import { useAuthStore } from '@/store/slices/authStore'

export function CustomerDashboardPage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Customer Dashboard</h1>
        <p className="text-slate-600">Manage your bookings and event plans.</p>
      </div>
      <Card title={`Hello, ${user?.name}`} description="Your customer workspace is ready.">
        <ul className="list-inside list-disc text-sm text-slate-600">
          <li>Browse vendor listings (coming soon)</li>
          <li>Create and track bookings (coming soon)</li>
          <li>Leave reviews (coming soon)</li>
        </ul>
      </Card>
    </div>
  )
}
