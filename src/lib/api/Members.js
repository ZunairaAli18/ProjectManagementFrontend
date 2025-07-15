// utils/api.js


export async function fetchMembers() {
  try {
    const res = await fetch('http://localhost:5000/usersList');

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const data = await res.json();
    console.log(data)
    console.log('hello');
    return data;

  } catch (err) {
    console.error("Fetch error:", err);
    return []; 
  }
}
