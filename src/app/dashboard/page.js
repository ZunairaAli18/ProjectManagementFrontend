
'use client';
import SideBar from '../components/SideBar';

export default function DashBoard() {
  return (
    <div className="flex">
      <SideBar />
      <div className="p-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {/* You can add more dashboard content here later */}
      </div>
    </div>
  );
}

