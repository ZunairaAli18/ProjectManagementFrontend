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
