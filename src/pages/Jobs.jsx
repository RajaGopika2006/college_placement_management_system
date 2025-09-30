import React, { useState } from 'react'
import { jobs } from '../mock/jobs'
import Card from '../components/Card'
import { openApply } from '../components/ApplyModal'
import { motion } from 'framer-motion'

export default function Jobs() {
  const [selectedJob, setSelectedJob] = useState(null)

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-700">Available Jobs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, idx) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="hover:shadow-xl transform hover:-translate-y-1 transition-all p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.company}</p>
                </div>
                <div className="text-sm font-bold text-indigo-600">{job.package}</div>
              </div>

              <p className="text-sm text-gray-600 mt-3 line-clamp-3">{job.desc}</p>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-gray-400 font-medium">
                  Eligibility: <span className="text-gray-600">{job.eligibility}</span>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => openApply(job)}
                    className="px-4 py-1 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="px-4 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition"
                  >
                    Details
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-indigo-700 mb-2">{selectedJob.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{selectedJob.company}</p>
            <p className="text-sm text-gray-600 mb-2">{selectedJob.desc}</p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Package:</span> {selectedJob.package}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Eligibility:</span> {selectedJob.eligibility}
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => openApply(selectedJob)}
                className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
