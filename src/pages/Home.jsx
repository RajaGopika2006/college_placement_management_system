import React from 'react'
import Card from '../components/Card'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-16">
      
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-indigo-700">
            College Placement Management System
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-6">
            Simplify placements: manage job postings, applications, interviews, and reports — all in one place.
          </p>
          <div className="space-x-4 flex flex-wrap">
            <a
              href="/jobs"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition"
            >
              View Jobs
            </a>
            <a
              href="/login"
              className="inline-block px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transform hover:scale-105 transition"
            >
              Login
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-gradient-to-tr from-indigo-100 to-indigo-200 hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-2xl font-bold mb-4 text-indigo-800">Quick Actions</h3>
            <ul className="text-gray-700 space-y-3 text-sm">
              <li>• <strong>Students:</strong> Update profile, apply for jobs, track applications</li>
              <li>• <strong>Employers:</strong> Post jobs, shortlist candidates, schedule interviews</li>
              <li>• <strong>Admins:</strong> Manage records, generate reports, verify users</li>
            </ul>
          </Card>
        </motion.div>
      </div>

      {/* Portals Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="bg-gradient-to-br from-purple-100 to-purple-200 hover:shadow-xl transition transform hover:scale-105 p-6">
          <h4 className="font-bold text-xl mb-2 text-purple-700">Student Portal</h4>
          <p className="text-gray-700 text-sm">Register, apply for jobs, track your applications, and receive placement updates.</p>
        </Card>
        <Card className="bg-gradient-to-br from-green-100 to-green-200 hover:shadow-xl transition transform hover:scale-105 p-6">
          <h4 className="font-bold text-xl mb-2 text-green-700">Employer Portal</h4>
          <p className="text-gray-700 text-sm">Post job openings, shortlist candidates, schedule interviews, and manage applications.</p>
        </Card>
        <Card className="bg-gradient-to-br from-indigo-100 to-indigo-200 hover:shadow-xl transition transform hover:scale-105 p-6">
          <h4 className="font-bold text-xl mb-2 text-indigo-700">Admin Dashboard</h4>
          <p className="text-gray-700 text-sm">Manage students, employers, placements, and generate detailed reports.</p>
        </Card>
      </motion.div>

      {/* Info Section */}
      <motion.div
        className="bg-indigo-50 rounded-xl p-8 shadow-lg text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-indigo-700">Why Use This Platform?</h3>
        <p className="text-gray-700 text-sm md:text-base max-w-2xl mx-auto">
          Centralize your placement management workflow, reduce paperwork, and improve communication between students, employers, and administrators. Our platform ensures a smooth, transparent, and efficient placement process.
        </p>
      </motion.div>
    </div>
  )
}
