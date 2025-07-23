'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';

export default function SideBar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); 
    router.push('/login');
  };

  return (
    <div className="w-72 bg-black h-screen shadow-md flex flex-col justify-between">
      {/* Top Section with Logo */}
      <div>
        <div className="flex items-center justify-start px-6 py-5 border-b border-gray-300">
          <div className="w-10 h-10 bg-blue-500 rounded-full mr-3"></div> {/* Logo placeholder */}
          <h1 className="text-xl font-bold text-gray-100">Projectify</h1>
        </div>

        {/* Sidebar Buttons */}
        <div className="flex flex-col px-6 mt-8 divide-y divide-gray-300 text-lg text-gray-100 font-medium">
          <Link href="/dashboard" className="py-4 hover:text-blue-300">
            Dashboard
          </Link>
          <Link href="/dashboard?view=myprojects" className="py-4 hover:text-blue-300">
            My Projects
          </Link>
          <Link href="/dashboard?view=created" className="py-4 hover:text-blue-300">
            My Created Projects
          </Link>
          <Link href="/members" className="py-4 hover:text-blue-300">
            Members
          </Link>
          <Link href="/myprofile" className="py-4 hover:text-blue-300">
            My Profile
          </Link>
          <Link href="/settings" className="py-4 hover:text-blue-300">
            Settings
          </Link>
        </div>
      </div>

      {/* Bottom Logout */}
      <div className="px-6 py-4 border-t border-gray-300">
        <button
          onClick={handleLogout}
          className="block text-lg text-red-400 hover:text-red-300 font-medium w-full text-left"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
