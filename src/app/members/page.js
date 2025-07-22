'use client';

import MembersPanel from "../components/MembersPanel";
import SideBar from "../components/SideBar";
import Guard from "../components/Guard"; 

export default function Members() {
  return (
    <Guard>
      <div className="flex bg-[#FFE6E1]">
        <SideBar />
        <MembersPanel />
      </div>
    </Guard>
  );
}
