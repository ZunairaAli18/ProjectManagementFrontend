'use client';
import { useState } from 'react';
import Card from './Card';
import AddUserStoryModal from './AddUserStoryModal';
import UserStporyDetails from './UserStporyDetails';

export default function Column({ title, tasks, onDragStart, onDrop, projectId, onSaveStory, onUpdateStory }) {
  const [showModal, setShowModal] = useState(false);
  const [editStory, setEditStory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleViewDetails = (story) => {
    setSelectedStory(story);
    setShowDetailsModal(true);
  };

  const handleEditStoryModal = (story) => {
    setEditStory(story);
    setShowEditModal(true);
  };

  return (
    <>
      <div
        className="bg-gray-100 p-4 rounded-lg shadow-md w-1/3 mx-2"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-black">{title}</h3>
          {title === 'To Do' && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-200 hover:bg-green-300 text-green-900 px-3 py-1 rounded text-sm font-semibold"
            >
              + Add Task
            </button>
          )}
        </div>

        {tasks.map((task) => (
          <Card
            key={task.story_id}
            task={task}
            onDragStart={() => onDragStart(task.story_id)} // ✅ use story_id
            onViewDetails={handleViewDetails}
            onEditStoryModal={handleEditStoryModal}
          />
        ))}
      </div>

      {showModal && (
        <AddUserStoryModal
          onClose={() => setShowModal(false)}
          onSave={onSaveStory}
          projectId={projectId}
        />
      )}

      {showEditModal && editStory && (
        <AddUserStoryModal
          onClose={() => setShowEditModal(false)}
          onUpdate={onUpdateStory}
          projectId={projectId}
          storyToEdit={editStory}
        />
      )}

      {showDetailsModal && selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <UserStporyDetails story={selectedStory} onClose={() => setShowDetailsModal(false)} />
        </div>
      )}
    </>
  );
}
