import { useState, type FormEvent } from 'react'
import type { AxiosError } from 'axios'
import { useAuthStore } from '@/store/slices/authStore'
import { authService } from '@/services/auth/auth.service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function CustomerProfilePage() {
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)

  const [name, setName] = useState(user?.name ?? '')
  const [phone, setPhone] = useState(user?.phone ?? '')
  const [profileMsg, setProfileMsg] = useState('')
  const [profileError, setProfileError] = useState('')
  const [profileLoading, setProfileLoading] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMsg, setPasswordMsg] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)

  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault()
    setProfileMsg('')
    setProfileError('')
    setProfileLoading(true)
    try {
      const updated = await authService.updateProfile({ name, phone: phone || undefined })
      setUser(updated)
      setProfileMsg('Profile updated successfully')
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>
      setProfileError(axiosErr.response?.data?.message ?? 'Failed to update profile')
    } finally {
      setProfileLoading(false)
    }
  }

  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault()
    setPasswordMsg('')
    setPasswordError('')
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match')
      return
    }
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters')
      return
    }
    setPasswordLoading(true)
    try {
      await authService.changePassword({ currentPassword, newPassword })
      setPasswordMsg('Password changed successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>
      setPasswordError(axiosErr.response?.data?.message ?? 'Failed to change password')
    } finally {
      setPasswordLoading(false)
    }
  }

  const initials = user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || '??'

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your account settings and preferences</p>
      </div>

      {/* Profile card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-xl font-bold text-white shadow-md">
            {initials}
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900">{user?.name}</p>
            <p className="text-sm text-slate-500">{user?.email}</p>
            <span className="mt-1 inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 capitalize">
              {user?.role}
            </span>
          </div>
        </div>

        <form onSubmit={handleProfileUpdate} className="mt-6 space-y-4">
          <h2 className="text-base font-semibold text-slate-900">Personal Information</h2>
          {profileMsg && <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{profileMsg}</p>}
          {profileError && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{profileError}</p>}
          <Input label="Full Name" required value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" type="email" value={user?.email ?? ''} disabled />
          <Input label="Phone" type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Button type="submit" isLoading={profileLoading}>Save Changes</Button>
        </form>
      </div>

      {/* Password card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <h2 className="text-base font-semibold text-slate-900">Change Password</h2>
          {passwordMsg && <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{passwordMsg}</p>}
          {passwordError && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{passwordError}</p>}
          <Input
            label="Current Password"
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Input
            label="New Password"
            type="password"
            required
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            label="Confirm New Password"
            type="password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" variant="secondary" isLoading={passwordLoading}>Update Password</Button>
        </form>
      </div>
    </div>
  )
}
