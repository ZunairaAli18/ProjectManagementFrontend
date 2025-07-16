'use client';

import { useEffect, useState } from 'react';
import MemberProfile from './MemberProfile';
import { getProjectMembers } from '../../lib/api/projects'; // adjust path if needed

export default function SingleProjectMembersPanel({ projectId }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const data = await getProjectMembers(projectId); // now returns list of dicts
        setMembers(data);
        console.log("Fetched Members:", data);
        setSelectedMember(data[0] || null);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching project members:', err.message);
        setLoading(false);
      }
    }

    fetchMembers();
  }, [projectId]);

  return (
    <div className="flex w-full h-[70vh]">
      {/* Left Panel */}
      <div className="w-[40%] border-r overflow-y-auto p-4 bg-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Members</h2>

        {loading ? (
          <p className="text-gray-600">Loading members...</p>
        ) : members.length === 0 ? (
          <p className="text-gray-500">No members assigned to this project yet.</p>
        ) : (
          <div className="space-y-3">
            {members.map((member) => (
              <div
                key={member.user_id}
                className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-yellow-100 ${
                  selectedMember?.user_id === member.user_id ? 'bg-yellow-200 font-semibold' : 'bg-white'
                }`}
                onClick={() => setSelectedMember(member)}
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
                  {member.name?.charAt(0).toUpperCase()}
                </div>
                <span>{member.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Panel */}
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
