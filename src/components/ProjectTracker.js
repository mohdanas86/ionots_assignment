import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { AiOutlineCheckCircle, AiOutlineSync } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";

const ProjectTracker = ({ projectId }) => {
  const [status, setStatus] = useState(null);
  const [projectData, setProjectData] = useState(null);

  // Wrap getProjectData in useCallback
  const getProjectData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/projects/${projectId}`
      );
      setProjectData(response.data);
      setStatus(response.data.status); // Update status based on fetched data
    } catch (err) {
      console.error(err);
      alert("Failed to fetch project data.");
    }
  }, [projectId]); // Dependency on projectId

  const updateStatus = async (newStatus) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/projects/update-status/${projectId}`,
        { status: newStatus }
      );
      setStatus(response.data.status); // Update status after successful API call
      alert(`Project status updated to ${newStatus}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  useEffect(() => {
    if (projectId) {
      getProjectData(); // Call the memoized function
    }
  }, [projectId, getProjectData]); // Add getProjectData to dependency array

  if (!projectData) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        {projectData.title}
      </h3>
      <p className="text-gray-600 mb-6">{projectData.description}</p>

      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        Current Status:
        <span
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
            status === "In Progress"
              ? "bg-yellow-100 text-yellow-700"
              : status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          <BsCircleFill
            className={`text-xs ${
              status === "In Progress"
                ? "text-yellow-500"
                : status === "Completed"
                ? "text-green-500"
                : "text-gray-500"
            }`}
          />
          {status}
        </span>
      </h3>

      <div className="mb-6">
        <p className="text-gray-600 mb-2">
          Progress: <span className="font-bold">{projectData.progress || 0}%</span>
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${projectData.progress || 0}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4">
        <button
          disabled={status === "In Progress"}
          onClick={() => updateStatus("In Progress")}
          className={`w-full flex items-center justify-center gap-2 px-6 py-2 font-semibold rounded-lg ${
            status === "In Progress"
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          } transition-colors duration-300`}
        >
          <AiOutlineSync className="text-lg" />
          Mark as In Progress
        </button>

        <button
          disabled={status === "Completed"}
          onClick={() => updateStatus("Completed")}
          className={`w-full flex items-center justify-center gap-2 px-6 py-2 font-semibold rounded-lg ${
            status === "Completed"
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          } transition-colors duration-300`}
        >
          <AiOutlineCheckCircle className="text-lg" />
          Mark as Completed
        </button>
      </div>
    </div>
  );
};

export default ProjectTracker;
