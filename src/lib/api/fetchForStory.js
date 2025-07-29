export async function fetchForStory(projectId) {
  try {
    const res = await fetch(`http://localhost:5000/project/${projectId}/userstory/attachments`, {
      method: 'GET',
    });

    if (!res.ok) throw new Error('Failed to fetch user story attachments');

    const data = await res.json();
    return data.attachments || [];
  } catch (error) {
    console.error('Error fetching user story attachments:', error);
    return [];
  }
}