// lib/api/userStory.js

export async function fetchUserStoryDetails(storyId) {
  const response = await fetch(`http://localhost:5000/user-stories/${storyId}`);
  const data = await response.json();

  if (!response.ok || !data.Success) {
    throw new Error(data.error || 'Failed to fetch story details');
  }
  console.log(data.details[0].get_user_story_details)
  return data.details[0].get_user_story_details; // This will include { story, comments, attachments, ... }
}

// lib/api/userstory.js (or any middleware file you use)

export async function assignedUsers(userStoryId) {
  if (!userStoryId) {
    console.warn('No userStoryId provided to assignedUsers');
    return [];
  }

  try {
    const response = await fetch(`http://localhost:5000/user-stories/${userStoryId}/members`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok && data.Success) {
      return data;
    } else {
      console.error("Failed to fetch assigned users:", data.error);
      return [];
    }
  } catch (error) {
    console.error("Error while fetching assigned users:", error);
    return [];
  }
}

export async function unassignedUsers(userStoryId) {
  try {
    const response = await fetch(`http://localhost:5000/story/${userStoryId}/unassigned-users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok || result?.Success === false) {
      throw new Error(result?.error || 'Failed to fetch unassigned users for user story');
    }

    return result;
  } catch (error) {
    console.error('Error in unassignedUsers:', error.message);
    throw error;
  }
}

