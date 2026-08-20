import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions and sets the user
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (e) {
        // Fallback for when Supabase is not configured yet
        console.warn('Supabase auth not configured. Demo mode active.')
        const demoUser = localStorage.getItem('demo_admin')
        if (demoUser) setUser(JSON.parse(demoUser))
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Listen for changes on auth state (log in, log out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      if (error.message.includes('fetch') || error.message.includes('URL')) {
        // Demo mode fallback
        const demoUser = { id: 'demo-123', email, role: 'admin' }
        localStorage.setItem('demo_admin', JSON.stringify(demoUser))
        setUser(demoUser)
        return { data: demoUser, error: null }
      }
      return { data: null, error }
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (e) {
      // Ignore
    } finally {
      localStorage.removeItem('demo_admin')
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
