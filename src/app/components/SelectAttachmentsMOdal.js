"use client";
import { useEffect, useState } from "react";
import { X, Paperclip, Upload } from "lucide-react";
import { fetchForStory } from "@/lib/api/fetchForStory";

export default function SelectAttachmentsModal({
  onClose,
  onConfirm,
  onBrowseUpload,
  projectId,
}) {
  const [attachments, setAttachments] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const loadAttachments = async () => {
      if (!projectId) return;
      try {
        const result = await fetchForStory(projectId);
        setAttachments(result);
      } catch (err) {
        console.error("Failed to fetch attachments:", err.message);
      }
    };
    loadAttachments();
  }, [projectId]);

  const toggleSelection = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    console.log("Selected IDs:", selected);
    onConfirm(selected);
    onClose();
  };

  const handleBrowse = () => {
    onBrowseUpload(); // will trigger system file picker in parent
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative bg-[#FFF7E9] shadow-xl rounded-xl p-8 w-[600px] max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          <X size={24} />
        </button>
        {/* Title */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Paperclip size={20} /> Select Attachments
          </h1>
        </div>
        <hr className="mb-4" />
        {/* Attachment List */}
        <div className="space-y-3 px-4">
          {attachments.length === 0 ? (
            <p className="text-gray-600 text-center">
              No attachments found for this project.
            </p>
          ) : (
            attachments.map((file) => (
              <div
                key={file.attachment_id}
                onClick={() => toggleSelection(file.attachment_id)}
                className={`flex items-center justify-between px-4 py-2 rounded-lg shadow-sm cursor-pointer border ${
                  selected.includes(file.attachment_id)
                    ? "bg-orange-100 border-orange-400"
                    : "bg-white border-gray-300 hover:bg-orange-50"
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-gray-800 font-medium">{file.name}</span>
                  <span className="text-sm text-gray-500">
                    Created by: {file.created_by_name}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {file.file_type?.toUpperCase()}
                </span>
              </div>
            ))
          )}
        </div>
        {/* Bottom Buttons */}
        <div className="flex justify-end gap-3 mt-6 px-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleBrowse}
            className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 flex items-center gap-2"
          >
            <Upload size={18} /> Browse
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
