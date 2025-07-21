'use client';

import { useState } from 'react';
import { assignMemberToProject, assignMemberToUserStory } from '@/lib/api/Members';

export default function AssignMemberButton({ projectId, userStoryId, member }) {
  const [isAssigning, setIsAssigning] = useState(false);
  const [isAssigned, setIsAssigned] = useState(false);

  const handleAssign = async () => {
    if (!member?.user_id || isAssigned) return;

    setIsAssigning(true);

    try {
      if (projectId) {
        await assignMemberToProject(projectId, member.user_id);
        console.log('Member assigned to project');
      } else if (userStoryId) {
        await assignMemberToUserStory(userStoryId, member.user_id);
        console.log('Member assigned to user story');
      } else {
        console.warn('No valid target for assignment');
        return;
      }

      setIsAssigned(true);
    } catch (error) {
      console.error('Error assigning member:', error.message);
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <button
      onClick={handleAssign}
      disabled={isAssigning || isAssigned}
      className={`mt-4 px-4 py-2 rounded text-white disabled:opacity-50 ${
        isAssigned ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {isAssigned
        ? 'Assigned'
        : isAssigning
        ? 'Assigning...'
        : projectId
        ? 'Assign to Project'
        : 'Assign to User Story'}
    </button>
  );
}
