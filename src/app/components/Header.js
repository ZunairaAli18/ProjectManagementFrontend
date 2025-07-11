// components/Header.jsx
'use client';
export default function Header({ onAddProjectClick }) {
  return (
    <header className="-m-2 h-[100px] w-full px-6 py-3 bg-white shadow-md flex justify-between items-center">
      <h1 className="text-3xl font-semibold">Project Dashboard</h1>
      <button 
        onClick={onAddProjectClick}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Add Project
      </button>
    </header>
  );
}
