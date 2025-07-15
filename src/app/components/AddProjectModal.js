import { useState,useEffect } from "react";

export default function AddProjectModal({ onClose, onSave }) {
    const [form, setForm] = useState({
    name: '',
    deadline: '',
    createdBy: '',
    createdAt: ''
  });
  // Set createdAt to current date-time when modal opens
  useEffect(() => {
    const now = new Date().toISOString().slice(0, 16); // e.g., "2025-07-11T10:45"
    const user = JSON.parse(localStorage.getItem('user'));
   
    setForm(prev => ({ ...prev, createdAt: now , createdBy: user?.name || ''}));
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!form.name || !form.description || !form.deadline || !form.createdBy){
        alert("Enter all details");
        return;
    }
    console.log("Form has been submitted");
    onSave(form);
    onClose();
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-[#F0E4D3] p-6 rounded-lg shadow-lg w-[90%] max-w-2xl h-[600px] relative" >
        <h2 className="text-4xl font-bold mb-8">Add New Project</h2>
        {/* Replace with your actual form */}
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={form.name}
          onChange={handleChange}
          className="w-full h-[50px] bg-blue-100 border px-3 py-2 mb-8 rounded-lg shadow-lg"
        />

        <input
          type="datetime-local"
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
          onChange={handleChange}
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
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
        </div>
      </div>
    </div>
  );
}
