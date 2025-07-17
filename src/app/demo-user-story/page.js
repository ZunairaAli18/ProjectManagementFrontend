'use client';

import { useState } from 'react';
import AddUserStoryModal from '../components/AddStoryModal';

export default function DemoUserStoryPage() {
  const [showModal, setShowModal] = useState(false);

  // Example projectId (would be dynamic in a real app)
  const demoProjectId = 123;

  const handleSaveStory = (storyData) => {
    console.log('User story saved:', storyData);
    alert(`Story "${storyData.title}" submitted! Check console for payload.`);
    // Here you would typically POST to backend
  };

  return (
    <div className="min-h-screen bg-[#FFF3E1] p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add User Story Modal</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
      >
        + Add User Story
      </button>

      {showModal && (
        <AddUserStoryModal
          projectId={demoProjectId}
          onClose={() => setShowModal(false)}
          onSave={handleSaveStory}
        />
      )}
    </div>
  );
}
