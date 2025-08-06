"use client";
import Link from "next/link";
import { useState } from "react";
import { PauseCircle, PlayCircle } from "lucide-react";
import Board from "./Board"; // Assuming you have a Board component for tasks

export default function ProjectCard({
  project,
  onViewMembers,
  onEdit,
  onAssignMembers,
  onAttachmentFetch,
}) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(project);
  const getStatusBadge = (status) => {
    if (status === "Completed") return "bg-green-100 text-green-800";
    if (status === "In Progress") return "bg-blue-100 text-blue-800";
    if (status === "Paused") return "bg-gray-200 text-gray-800";
    return "bg-red-100 text-red-800"; // Not Started
  };

  const handleAssignMember = () => {
    if (onAssignMembers) console.log(project.project_id);
    onAssignMembers(project.project_id);
  };

  const handleEditProject = () => {
    onEdit(project);
  };

  const handleAttachmentFetch = () => {
    if (onAttachmentFetch) onAttachmentFetch(project);
  };
  const handleViewMembers = () => {
    console.log("ProjectCard received:", project); // 👈 check this
    console.log(project.project_id);
    onViewMembers(project.project_id); // trigger parent modal with ID
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const updateStatus = async (newStatus) => {
    try {
      const res = await fetch("http://localhost:5000/update_project_status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: project.project_id,
          status: newStatus,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(newStatus);
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating project status");
    }
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition mb-6 border border-gray-300">
      {/* Linked part */}

      <div onClick={toggleDropdown} className="cursor-pointer">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-black">{project.title}</h2>
          <div className="flex flex-col items-end gap-2">
            <span
              className={`text-sm px-4 py-1 rounded-full font-medium ${getStatusBadge(
                project.status
              )}`}
            >
              {project.status}
            </span>
          </div>
        </div>
        <div className="text-gray-700 space-y-2 mb-4">
          <p>
            <strong>Created By:</strong> {project.created_by}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(project.created_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Deadline:</strong>{" "}
            {new Date(project.deadline).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Buttons (NOT wrapped in Link) */}
      <div className="flex gap-4 mt-2">
        <button
          onClick={handleViewMembers}
          className="bg-[#58A0C8] hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-semibold"
        >
          View Members
        </button>
        <button
          onClick={handleAssignMember}
          className="bg-[#58A0C8] hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-semibold"
        >
          Assign Member
        </button>
        <button
          onClick={handleEditProject}
          className="bg-[#58A0C8] hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-semibold"
        >
          Edit Project
        </button>
        <button
          onClick={handleAttachmentFetch}
          className="bg-[#58A0C8] hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-semibold"
        >
          View Attachments
        </button>

        <button
          onClick={() => updateStatus("Paused")}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 "
          title="Pause Project"
        >
          <PauseCircle className="w-6 h-6" />
        </button>
        <button
          onClick={() => updateStatus("In Progress")}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2"
          title="Resume Project"
        >
          <PlayCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="mt-6 border-t pt-4">
          <div className="flex items-center gap-2 bg-[#456882] text-blue-800 px-6 py-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold  text-white">
              📋 User Stories and Tasks
            </h3>
          </div>
          <Board projectId={project.project_id} />
        </div>
      )}
    </div>
  );
}
