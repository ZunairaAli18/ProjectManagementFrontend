'use client';

import { useEffect, useState } from 'react';
import MemberProfile from './MemberProfile';

export default function SingleProjectMembersPanel({ projectId }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const dummyMembers = [
        [1, 'Ali Raza', 'ali@example.com', null, 27, 'Male', 'B+', '2023-02-14', '2025-06-10'],
        [2, 'Sarah Khan', 'sarah@example.com', null, 31, 'Female', 'A-', '2023-01-10', '2025-06-01'],
        [3, 'Ahmed Faraz', 'ahmed@example.com', null, 29, 'Male', 'O+', '2023-05-01', '2025-05-12'],
      ];

      setMembers(dummyMembers);
      setSelectedMember(dummyMembers[0]); // default selection
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [projectId]);

  return (
    <div className="flex w-full h-[70vh]">
      {/* Left 40% - Member List */}
      <div className="w-[40%] border-r overflow-y-auto p-4 bg-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Members</h2>

        {loading ? (
          <p className="text-gray-600">Loading members...</p>
        ) : members.length === 0 ? (
          <p className="text-gray-500">No members assigned to this project yet.</p>
        ) : (
          <div className="space-y-3">
            {members.map((member, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-yellow-100 ${
                  selectedMember && selectedMember[0] === member[0]
                    ? 'bg-yellow-200 font-semibold'
                    : 'bg-white'
                }`}
                onClick={() => setSelectedMember(member)}
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
                  {member[1].charAt(0)}
                </div>
                <span>{member[1]}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right 60% - Member Profile */}
      <div className="w-[60%] p-6 bg-white">
        {selectedMember ? (
          <MemberProfile member={selectedMember} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 text-lg">
            Select a member to view details.
          </div>
        )}
      </div>
    </div>
  );
}
