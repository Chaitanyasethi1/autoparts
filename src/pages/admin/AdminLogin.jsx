import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Lock, User, ShieldCheck, ArrowLeft, KeyRound } from 'lucide-react'
import { toast } from 'sonner'

export const AdminLogin = () => {
  const [identifier, setIdentifier] = useState('officialrohitaggarwal1@gmail.com')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await login(identifier, password)
    
    if (error) {
      toast.error(error.message || 'Login failed')
      setLoading(false)
    } else {
      toast.success('Logged in successfully! Welcome Admin.')
      navigate('/admin/dashboard')
    }
  }

  const fillCredentials = (email) => {
    setIdentifier(email)
    setPassword('AuToPaRtS@PrImEtEcH')
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-radial from-red-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10">
        
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Website
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-600/10 border border-red-600/30 mb-4 text-red-500 shadow-lg shadow-red-950/50">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white tracking-wide">Admin Portal</h1>
          <p className="text-zinc-400 text-sm mt-1">Sign in to manage appointments & customer leads</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-200 font-display flex items-center gap-2">
              <User className="w-4 h-4 text-primary" /> Admin Email / ID
            </label>
            <input 
              type="text" 
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full bg-zinc-950 border border-white/10 rounded-lg p-3.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none font-body"
              placeholder="officialrohitaggarwal1@gmail.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-200 font-display flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-primary" /> Password
            </label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-white/10 rounded-lg p-3.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none font-body"
              placeholder="AuToPaRtS@PrImEtEcH"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold px-4 py-3.5 rounded-lg transition-all disabled:opacity-50 text-base uppercase tracking-wider glow-red shadow-xl"
          >
            {loading ? 'Authenticating...' : 'Sign In as Admin'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-zinc-950/80 rounded-xl border border-white/5 text-xs text-zinc-400 space-y-2">
          <div className="flex items-center justify-between font-bold text-zinc-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Admin Access Info:</span>
            </div>
            <span className="text-[10px] text-zinc-500 uppercase">Click to auto-fill</span>
          </div>

          <div className="flex flex-col gap-1.5 font-mono text-[11px]">
            <button
              type="button"
              onClick={() => fillCredentials('officialrohitaggarwal1@gmail.com')}
              className="text-left bg-zinc-900 hover:bg-zinc-800 p-2 rounded border border-white/5 transition-colors text-zinc-300 flex justify-between"
            >
              <span>Email: <strong className="text-white">officialrohitaggarwal1@gmail.com</strong></span>
            </button>
            <button
              type="button"
              onClick={() => fillCredentials('info@primetechauto.ca')}
              className="text-left bg-zinc-900 hover:bg-zinc-800 p-2 rounded border border-white/5 transition-colors text-zinc-300 flex justify-between"
            >
              <span>Email: <strong className="text-white">info@primetechauto.ca</strong></span>
            </button>
            <div className="bg-zinc-900/60 p-2 rounded border border-white/5 text-zinc-300 flex justify-between">
              <span>Password: <strong className="text-emerald-400">AuToPaRtS@PrImEtEcH</strong></span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
