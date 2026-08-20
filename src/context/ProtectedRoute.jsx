import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { Loader2 } from 'lucide-react'

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground font-display">Verifying access...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return children ? children : <Outlet />
}
