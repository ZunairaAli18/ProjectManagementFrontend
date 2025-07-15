'use client';
import { useRouter } from 'next/navigation';
import Card from './Card';

export default function Column({ title, tasks, onDragStart, onDrop }) {
  const router = useRouter();
  return (
    <div
      className="bg-gray-100 p-4 rounded-lg shadow-md w-1/3 mx-2"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-black">{title}</h3>
        {title === 'Backlog' && (
          <button 
          onClick={() => router.push('/user-story/add')}
          className="bg-green-200 hover:bg-green-300 text-green-900 px-3 py-1 rounded text-sm font-semibold">
            + Add Task
          </button>
        )}
      </div>

      {tasks.map((task, index) => (
        <Card key={index} task={task} onDragStart={() => onDragStart(index)} />
      ))}
    </div>
  );
}
