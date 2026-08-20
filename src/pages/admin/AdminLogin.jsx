import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Lock, Mail, ShieldAlert } from 'lucide-react'
import { toast } from 'sonner'

export const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await login(email, password)
    
    if (error) {
      toast.error(error.message || 'Login failed')
      setLoading(false)
    } else {
      toast.success('Logged in successfully')
      navigate('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-lg p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Portal</h1>
          <p className="text-muted-foreground text-sm mt-2">Sign in to manage your website</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground font-display flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" /> Email Address
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-border rounded p-3 text-foreground focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
              placeholder="admin@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground font-display flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" /> Password
            </label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border rounded p-3 text-foreground focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-display font-bold px-4 py-3 rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 flex items-start gap-3 p-4 bg-secondary/10 text-secondary rounded border border-secondary/20 text-sm">
          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
          <p>
            If Supabase is not configured, any email/password will work in <strong>Demo Mode</strong>.
          </p>
        </div>
      </div>
    </div>
  )
}
