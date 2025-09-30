import React, { useState } from "react";
import { motion } from "framer-motion";
import { jobs as mockJobs } from "../../mock/jobs";

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState(mockJobs);
  const [title, setTitle] = useState("");
  const [pkg, setPkg] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [desc, setDesc] = useState("");

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleJobId, setScheduleJobId] = useState(null);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  // Add a new job
  function add() {
    if (!title) return alert("Enter job title");
    const n = {
      id: Date.now(),
      title,
      company: "Murugan Tech Solutions",
      package: pkg || "TBD",
      eligibility: eligibility || "TBD",
      desc: desc || "Posted by employer",
      shortlisted: false,
      scheduled: null,
    };
    setJobs([n, ...jobs]);
    setTitle("");
    setPkg("");
    setEligibility("");
    setDesc("");
  }

  // Delete a job
  function remove(id) {
    setJobs(jobs.filter((j) => j.id !== id));
  }

  // Shortlist a job
  function shortlist(id) {
    setJobs(
      jobs.map((j) => (j.id === id ? { ...j, shortlisted: !j.shortlisted } : j))
    );
  }

  // Open Schedule Modal
  function openSchedule(jobId) {
    setScheduleJobId(jobId);
    setShowScheduleModal(true);
  }

  // Handle Schedule Submit
  function handleSchedule(e) {
    e.preventDefault();
    if (!scheduleDate || !scheduleTime) return alert("Enter date and time");
    setJobs(
      jobs.map((j) =>
        j.id === scheduleJobId ? { ...j, scheduled: { date: scheduleDate, time: scheduleTime } } : j
      )
    );
    setScheduleDate("");
    setScheduleTime("");
    setScheduleJobId(null);
    setShowScheduleModal(false);
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Employer Dashboard</h3>

      {/* Job Posting Form */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h4 className="font-semibold text-lg mb-3">Post a New Job</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
            className="border rounded px-3 py-2"
          />
          <input
            value={pkg}
            onChange={(e) => setPkg(e.target.value)}
            placeholder="Package (e.g., 6 LPA)"
            className="border rounded px-3 py-2"
          />
          <input
            value={eligibility}
            onChange={(e) => setEligibility(e.target.value)}
            placeholder="Eligibility (e.g., CGPA ≥ 7.0)"
            className="border rounded px-3 py-2"
          />
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Short Description"
            className="border rounded px-3 py-2"
          />
        </div>
        <button
          onClick={add}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
        >
          Post Job
        </button>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((j) => (
          <motion.div
            key={j.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white p-5 rounded-xl shadow relative"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{j.title}</h3>
                <p className="text-sm text-gray-500">{j.company}</p>
              </div>
              <span className="text-sm font-medium text-indigo-600">
                {j.package}
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-600">{j.desc}</p>
            <p className="mt-2 text-xs text-gray-500">
              Eligibility: {j.eligibility}
            </p>
            {j.scheduled && (
              <p className="mt-1 text-xs text-green-600">
                Scheduled: {j.scheduled.date} at {j.scheduled.time}
              </p>
            )}

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => shortlist(j.id)}
                className={`px-3 py-1 rounded text-white ${
                  j.shortlisted ? "bg-gray-500 hover:bg-gray-600" : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {j.shortlisted ? "Unshortlist" : "Shortlist"}
              </button>
              <button
                onClick={() => openSchedule(j.id)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Schedule
              </button>
              <button
                onClick={() => remove(j.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h4 className="text-lg font-semibold mb-4">Schedule Interview</h4>
            <form onSubmit={handleSchedule} className="flex flex-col gap-3">
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="border p-2 rounded"
                required
              />
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="border p-2 rounded"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={() => setShowScheduleModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
