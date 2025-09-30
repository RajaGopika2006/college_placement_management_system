import React from 'react'

export default function Reports(){
  return (
    <div className="bg-white p-4 rounded shadow">
      <h4 className="font-semibold mb-3">Reports</h4>
      <div className="text-sm text-gray-600">Sample placement analytics and downloadable CSVs.</div>
      <div className="mt-3">
        <button className="px-3 py-1 bg-indigo-600 text-white rounded">Download CSV</button>
      </div>
    </div>
  )
}
