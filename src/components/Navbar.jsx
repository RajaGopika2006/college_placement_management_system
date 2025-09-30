import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar(){
  const { user, logout } = useAuth()
  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold px-3 py-2 rounded">CPMS</div>
          <div className="text-sm text-gray-600">College Placement Management</div>
        </div>
        <div className="flex items-center space-x-4">
          <NavLink to="/" className={({isActive})=> isActive? 'text-indigo-600 font-medium':'text-gray-600'}>Home</NavLink>
          <NavLink to="/jobs" className={({isActive})=> isActive? 'text-indigo-600 font-medium':'text-gray-600'}>Jobs</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" className={({isActive})=> isActive? 'text-indigo-600 font-medium':'text-gray-600'}>Dashboard</NavLink>
              <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
            </>
          ) : (
            <NavLink to="/login" className={({isActive})=> isActive? 'text-indigo-600 font-medium':'text-gray-600'}>Login</NavLink>
          )}
        </div>
      </div>
    </nav>
  )
}
