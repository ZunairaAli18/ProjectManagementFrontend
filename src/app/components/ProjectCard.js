 'use client';
import Link from 'next/link';

export default function ProjectCard({ project }) {
  const getStatusBadge = (status) => {
    if (status === 'Completed') return 'bg-green-100 text-green-800';
    if (status === 'In Progress') return 'bg-blue-100 text-blue-800';
    return 'bg-red-100 text-red-800'; // Yet to be started or default
  };

  return (
    <Link href={`/projects/${project.project_id}`}>
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer mb-6 border border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-black">{project.title}</h2>
          <span className={`text-sm px-4 py-1 rounded-full font-medium ${getStatusBadge(project.status)}`}>
            {project.status}
          </span>
        </div>

        <div className="text-gray-700 space-y-2">
          <p>
            <strong>Created By:</strong> {project.created_by}
          </p>
          <p>
            <strong>Created At:</strong> {new Date(project.created_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
}