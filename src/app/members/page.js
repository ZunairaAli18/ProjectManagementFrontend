'use Client';

import MembersPanel from "../components/MembersPanel";
import SideBar from "../components/SideBar";

export default function Members(){
    return(
        <div className="flex bg-[#FFE6E1]">
            <SideBar/>
            <MembersPanel/>
        </div>
    );
}