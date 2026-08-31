import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions
    const checkSession = async () => {
      try {
        const storedAdmin = localStorage.getItem('primetech_admin_session')
        if (storedAdmin) {
          setUser(JSON.parse(storedAdmin))
          setLoading(false)
          return
        }

        if (supabase && typeof supabase.auth?.getSession === 'function') {
          const { data: { session } } = await supabase.auth.getSession()
          if (session?.user) {
            setUser(session.user)
          }
        }
      } catch (e) {
        console.warn('Session check fallback active')
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  const login = async (identifier, password) => {
    const cleanId = String(identifier || '').trim().toLowerCase()
    const cleanPass = String(password || '').trim()

    // Fixed Admin Credentials Check
    if (
      (cleanId === 'admin' || cleanId === 'admin@primetechauto.ca' || cleanId === 'admin@gmail.com') &&
      cleanPass === 'admin@123'
    ) {
      const adminUser = {
        id: 'admin_primary',
        email: 'admin@primetechauto.ca',
        username: 'admin',
        role: 'super_admin'
      }
      localStorage.setItem('primetech_admin_session', JSON.stringify(adminUser))
      setUser(adminUser)
      return { data: adminUser, error: null }
    }

    // Try Supabase auth if configured
    try {
      if (supabase && typeof supabase.auth?.signInWithPassword === 'function') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanId,
          password: cleanPass,
        })
        if (error) throw error
        if (data?.user) {
          setUser(data.user)
          return { data, error: null }
        }
      }
    } catch (error) {
      console.warn('Supabase auth attempt failed:', error.message)
    }

    return {
      data: null,
      error: { message: 'Invalid Admin ID or Password. (Use ID: admin, Pass: admin@123)' }
    }
  }

  const logout = async () => {
    try {
      if (supabase && typeof supabase.auth?.signOut === 'function') {
        await supabase.auth.signOut()
      }
    } catch (e) {
      // Ignore
    } finally {
      localStorage.removeItem('primetech_admin_session')
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
