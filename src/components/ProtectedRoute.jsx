import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, role }){
  const { user } = useAuth()
  if(!user) return <Navigate to="/login" replace />
  if(role && user.role !== role && user.role !== 'admin') return <div className="p-6">Access Denied</div>
  return children
}
