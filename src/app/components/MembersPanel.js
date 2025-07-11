'use client';
import MemberProfile from "./MemberProfile";
import { useState,useEffect } from "react";

import { fetchMembers } from "../../lib/api/Members";
export default function MembersPanel() {
  
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
  useEffect(() => {
    async function loadMembers() {
      const data = await fetchMembers();
       console.log("Fetched Members:", data);
      setMembers(data.users);
    }
    loadMembers();
  }, []);
    
  

  return (
    <div className="fixed top-25 bottom-10 left-110 bg-white rounded-lg border shadow-lg z-50 overflow-hidden" style={{ width: '1200px', height: '80vh' }}>
      <div className="flex h-full">
        
        {/* Left 40% */}
        <div className="w-[40%] border-r overflow-y-auto p-4">
            {/* Heading div */}
  <div className="mb-4">
    <h2 className="text-2xl font-bold text-gray-800">Members</h2>
  </div>
  <div className="space-y-2 ">
    {members.map((member) => (
      <div
        key={member[0]}
        className="flex items-center bg-gray-100 gap-3 p-3 rounded-md hover:bg-[#FBF5DE] cursor-pointer"
        onClick={()=>setSelectedMember(member)}
      >
        {/* Icon */}
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
          {member[1].charAt(0)}
        </div>

        {/* Member name */}
        <span className="font-medium text-gray-800">{member[1]}</span>
      </div>
    ))}
  </div>
</div>


        {/* Right 60% */}
        <div className="w-[60%] p-4 bg-[#FBF5DE]">
          <MemberProfile member={selectedMember} />
        </div>

      </div>
    </div>
  );
}
