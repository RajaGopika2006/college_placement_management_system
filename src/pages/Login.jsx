import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login(){
  const [role, setRole] = useState('student')
  const { login } = useAuth()
  const nav = useNavigate()
  function submit(e){
    e.preventDefault()
    login(role, role==='student'?'Student A': role==='employer'?'Employer X':'Admin User')
    nav('/dashboard')
  }
  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Login </h2>
      <form onSubmit={submit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="text-sm">Role</label>
          <select value={role} onChange={e=>setRole(e.target.value)} className="w-full border rounded px-3 py-2">
            <option value="student">Student</option>
            <option value="employer">Employer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Email</label>
          <input required className="w-full border rounded px-3 py-2" placeholder="you@example.com" />
        </div>
        <div>
          <label className="text-sm">Password</label>
          <input required type="password" className="w-full border rounded px-3 py-2" placeholder="password" />
        </div>
        <button className="w-full bg-indigo-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  )
}
