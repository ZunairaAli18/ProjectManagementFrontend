'use client';
import Link from 'next/link';
import { useState } from 'react';
import Board from './Board'; // Assuming you have a Board component for tasks

export default function ProjectCard({ project, onViewMembers, onEdit, onAssignMembers }) {
  
  const [isOpen, setIsOpen] = useState(false);
  const getStatusBadge = (status) => {
    if (status === 'Completed') return 'bg-green-100 text-green-800';
    if (status === 'In Progress') return 'bg-blue-100 text-blue-800';
    if (status === 'Paused') return 'bg-gray-200 text-gray-800';
    return 'bg-red-100 text-red-800'; // Not Started
  };
  console.log("ProjectCard received:", project); // 👈 check this
  
  const handleAssignMember = () => {
    if (onAssignMembers) onAssignMembers(project.project_id);  };

  const handleEditProject = () => {
  onEdit(project);
};


  const handleAttachmentFetch = () => {
    alert(`View attachments for: ${project.title}`);
  };
  const handleViewMembers = () => {
    console.log("ProjectCard received:", project); // 👈 check this
    console.log(project.project_id)
    onViewMembers(project.project_id); // trigger parent modal with ID
  };

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition mb-6 border border-gray-300">
      {/* Linked part */}
      
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
     

      {/* Buttons (NOT wrapped in Link) */}
      <div className="flex gap-4 mt-2">
        <button
          onClick={handleViewMembers}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-semibold"
        >
          View Members
        </button>
        <button
          onClick={handleAssignMember}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-semibold"
        >
          Assign Member
        </button>
        <button
          onClick={handleEditProject}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-semibold"
        >
          Edit Project
        </button>
                <button
          onClick={handleAttachmentFetch}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-semibold"
        >
          View Attachments
        </button>
      </div>
      {/* Dropdown Panel */}
      {isOpen && (
        <div className="mt-6 border-t pt-4">
<div className="flex items-center gap-2 bg-blue-200 text-blue-800 px-6 py-4 rounded-xl shadow-lg">
  <h3 className="text-lg font-bold  text-blue-900">📋 User Stories and Tasks</h3>
</div>
          <Board projectId={project.project_id}/>
        </div>
      )}
    </div>
  );
}