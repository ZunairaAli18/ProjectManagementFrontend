'use client';
import { useState, useEffect } from 'react';
import MemberProfile from './MemberProfile';

export default function MembersPanel({ projectId, onClose }) {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    async function loadMembers() {
      // Dummy data for now
      const data = {
        users: [
          [1, 'Sana Malik', 'sana@example.com', null, 25, 'Female', 'B+', '2024-01-01', '2025-01-01'],
          [2, 'Ali Raza', 'ali@example.com', null, 28, 'Male', 'O+', '2024-01-01', '2025-01-01'],
        ]
      };
      setMembers(data.users);
    }
    loadMembers();
  }, []);

  const handleAssign = () => {
    alert(`Assigning user ${selectedMember[1]} to project ${projectId}`);
    // Later: call API to assign selectedMember[0] to projectId
    onClose(); // Close modal after assignment
  };

  return (
    <div className="fixed top-20 bottom-10 left-40 bg-white rounded-lg border shadow-lg z-50 overflow-hidden" style={{ width: '80vw', height: '80vh' }}>
      <div className="flex h-full">
        <div className="w-[40%] border-r overflow-y-auto p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Members</h2>
          <div className="space-y-2">
            {members.map((member) => (
              <div
                key={member[0]}
                className="flex items-center bg-gray-100 gap-3 p-3 rounded-md hover:bg-[#FBF5DE] cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                  {member[1].charAt(0)}
                </div>
                <span className="font-medium text-gray-800">{member[1]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[60%] p-4 bg-[#FBF5DE] relative">
          <MemberProfile member={selectedMember} />
          {selectedMember && (
            <button
              onClick={handleAssign}
              className="absolute bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
            >
              Assign to Project
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
