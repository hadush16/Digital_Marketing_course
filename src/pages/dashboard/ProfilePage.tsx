import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useAppDispatch } from '@/hooks/useRedux'
import { updateUser } from '@/redux/slices/authSlice'
import { adminService } from '@/services/admin.service'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user } = useAuth()
  const dispatch = useAppDispatch()
  const [name, setName] = useState(user?.name || '')
  const [email] = useState(user?.email || '')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)
    try {
      const res = await adminService.updateProfile(user.id, { name })
      dispatch(updateUser({ name: res.data.data.name }))
      toast.success('Profile updated successfully!')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-light-text dark:text-dark-text">Edit Profile</h1>
        <p className="text-sm text-light-muted dark:text-dark-muted mt-1">
          Keep your contact information up to date.
        </p>
      </div>

      <div className="glass-card rounded-2xl border border-light-border dark:border-dark-border p-6 shadow-sm">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-2 uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-2 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              required
              disabled
              value={email}
              className="input bg-light-bg dark:bg-dark-bg cursor-not-allowed opacity-75"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-2 uppercase tracking-wider">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+251 9..."
              className="input"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary btn-md w-full disabled:opacity-50">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}
