'use client';

import { useRouter } from 'next/navigation';
import { Users, UserPlus, Pencil, FileText } from 'lucide-react';

export default function Card({ task, onDragStart }) {
  const router = useRouter();

  // Helper handlers
  const handleViewMembers = () => {
    router.push(`/user-story/${task.story_id}/members`);
  };

  const handleAssignMember = () => {
    router.push(`/user-story/${task.story_id}/assign`);
  };

  const handleEditStory = () => {
    router.push(`/user-story/${task.story_id}/edit`);
  };

  const handleViewDetails = () => {
    router.push(`/user-story/${task.story_id}/details`);
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="bg-white p-4 rounded shadow mb-4 hover:shadow-lg relative"
    >
      {/* Title and Tag */}
      <h4 className="text-md font-semibold text-black">{task.title}</h4>
      <span className="text-sm text-gray-500">{task.tag}</span>

      {/* Avatar */}
      <div className="mt-2">
        <img src={task.avatar} alt="Avatar" className="w-6 h-6 rounded-full" />
      </div>

      {/* Action Icons */}
      <div className="absolute bottom-2 right-2 flex space-x-2">
        <button
          onClick={handleViewMembers}
          title="View Members"
          className="hover:scale-110 transition"
        >
          <Users className="w-4 h-4 text-blue-600 hover:text-blue-800" />
        </button>

        <button
          onClick={handleAssignMember}
          title="Assign Member"
          className="hover:scale-110 transition"
        >
          <UserPlus className="w-4 h-4 text-green-600 hover:text-green-800" />
        </button>

        <button
          onClick={handleEditStory}
          title="Edit Story"
          className="hover:scale-110 transition"
        >
          <Pencil className="w-4 h-4 text-yellow-600 hover:text-yellow-800" />
        </button>

        <button
          onClick={handleViewDetails}
          title="View Details"
          className="hover:scale-110 transition"
        >
          <FileText className="w-4 h-4 text-gray-600 hover:text-black" />
        </button>
      </div>
    </div>
  );
}
