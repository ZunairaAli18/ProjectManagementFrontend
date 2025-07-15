'use client';
import { useEffect, useState } from 'react';
import MemberProfile from './MemberProfile';
import { fetchUserProfile } from '@/lib/api/api';

export default function ProfilePanel() {
   const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsedUser = JSON.parse(stored);
        const userId = parsedUser?.[0]; // assuming [id, name, email...]

        if (userId) {
          fetchUserProfile(userId)
            .then((fetchedUser) => {
              setUser(fetchedUser);
            })
            .catch((err) => {
              console.error('Failed to fetch user from backend:', err.message);
            });
        }
      } catch (err) {
        console.error('Failed to parse user from localStorage', err);
      }
    }
  }, []);

  return (
    <div className="fixed top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[#FBF5DE] rounded-lg border ml-30 shadow-lg p-6 z-50 ">
      <MemberProfile member={user} />
    </div>
  );
}
