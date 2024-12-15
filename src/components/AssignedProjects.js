import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const AssignedProjects = () => {
  const userId = process.env.USERID || "675ebc3fa1ba2d44d8bce608"; // Use the correct prefix
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/projects/assigned/${userId}`
        );
        setProjects(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjects();
  }, [userId]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        Assigned Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link to={`/projects/track/${project._id}`} key={project._id}>
            <div className="bg-white shadow-lg rounded-lg p-6 border hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {project.title}
                </h3>
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  <BsCircleFill
                    className={`text-xs ${
                      project.status === "Pending"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  />
                  {project.status}
                </div>
              </div>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <AiOutlineClockCircle className="text-lg" />
                <span>
                  Due Date: {new Date(project.dueDate).toLocaleDateString()}
                </span>
              </div>
              <button
                disabled={project.status !== "Pending"}
                onClick={() => acceptProject(project._id)}
                className={`mt-6 w-full py-2 rounded-lg text-white font-semibold ${
                  project.status === "Pending"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                } transition-colors duration-300`}
              >
                {project.status === "Pending" ? "Accept Project" : "Accepted"}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const acceptProject = async (projectId) => {
  try {
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/projects/accept/${projectId}`);
    alert("Project Accepted!");
    window.location.reload(); // Refresh to show updated status
  } catch (err) {
    console.error(err);
    alert("Failed to accept project.");
  }
};

export default AssignedProjects;
