import React, { useState } from "react";
import { motion } from "framer-motion";
import { jobs } from "../../mock/jobs";
import { openApply } from "../../components/ApplyModal";

export default function StudentDashboard() {
  const [student, setStudent] = useState({
    name: "Arun Kumar",
    branch: "CSE",
    cgpa: 8.5,
    email: "arun.kumar@cit.edu",
    resume: null,
  });

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...student });

  const applications = [
    { id: 1, job: "Software Engineer", company: "Infosys", status: "Applied" },
    { id: 2, job: "Data Analyst", company: "TCS", status: "Interview" },
    { id: 3, job: "Frontend Developer", company: "Zoho", status: "Placed" },
  ];

  // Handle file upload
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStudent((prev) => ({ ...prev, resume: file.name }));
      alert(`✅ Resume uploaded: ${file.name}`);
    }
  };

  // Save updated profile
  const saveProfile = () => {
    setStudent(tempProfile);
    setShowProfileModal(false);
    alert("✅ Profile updated successfully!");
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Student Dashboard</h3>

      {/* Profile Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow"
        >
          <h4 className="text-lg font-semibold mb-2">Profile</h4>
          <p className="text-sm">
            <span className="font-bold">Name:</span> {student.name}
          </p>
          <p className="text-sm">
            <span className="font-bold">Branch:</span> {student.branch}
          </p>
          <p className="text-sm">
            <span className="font-bold">CGPA:</span> {student.cgpa}
          </p>
          <p className="text-sm">
            <span className="font-bold">Email:</span> {student.email}
          </p>
          <p className="text-sm">
            <span className="font-bold">Resume:</span>{" "}
            {student.resume || "Not uploaded"}
          </p>

          <div className="mt-3 flex gap-3">
            {/* Update Profile */}
            <button
              onClick={() => {
                setTempProfile({ ...student });
                setShowProfileModal(true);
              }}
              className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Update Profile
            </button>

            {/* Upload Resume */}
            <label className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
              Upload Resume
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="hidden"
              />
            </label>
          </div>
        </motion.div>

        {/* Applications Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow"
        >
          <h4 className="text-lg font-semibold mb-3">My Applications</h4>
          <ul className="space-y-2 text-sm">
            {applications.map((app) => (
              <li
                key={app.id}
                className="flex justify-between items-center border-b pb-1"
              >
                <span>
                  {app.job} @ {app.company}
                </span>
                <span
                  className={`font-medium ${
                    app.status === "Placed"
                      ? "text-green-600"
                      : app.status === "Interview"
                      ? "text-yellow-600"
                      : "text-blue-600"
                  }`}
                >
                  {app.status}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Recommended Jobs */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Recommended Jobs</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.slice(0, 3).map((j) => (
            <motion.div
              key={j.id}
              whileHover={{ y: -5 }}
              className="p-5 bg-white rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{j.title}</div>
                <div className="text-sm text-gray-500">{j.company}</div>
              </div>
              <button
                onClick={() => openApply(j)}
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Apply
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h3 className="text-lg font-bold mb-3">Update Profile</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={tempProfile.name}
                onChange={(e) =>
                  setTempProfile((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Name"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                value={tempProfile.branch}
                onChange={(e) =>
                  setTempProfile((prev) => ({ ...prev, branch: e.target.value }))
                }
                placeholder="Branch"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="number"
                value={tempProfile.cgpa}
                onChange={(e) =>
                  setTempProfile((prev) => ({ ...prev, cgpa: e.target.value }))
                }
                placeholder="CGPA"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="email"
                value={tempProfile.email}
                onChange={(e) =>
                  setTempProfile((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Email"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowProfileModal(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveProfile}
                className="px-3 py-1 bg-indigo-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
