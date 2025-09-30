import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ProtectedRoute from '../components/ProtectedRoute'
import StudentDashboard from './dashboard/StudentDashboard'
import EmployerDashboard from './dashboard/EmployerDashboard'
import AdminDashboard from './dashboard/AdminDashboard'

export default function Dashboard(){
  const { user } = useAuth()
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-sm text-gray-600">Welcome {user?.name || 'Guest'}</p>
      </div>
      <div className="flex space-x-4 mb-6">
        <Link to="student" className="px-3 py-1 border rounded">Student</Link>
        <Link to="employer" className="px-3 py-1 border rounded">Employer</Link>
        <Link to="admin" className="px-3 py-1 border rounded">Admin</Link>
      </div>
      <Routes>
        <Route path="student" element={<ProtectedRoute role="student"><StudentDashboard/></ProtectedRoute>} />
        <Route path="employer" element={<ProtectedRoute role="employer"><EmployerDashboard/></ProtectedRoute>} />
        <Route path="admin" element={<ProtectedRoute role="admin"><AdminDashboard/></ProtectedRoute>} />
        <Route index element={<div className="p-6 bg-white rounded shadow">Select role-specific dashboard.</div>} />
      </Routes>
    </div>
  )
}
