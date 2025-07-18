'use client';

import { useState } from 'react';
import { assignMemberToProject } from '@/lib/api/Members';

export default function AssignMemberButton({ projectId, member }) {
  const [isAssigning, setIsAssigning] = useState(false);
  const [isAssigned, setIsAssigned] = useState(false); // new state

  const handleAssign = async () => {
  if (!projectId || !member?.user_id || isAssigned) return;

  setIsAssigning(true);
  try {
    await assignMemberToProject(projectId, member.user_id);
    console.log('Member has been assigned');
    setIsAssigned(true); // mark as assigned
   
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
      {isAssigned ? 'Assigned' : isAssigning ? 'Assigning...' : 'Assign to Project'}
    </button>
  );
}
