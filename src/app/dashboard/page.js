'use client';

import { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import ProjectCard from '../components/ProjectCard';
import Header from '../components/Header';
import AddProjectModal from '../components/AddProjectModal';
import AddUserModal from '../components/AddUserModal';
import SingleProjectMembersPanel from '../components/SingleProjectMembersPanel'; // Import member panel
import { getAllProjects, getProjectsCreatedByEmail ,getAllMyProjectsByEmail} from '@/lib/api/projects';
import { useSearchParams } from 'next/navigation';
import MembersPanel from '../components/MembersPanel';
import ProjectAttachmentsModal from '../components/ProjectAttachments';
import { fetchProjectAttachments } from '@/lib/api/fetchProjectAttachments';


export default function DashBoard() {
  const SearchParams = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [showModal,setShowModal]=useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
   const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [assignProjectId, setAssignProjectId] = useState(null);
const [showAssignPanel, setShowAssignPanel] = useState(false);
const [attachments, setAttachments] = useState([]);
const [showAttachmentsModal, setShowAttachmentsModal] = useState(false);
const [selectedProjectTitle, setSelectedProjectTitle] = useState('');



 
 useEffect(() => {
  const fetchProjects = async () => {
    const view = SearchParams.get('view'); // 'created', 'my-projects', or undefined
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user?.[2];
    const statusMap = {
      1: "Paused",
      2: "Yet to Start",
      3: "In Progress",
      4: "Completed"
    };

    if (!email) {
      alert("User email not found");
      return;
    }

    try {
      let data = [];
     console.log(email)
      if (view === 'created') {
        data = await getProjectsCreatedByEmail(email);
      } else if (view === 'myprojects') {
        data = await getAllMyProjectsByEmail(email); // <-- this is the new API you built
      } else {
        data = await getAllProjects();
      }
      console.log("Fetched Projects:", data);
      // Normalize the data: enrich with local user info and convert status_id → status string
      const normalized = data.map(p => ({
        ...p,
        created_by: p.created_by || user[1],
        created_by_id: p.created_by_id || user[0],
        status: p.status || statusMap[p.status_id] || "Yet to Start"
      }));
      console.log("Normalized Projects:", normalized);
      setProjects(normalized);
      console.log('Projects loaded:', normalized);
    } catch (err) {
      console.error('Error fetching projects:', err.message);
      alert('Could not load projects. Please try again.');
    }
  };

  fetchProjects();
}, [SearchParams]);


  const handleViewMembers = (projectId) => {
    console.log(projectId)
    setSelectedProjectId(projectId);
    setShowMembersModal(true);
  };

  const closeMembersModal = () => {
    setShowMembersModal(false);
    setSelectedProjectId(null);
  };

  const handleSaveProject = async (newProject) => {
    // Logic to save project goes here
    // setProjects([...projects, newProject]);
  };

const handleEditProject = (project) => {
  setProjectToEdit(project);
  setShowModal(true);
};
const handleAssignMembers = (projectId) => {
  setAssignProjectId(projectId);
  setShowAssignPanel(true);
};
const handleAttachmentFetch = async (project) => {
  try {
    const files = await fetchProjectAttachments(project.project_id);
    setAttachments(files);
    setSelectedProjectTitle(project.title);
    setShowAttachmentsModal(true);
  } catch (err) {
    console.error("Error loading attachments:", err.message);
    alert("Failed to load attachments");
  }
};
const closeAssignPanel = () => {
  setAssignProjectId(null);
  setShowAssignPanel(false);
};



  return (
    <>
      <div className="flex relative">
        {/* Sidebar */}
        <SideBar />

        {/* Main content area */}
        <div className={`flex-1 p-6 bg-[#FFE6E1] min-h-screen transition duration-300 ${showModal ? 'blur-sm' : ''}`}>
          {/* Header */}
          <Header onAddProjectClick={() => setShowModal(true)} onAddUserClick={()=>setShowUserModal(true)}/>
          <div className="h-[calc(100vh-120px)] overflow-y-auto pr-2">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} onViewMembers={handleViewMembers} onEdit={() => handleEditProject(project)} onAssignMembers={handleAssignMembers} onAttachmentFetch={handleAttachmentFetch} />
            ))}
          </div>
        </div>
      </div>
     
      {/* Modal for Add Project */}
      {showModal && (
        <AddProjectModal
          onClose={() => {
      setShowModal(false);
      setProjectToEdit(null); // clear edit state
    }}
          onSave={handleSaveProject}
              projectToEdit={projectToEdit}
        />
      )}
      {showUserModal && (
          <AddUserModal onClose={() => setShowUserModal(false)} />
      )}
      {/* Members Modal */}
      {showMembersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          {/* <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-5xl max-h-[90vh] overflow-y-auto p-6 relative"> */}
            <button
              onClick={closeMembersModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              ×
            </button>
            <SingleProjectMembersPanel projectId={selectedProjectId} />
          {/* </div> */}
        </div>
      )}
      {showAssignPanel && (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
  {/* <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-5xl max-h-[90vh] overflow-y-auto p-6 relative"> */}
    <button
      onClick={closeAssignPanel}
      className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
    >
      ×
    </button>
    
    <MembersPanel projectId={assignProjectId} />
  {/* </div> */}
</div>
)}
{showAttachmentsModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
    <ProjectAttachmentsModal
      projectTitle={selectedProjectTitle}
      attachments={attachments}
      onClose={() => setShowAttachmentsModal(false)}
    />
  </div>
)}
    </>
  );
}
