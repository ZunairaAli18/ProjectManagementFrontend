export async function getAllProjects() {
  try {
    const response = await fetch('http://localhost:5000/projects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch projects');
    }

    return result.data;
  } catch (error) {
    console.error('Fetch Projects Error:', error.message);
    throw error;
  }
}
