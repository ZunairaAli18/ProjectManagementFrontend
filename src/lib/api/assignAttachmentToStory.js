// utils/api/assignAttachmentToStory.js

export async function assignAttachmentToStory(attachmentId, projectId, userStoryId) {
  try {
    const res = await fetch('http://localhost:5000/assign-attachment-to-story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        attachment_id: attachmentId,
        project_id: projectId,
        user_story_id: userStoryId,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Failed to assign attachment');
    }

    return { success: true, message: data.message };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
