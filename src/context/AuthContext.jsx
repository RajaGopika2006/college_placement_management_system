import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // { role: 'student'|'employer'|'admin', name, id }
  const login = (role, name='User') => {
    // mock login
    const u = { role, name, id: Math.floor(Math.random()*10000) }
    setUser(u)
    return u
  }
  const logout = () => setUser(null)
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth(){ return useContext(AuthContext) }
