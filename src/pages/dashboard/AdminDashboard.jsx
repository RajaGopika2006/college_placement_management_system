import React, { useState } from "react";
import Reports from "../Reports";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [students, setStudents] = useState([
    { id: 1, name: "Arun Kumar", branch: "CSE", cgpa: 8.7, status: "Placed" },
    { id: 2, name: "Priya Subramanian", branch: "ECE", cgpa: 8.2, status: "Pending" },
    { id: 3, name: "Rajesh Venkatesh", branch: "IT", cgpa: 7.9, status: "Placed" },
    { id: 4, name: "Sandhya Nandakumar", branch: "EEE", cgpa: 8.5, status: "Interview" },
    { id: 5, name: "Karthik Balasubramaniam", branch: "MECH", cgpa: 8.1, status: "Pending" },
    { id: 6, name: "Deepa Lakshmanan", branch: "CIVIL", cgpa: 7.8, status: "Placed" },
  ]);

  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [showRemoveForm, setShowRemoveForm] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [studentIdToRemove, setStudentIdToRemove] = useState("");

  const stats = [
    { title: "Total Students", value: students.length, color: "from-blue-500 to-blue-700" },
    { title: "Companies", value: 85, color: "from-green-500 to-green-700" },
    { title: "Placements", value: students.filter(s => s.status === "Placed").length, color: "from-pink-500 to-pink-700" },
    { title: "Jobs Open", value: 52, color: "from-purple-500 to-purple-700" },
  ];

  const placementProgressData = [
    { month: "Jan", placements: 20 },
    { month: "Feb", placements: 35 },
    { month: "Mar", placements: 50 },
    { month: "Apr", placements: 70 },
    { month: "May", placements: 90 },
    { month: "Jun", placements: 120 },
    { month: "Jul", placements: 150 },
    { month: "Aug", placements: 200 },
    { month: "Sep", placements: 250 },
    { month: "Oct", placements: 300 },
    { month: "Nov", placements: 320 },
    { month: "Dec", placements: 340 },
  ];

  // Add Company Form Submit
  const handleAddCompany = (e) => {
    e.preventDefault();
    if (companyName) {
      alert(`Company "${companyName}" added successfully!`);
      setCompanyName("");
      setShowCompanyForm(false);
    }
  };

  // Remove Student Form Submit
  const handleRemoveStudent = (e) => {
    e.preventDefault();
    const id = parseInt(studentIdToRemove);
    if (!isNaN(id) && students.find(s => s.id === id)) {
      setStudents(students.filter(s => s.id !== id));
      setStudentIdToRemove("");
      setShowRemoveForm(false);
    } else {
      alert("Invalid student ID");
    }
  };

  // Download CSV
  const exportCSV = () => {
    const headers = ["ID", "Name", "Branch", "CGPA", "Status"];
    const rows = students.map(s => [s.id, s.name, s.branch, s.cgpa, s.status]);
    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Admin Dashboard</h3>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-r ${stat.color} text-white p-6 rounded-xl shadow-md transform transition duration-300 hover:scale-105`}
          >
            <div className="text-sm">{stat.title}</div>
            <div className="text-3xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Placement Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h4 className="text-lg font-semibold mb-4">Placement Progress</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={placementProgressData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <defs>
              <linearGradient id="placementGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="placements"
              stroke="url(#placementGradient)"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Students */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h4 className="text-lg font-semibold mb-4">Recent Student Activity</h4>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-600">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Branch</th>
              <th className="p-3 text-left">CGPA</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className="border-b hover:bg-gray-50 transition text-sm">
                <td className="p-3">{s.id}</td>
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.branch}</td>
                <td className="p-3">{s.cgpa}</td>
                <td
                  className={`p-3 font-medium ${
                    s.status === "Placed"
                      ? "text-green-600"
                      : s.status === "Interview"
                      ? "text-yellow-600"
                      : "text-blue-600"
                  }`}
                >
                  {s.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reports */}
      <div className="mb-8">
        <Reports />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h4 className="text-lg font-semibold mb-4">Quick Actions</h4>
        <div className="flex gap-4 flex-wrap">
          <button
            className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            onClick={() => setShowCompanyForm(true)}
          >
            Add Company
          </button>
          <button
            className="px-5 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
            onClick={() => setShowRemoveForm(true)}
          >
            Remove Student
          </button>
          <button
            className="px-5 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700"
            onClick={exportCSV}
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Add Company Form Modal */}
      {showCompanyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h4 className="text-lg font-semibold mb-4">Add Company</h4>
            <form onSubmit={handleAddCompany} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="border p-2 rounded"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={() => setShowCompanyForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Remove Student Form Modal */}
      {showRemoveForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h4 className="text-lg font-semibold mb-4">Remove Student</h4>
            <form onSubmit={handleRemoveStudent} className="flex flex-col gap-3">
              <input
                type="number"
                placeholder="Student ID"
                value={studentIdToRemove}
                onChange={(e) => setStudentIdToRemove(e.target.value)}
                className="border p-2 rounded"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={() => setShowRemoveForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
