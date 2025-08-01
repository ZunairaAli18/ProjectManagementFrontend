"use client";
import MemberProfile from "./MemberProfile";
import { useState, useEffect, useRef } from "react";
import { fetchMembers, getUnassignedUsers } from "../../lib/api/Members";
import { assignedUsers, unassignedUsers } from "../../lib/api/userstory";

export default function MembersPanel({
  projectId,
  userStoryId,
  isAssigning,
  onclose,
}) {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const modalRef = useRef(null);
  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onclose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    async function loadMembers() {
      if (userStoryId) {
        console.log(
          "Loading members for user story:",
          userStoryId,
          isAssigning
        );
        const data = isAssigning
          ? await unassignedUsers(userStoryId)
          : await assignedUsers(userStoryId);
        setMembers(data.members);
      } else {
        const data = isAssigning
          ? await getUnassignedUsers(projectId)
          : await fetchMembers();
        console.log("Fetched Members:", data);
        setMembers(data.users); // Now data.users is an array of objects
      }
    }
    loadMembers();
  }, [projectId, userStoryId]);

  return (
    <div
      className="fixed top-25 bottom-10 left-110 bg-white rounded-lg border shadow-lg z-50 overflow-hidden"
      style={{ width: "1200px", height: "80vh" }}
    >
      <div ref={modalRef} className="flex h-full">
        {/* Left 40% */}
        <div className="w-[40%] border-r overflow-y-auto p-4">
          {/* Heading */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Members</h2>
          </div>

          <div className="space-y-2">
            {members.map((member) => (
              <div
                key={member.user_id}
                className="flex items-center bg-gray-100 gap-3 p-3 rounded-md hover:bg-[#FBF5DE] cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                {/* Icon */}
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                  {member.name?.charAt(0)}
                </div>

                {/* Member name */}
                <span className="font-medium text-gray-800">{member.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 60% */}
        <div className="w-[60%] p-4 bg-[#FBF5DE]">
          {selectedMember && (
            <MemberProfile
              key={selectedMember.user_id}
              member={selectedMember}
              hideTimestamps={false}
              projectId={projectId}
              userStoryId={userStoryId}
              isAssigning={isAssigning}
            />
          )}
        </div>
      </div>
    </div>
  );
}
