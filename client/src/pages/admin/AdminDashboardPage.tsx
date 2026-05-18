import { Card } from '@/components/ui/card'
import { useAuthStore } from '@/store/slices/authStore'

export function AdminDashboardPage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-600">Platform oversight and management.</p>
      </div>
      <Card title={`Admin: ${user?.name}`} description="Your admin workspace is ready.">
        <ul className="list-inside list-disc text-sm text-slate-600">
          <li>User management (coming soon)</li>
          <li>Vendor approvals (coming soon)</li>
          <li>Platform analytics (coming soon)</li>
        </ul>
      </Card>
    </div>
  )
}
