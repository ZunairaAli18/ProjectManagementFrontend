'use client';

import SideBar from '../components/SideBar';
import ProfilePanel from '../components/ProfilePanel';
import Guard from '../components/Guard';

export default function Members() {
  return (
    <Guard>
      <div className="flex min-h-screen">
        <SideBar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col bg-[#FFE6E1] p-6">
          
          {/* Header */}
          <div className="h-[100px] w-full px-6 py-3 bg-gray-100 shadow-md flex justify-between items-center rounded-2xl">
            <h1 className="text-5xl font-bold text-gray-800">My Profile</h1>
          </div>

          {/* Profile Panel */}
          <ProfilePanel />
        </div>
      </div>
    </Guard>
  );
}
