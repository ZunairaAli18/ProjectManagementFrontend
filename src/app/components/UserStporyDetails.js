'use client';

export default function UserStoryDetails({ story }) {
  return (
    <div className="min-h-screen bg-[#FFF7E9] flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-8 w-[600px]">
        {/* Title */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{story?.title}</h1>
        </div>

        <hr className="mb-6" />

        {/* Story Info */}
        <div className="text-gray-800 space-y-3 px-4">
          <div className="flex justify-between">
            <span className="font-semibold">Story ID:</span>
            <span>{story.story_id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Project:</span>
            <span>{story.project_title}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <span>{story.status_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Estimated Time:</span>
            <span>{story.estimated_time || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Created By (ID):</span>
            <span>{story.created_by}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Created At:</span>
            <span>{new Date(story.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Modified At:</span>
            <span>{new Date(story.modified_at).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Description (if any) */}
        {story.description && (
          <>
            <hr className="my-6" />
            <div className="px-4">
              <h3 className="font-semibold mb-1 text-gray-900">Description:</h3>
              <p className="text-gray-700">{story.description}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

