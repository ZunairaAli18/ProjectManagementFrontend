"use client";
import MemberProfile from "./MemberProfile";
import { useState, useEffect } from "react";
import { fetchMembers, getUnassignedUsers } from "../../lib/api/Members";
import { assignedUsers, unassignedUsers } from "../../lib/api/userstory";
import { searchMembers } from "../../lib/api/searchMembers";

export default function MembersPanel({ projectId, userStoryId, isAssigning }) {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function loadMembers() {
      let data;

      if (userStoryId) {
        console.log(
          "Loading members for user story:",
          userStoryId,
          isAssigning
        );
        data = isAssigning
          ? await unassignedUsers(userStoryId)
          : await assignedUsers(userStoryId);
        setMembers(data.members);
        setFilteredMembers(data.members);
      } else {
        data = isAssigning
          ? await getUnassignedUsers(projectId)
          : await fetchMembers();
        console.log("Fetched Members:", data);
        setMembers(data.users);
        setFilteredMembers(data.users);
      }
    }
    loadMembers();
  }, [projectId, userStoryId]);

useEffect(() => {
  const delayDebounce = setTimeout(async () => {
    if (searchText.trim() === "") {
      setFilteredMembers(members);
    } else {
      const results = await searchMembers(searchText.trim());
      setFilteredMembers(results);
    }
  }, 300);

  return () => clearTimeout(delayDebounce);
}, [searchText]);

  return (
    <div
      className="fixed top-25 bottom-10 left-110 bg-white rounded-lg border shadow-lg z-50 overflow-hidden"
      style={{ width: "1200px", height: "80vh" }}
    >
      <div className="flex h-full">
        {/* Left 40% */}
        <div className="w-[40%] border-r overflow-y-auto p-4">
          {/* Heading + Search */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Members</h2>
            <input
              type="text"
              placeholder="Search members..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <div
                  key={member.user_id}
                  className="flex items-center bg-gray-100 gap-3 p-3 rounded-md hover:bg-[#FBF5DE] cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                    {member.name?.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-800">
                    {member.name}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 mt-4">No members found.</p>
            )}
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
