'use client';
import { useState, useEffect } from 'react';

export default function AddUserStoryModal({ onClose, onSave, projectId }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    createdBy: '',
    createdById: '',
    status_id: 2,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert("User not found in localStorage.");
      return;
    }

    setForm(prev => ({
      ...prev,
      createdBy: user[1],
      createdById: user[0],
    }));
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, estimatedTime, createdById } = form;

    if (!title || !projectId || !createdById) {
      alert("Please fill all required fields.");
      return;
    }

    const payload = {
      title,
      description,
      estimated_time: estimatedTime,
      project_id: projectId,
      created_by: parseInt(createdById),
      status_id: 2 // default
    };

    console.log("Submitting user story payload:", payload);
    try {
      await onSave(payload); // Parent will handle the POST
      onClose();
    } catch (err) {
      alert("Failed to save user story: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-[#F0E4D3] p-6 rounded-lg shadow-lg w-[90%] max-w-2xl h-[500px] relative">
        <h2 className="text-4xl font-bold mb-8">Add New Story</h2>

        <input
          type="text"
          name="title"
          placeholder="Story Title"
          value={form.title}
          onChange={handleChange}
          className="w-full h-[50px] bg-blue-100 border px-3 py-2 mb-8 rounded-lg shadow-lg"
        />

        <textarea
          name="description"
          placeholder="Description (optional)"
          value={form.description}
          onChange={handleChange}
          className="w-full h-[100px] bg-blue-100 border px-3 py-2 mb-8 rounded-lg shadow-lg resize-none"
        />

        <input
          type="text"
          name="estimatedTime"
          placeholder="Estimated Time (e.g. 2 hours)"
          value={form.estimatedTime}
          onChange={handleChange}
          className="w-full h-[50px] bg-blue-100 border px-3 py-2 mb-8 rounded-lg shadow-lg"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
        </div>
      </div>
    </div>
  );
}
