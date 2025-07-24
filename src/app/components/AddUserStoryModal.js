'use client';
import { useEffect, useState } from 'react';

export default function AddUserStoryModal({ onClose, onSave, onUpdate, projectId, storyToEdit }) {
  const [form, setForm] = useState(null); // null initially
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const draft = JSON.parse(localStorage.getItem('story-draft'));

    if (!user) {
      alert("User not found in localStorage.");
      return;
    }

    if (storyToEdit) {
      setEdit(true);
      setForm({
        title: storyToEdit.title || '',
        description: storyToEdit.description || '',
        estimated_time: storyToEdit.estimated_time || '',
        createdBy: user[1],
        createdById: user[0],
        status_id: storyToEdit.status_id || 2,
      });
    } else {
      setForm({
        title: draft?.title || '',
        description: draft?.description || '',
        estimated_time: draft?.estimated_time || '',
        createdBy: user[1],
        createdById: user[0],
        status_id: 2,
      });
    }
  }, [storyToEdit]);

  // Auto-save draft when typing (only in non-edit mode)
  useEffect(() => {
    if (!edit && form !== null) {
      localStorage.setItem('story-draft', JSON.stringify({
        title: form.title,
        description: form.description,
        estimated_time: form.estimated_time
      }));
    }
  }, [form?.title, form?.description, form?.estimated_time]);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, estimated_time, createdById } = form;

    if (!title || !projectId || !createdById) {
      alert("Please fill all required fields.");
      return;
    }

    const payload = {
      title,
      description,
      estimated_time,
      project_id: projectId,
      created_by: parseInt(createdById),
      status_id: 2,
    };

    try {
      if (edit && onUpdate && storyToEdit?.story_id) {
        await onUpdate(payload, storyToEdit.story_id);
      } else {
        await onSave(payload);
        localStorage.removeItem("story-draft");
      }
      onClose();
    } catch (err) {
      alert("Failed to save user story: " + err.message);
    }
  };

  const handleClearDraft = () => {
    localStorage.removeItem("story-draft");
    setForm(prev => ({
      ...prev,
      title: '',
      description: '',
      estimated_time: ''
    }));
  };

  if (!form) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-[#F0E4D3] p-6 rounded-lg shadow-lg w-[90%] max-w-2xl h-[500px] relative">
        <h2 className="text-4xl font-bold mb-8">
          {storyToEdit ? "Edit Story" : "Add New Story"}
        </h2>

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
          name="estimated_time"
          placeholder="Estimated Time (e.g. 2 hours)"
          value={form.estimated_time}
          onChange={handleChange}
          className="w-full h-[50px] bg-blue-100 border px-3 py-2 mb-8 rounded-lg shadow-lg"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          {!edit && (
            <button onClick={handleClearDraft} type="button" className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500">
              Clear Draft
            </button>
          )}
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {storyToEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}