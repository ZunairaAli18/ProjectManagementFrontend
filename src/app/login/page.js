
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../components/NavBar';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');
        router.push('/dashboard');
      } else {
        alert(data.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Server error. Please try again later.');
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-r from-orange-100 to-pink-200 font-sans">
      <NavBar />

      {/* Center the card */}
      <div className="flex justify-center items-center mt-30 px-4">
        <div className="w-full max-w-sm bg-[#F6F6F6] p-8 rounded-xl shadow-lg">
          <h2 className="text-7xl font-bold text-blue-800 mb-6 text-center">Login</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className='mb-6'> 
              <label className="block mb-2 font-bold text-2xl">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
                className="w-full bg-blue-100 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              />
            </div>

            <div className='mb-6'>
              <label className="block mb-2 font-bold text-2xl">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full bg-blue-100 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              />
            </div>

            <button
              type="submit"
              className="mt-3 h-[60px] w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-xl hover:bg-blue-700 transition text-2xl"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-lg font-medium text-gray-700">
            New user?{' '}
            <span
              className="text-blue-600 hover:underline font-semibold"
              onClick={() => router.push('/signup')}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
