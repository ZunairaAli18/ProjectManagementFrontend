'use client';

import Link from 'next/link';

export default function Card({ task, onDragStart }) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="bg-white p-4 rounded shadow mb-4 cursor-pointer hover:shadow-lg"
    >
      <Link href={`/project/${encodeURIComponent(task.title)}`}>
        <div>
          <h4 className="text-md font-semibold text-black">{task.title}</h4>
          <span className="text-sm text-gray-500">{task.tag}</span>
          <div className="mt-2">
            <img src={task.avatar} alt="Avatar" className="w-6 h-6 rounded-full" />
          </div>
        </div>
      </Link>
    </div>
  );
}
