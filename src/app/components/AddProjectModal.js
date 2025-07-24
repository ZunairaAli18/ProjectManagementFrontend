'use client';
import { useState, useEffect } from "react";
import { addProject, updateProject } from "@/lib/api/projects";

export default function AddProjectModal({ onClose, onSave, projectToEdit }) {
  const [form, setForm] = useState(null); // initially null to detect "not yet initialized"
  const [edit, setEdit] = useState(false);

  // Load form only once when modal opens
  useEffect(() => {
    const now = new Date().toISOString().slice(0, 16);
    const user = JSON.parse(localStorage.getItem('user'));
    const draft = JSON.parse(localStorage.getItem("project-draft"));

    if (!user) {
      alert("User not found in localStorage.");
      return;
    }

    if (projectToEdit) {
      setEdit(true);
      const parsedCreatedAt = new Date(projectToEdit.created_at).toISOString().slice(0, 16);
      const parsedDeadline = new Date(projectToEdit.deadline).toISOString().slice(0, 10);

      const statusMap = {
        "Paused": 1,
        "Yet to Start": 2,
        "In Progress": 3,
        "Completed": 4
      };

      setForm({
        name: projectToEdit.title || '',
        deadline: parsedDeadline,
        createdBy: projectToEdit.created_by,
        createdById: parseInt(projectToEdit.created_by_id),
        createdAt: parsedCreatedAt,
        status_id: statusMap[projectToEdit.status] || 2,
      });
    } else {
      setForm({
        name: draft?.name || '',
        deadline: draft?.deadline || '',
        createdBy: user[1],
        createdById: user[0],
        createdAt: now,
        status_id: 2,
      });
    }
  }, [projectToEdit]);

  // Auto-save draft only if not in edit mode and form has been initialized
  useEffect(() => {
    if (!edit && form !== null) {
      localStorage.setItem("project-draft", JSON.stringify({
        name: form.name,
        deadline: form.deadline,
      }));
    }
  }, [form?.name, form?.deadline]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, deadline, createdById, status_id } = form;

    if (!name || !deadline) {
      alert("Enter all required details");
      return;
    }

    const payload = {
      title: name,
      deadline: deadline,
      created_by: parseInt(createdById),
      status_id: status_id
    };

    try {
      if (edit && projectToEdit?.project_id) {
        await updateProject({ title: name, deadline: deadline }, projectToEdit.project_id);
      } else {
        await addProject(payload);
        localStorage.removeItem("project-draft"); // Clear only after successful save
      }

      onSave();
      onClose();
    } catch (err) {
      alert("Failed to save project: " + err.message);
    }
  };

  const handleCancel = () => {
    onClose(); // Do not clear the draft on cancel
  };

  if (!form) return null; // avoid rendering before state is set

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-[#F0E4D3] p-6 rounded-lg shadow-lg w-[90%] max-w-2xl h-[600px] relative">
        <h2 className="text-4xl font-bold mb-8">
          {projectToEdit ? "Edit Project" : "Add New Project"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={form.name}
          onChange={handleChange}
          className="w-full h-[50px] bg-blue-100 border px-3 py-2 mb-8 rounded-lg shadow-lg"
        />

        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="w-full h-[50px] bg-blue-100 border px-3 py-2 mb-8 rounded-lg shadow-lg"
        />

        <input
          type="text"
          name="createdBy"
          placeholder="Created By"
          value={form.createdBy}
          readOnly
          className="w-full h-[50px] bg-blue-100 border px-3 py-2 mb-8 rounded-lg shadow-lg"
        />

        <input
          type="datetime-local"
          name="createdAt"
          value={form.createdAt}
          readOnly
          className="w-full h-[50px] bg-blue-100 border px-3 py-2 mb-8 rounded-lg shadow-lg cursor-not-allowed"
        />

        <div className="flex justify-end gap-2">
          <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
        </div>
      </div>
    </div>
  );
}