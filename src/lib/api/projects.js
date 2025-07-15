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
    console.log(result)
    return result;
  } catch (error) {
    console.error('Fetch Projects Error:', error.message);
    throw error;
  }
}


export async function addProject(projectData) {
  try {
    const response = await fetch('http://localhost:5000/addProject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to create project');
    }

    return result;
  } catch (error) {
    console.error('Create Project Error:', error.message);
    throw error;
  }
}


// lib/api/projects.js

export async function getProjectMembers(projectId) {
  if (!projectId) {
    console.warn('No projectId provided to getProjectMembers');
    return [];
  }

  try {
    const response = await fetch(`http://localhost:5000/${projectId}/getProjectMembers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch project members');
    }

    // Format each member into an array
    const formattedMembers = result.members.map(member => ([
      member.user_id,
      member.name,
      member.email,
      member.age,
      member.gender,
      member.blood_group
    ]));

    console.log('Formatted Members:', formattedMembers);
    return formattedMembers;

  } catch (error) {
    console.error('Fetch Members Error:', error.message);
    return []; // Return empty array on failure
  }
}

