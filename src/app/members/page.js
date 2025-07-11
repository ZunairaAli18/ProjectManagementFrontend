'use Client';

import MembersPanel from "../components/MembersPanel";
import SideBar from "../components/SideBar";

export default function Members(){
    return(
        <div className="flex">
            <SideBar/>
            <MembersPanel/>
        </div>
    );
}