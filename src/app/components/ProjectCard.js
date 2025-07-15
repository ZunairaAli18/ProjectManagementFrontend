'use client';
import { useState } from 'react';

export default function ProjectCard({ project, onAssignMemberClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const getStatusBadge = (status) => {
    if (status === 'Completed') return 'bg-green-100 text-green-800';
    if (status === 'In Progress') return 'bg-blue-100 text-blue-800';
    if (status === 'Paused') return 'bg-gray-200 text-gray-800';
    return 'bg-red-100 text-red-800';
  };

  const handleViewMembers = () => {
    alert(`View members for: ${project.title}`);
  };

  const handleAssignMember = () => {
    onAssignMemberClick(project.project_id); // ✅ updated here
  };

  const handleEditProject = () => {
    alert(`Edit project: ${project.title}`);
  };

  const handleAttachmentFetch = () => {
    alert(`View attachments for: ${project.title}`);
  };
  const handleViewMembers = () => {
    onViewMembers(project.project_id); // trigger parent modal with ID
  };

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition mb-6 border border-gray-300">
      <div onClick={toggleDropdown} className="cursor-pointer">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-black">{project.title}</h2>
          <span className={`text-sm px-4 py-1 rounded-full font-medium ${getStatusBadge(project.status)}`}>
            {project.status}
          </span>
        </div>

        <div className="text-gray-700 space-y-2 mb-4">
          <p><strong>Created By:</strong> {project.created_by}</p>
          <p><strong>Created At:</strong> {new Date(project.created_at).toLocaleDateString()}</p>
          <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex gap-4 mt-2">
        <button onClick={handleViewMembers} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-semibold">
          View Members
        </button>
        <button onClick={handleAssignMember} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-semibold">
          Assign Member
        </button>
        <button onClick={handleEditProject} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-semibold">
          Edit Project
        </button>
        <button onClick={handleAttachmentFetch} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-semibold">
          View Attachments
        </button>
      </div>

      {isOpen && (
        <div className="mt-6 border-t pt-4">
          <div className="flex items-center gap-2 bg-blue-200 text-blue-800 px-6 py-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-blue-900">📋 User Stories and Tasks</h3>
          </div>
        </div>
      )}
    </div>
  );
}
