"use client";
import { useState, useEffect } from "react";
import { addProject, updateProject } from "@/lib/api/projects";
import { useSelector } from "react-redux";

export default function AddProjectModal({ onClose, onSave, projectToEdit }) {
  const [form, setForm] = useState(null); // initially null to detect "not yet initialized"
  const [edit, setEdit] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // Filter out duplicates
    const uniqueNewFiles = files.filter(
      (file) =>
        !selectedFiles.some((f) => f.name === file.name && f.size === file.size)
    );

    if (uniqueNewFiles.length === 0) return; // All were duplicates

    setSelectedFiles((prev) => [...prev, ...uniqueNewFiles]);
  };
  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };
  const user = useSelector((state) => state.auth.user);
  // Load form only once when modal opens
  useEffect(() => {
    const now = new Date().toISOString().slice(0, 16);

    const draft = JSON.parse(localStorage.getItem("project-draft"));

    if (!user) {
      alert("User not found in localStorage.");
      return;
    }

    if (projectToEdit) {
      setEdit(true);
      const parsedCreatedAt = new Date(projectToEdit.created_at)
        .toISOString()
        .slice(0, 16);
      const parsedDeadline = new Date(projectToEdit.deadline)
        .toISOString()
        .slice(0, 10);

      const statusMap = {
        Paused: 1,
        "Yet to Start": 2,
        "In Progress": 3,
        Completed: 4,
      };

      setForm({
        name: projectToEdit.title || "",
        deadline: parsedDeadline,
        createdBy: projectToEdit.created_by,
        createdById: parseInt(projectToEdit.created_by_id),
        createdAt: parsedCreatedAt,
        status_id: statusMap[projectToEdit.status] || 2,
      });
    } else {
      setForm({
        name: draft?.name || "",
        deadline: draft?.deadline || "",
        createdBy: user.name,
        createdById: user.user_id,
        createdAt: now,
        status_id: 2,
      });
    }
  }, [projectToEdit]);

  // Auto-save draft only if not in edit mode and form has been initialized
  useEffect(() => {
    if (!edit && form !== null) {
      localStorage.setItem(
        "project-draft",
        JSON.stringify({
          name: form.name,
          deadline: form.deadline,
        })
      );
    }
  }, [form?.name, form?.deadline]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      deadline,
      created_by: parseInt(createdById),
      status_id,
    };

    try {
      let projectId;

      // Step 1: Add or update project
      if (edit && projectToEdit?.project_id) {
        await updateProject(
          { title: name, deadline },
          projectToEdit.project_id
        );
        projectId = projectToEdit.project_id;
      } else {
        const res = await addProject(payload);
        projectId = res.message;
        localStorage.removeItem("project-draft");
      }

      // Step 2: Upload all selected files and collect attachment IDs
      const attachmentIds = [];

      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("user_id", createdById);
        formData.append("project_id", projectId.message);

        const uploadRes = await fetch(
          "http://localhost:5000/upload-attachment",
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadData = await uploadRes.json();
        console.log(uploadData);
        if (uploadRes.ok && uploadData.attachment_id) {
          attachmentIds.push(uploadData.attachment_id);
        } else {
          console.error("Upload failed for file:", file.name);
        }
      }
      console.log("Sending attachment IDs:", attachmentIds);

      // Step 3: Assign all attachments to the project (in one call)
      if (attachmentIds.length > 0) {
        await fetch("http://localhost:5000/assign-attachments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            project_id: projectId,
            attachment_ids: attachmentIds,
          }),
        });
      }

      onSave();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save project and attachments: " + err.message);
    }
  };

  const handleCancel = () => {
    onClose(); // Do not clear the draft on cancel
  };

  if (!form) return null; // avoid rendering before state is set

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-[#F0E4D3] p-6 rounded-lg shadow-lg w-[90%] max-w-2xl max-h-screen overflow-y-auto relative">
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
        <label className="flex items-center gap-2 cursor-pointer mb-2">
          <span className="text-blue-600">📎 Attach Files</span>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {selectedFiles.length > 0 && (
          <div className="mt-2 mb-4">
            <h4 className="font-semibold text-gray-800 mb-1">
              Selected Files:
            </h4>
            <div className="flex flex-col gap-2 ">
              {selectedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center  justify-between px-3 py-1 rounded shadow-sm text-sm text-gray-700 "
                >
                  <span className="truncate">📄 {file.name}</span>
                  <button
                    onClick={() => handleRemoveFile(idx)}
                    className="text-red-500 hover:text-red-700 ml-3 text-sm"
                    title="Remove"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
