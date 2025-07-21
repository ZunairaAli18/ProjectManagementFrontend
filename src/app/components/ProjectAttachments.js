'use client';
import { X, Paperclip } from 'lucide-react';

export default function ProjectAttachmentsModal({ projectTitle, attachments, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative bg-[#FFF7E9] shadow-xl rounded-xl p-8 w-[600px] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{projectTitle}</h1>
        </div>

        <hr className="mb-6" />

        {attachments?.length > 0 ? (
          <div className="px-4">
            <h3 className="flex items-center gap-2 font-semibold text-gray-900">
              <Paperclip size={18} />
              Overall Project Attachments
            </h3>
            <ul className="list-disc list-inside text-blue-700 mt-2">
              {attachments.map((file) => (
                <li key={file.attachment_id}>
                  <a
                    href={file.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {file.file_name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center text-gray-600">No attachments found for this project.</p>
        )}
      </div>
    </div>
  );
}