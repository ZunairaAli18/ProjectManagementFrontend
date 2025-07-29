export async function uploadAttachmentToStory(projectId, userStoryId, file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('project_id', projectId);
  formData.append('user_story_id', userStoryId);

  try {
    const res = await fetch('http://localhost:5000/upload-attachment', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Upload failed');

    return { success: true, message: data.message };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
