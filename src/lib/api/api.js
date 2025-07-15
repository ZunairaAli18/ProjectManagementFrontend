export async function createUser(form){
    try {
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        age: form.age,
        gender: form.gender,
        bloodGroup: form.bloodGroup
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Something went wrong');
    }
    
    return result;
  } catch (error) {
    throw error;
}
};

export async function loginUser(credentials) {
  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Login failed');
    }
    const userArray = [
  result.user.user_id,  // [0]
  result.user.name,     // [1]
  result.user.email,    // [2]
  result.user.role_id   // [3]
];
    console.log(userArray)
    localStorage.setItem('user', JSON.stringify(userArray));    return result;
  } catch (error) {
    throw error;
  }
}
