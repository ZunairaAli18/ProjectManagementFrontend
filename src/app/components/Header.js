// components/Header.jsx
'use client';
export default function Header({ onAddProjectClick , onAddUserClick }) {
  return (
    <header className=" h-[100px] w-full px-6 py-3 bg-gray-100 shadow-md flex justify-between items-center rounded-2xl">
      <h1 className="text-4xl font-semibold">Project Dashboard</h1>
       <div className="flex gap-4">
        <button 
          onClick={onAddProjectClick}
          className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition text-lg font-bold"
        >
          Add Project
        </button>
        <button 
          onClick={onAddUserClick}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-lg font-bold"
        >
          Add User
        </button>
      </div>
      
    </header>
  );
}
