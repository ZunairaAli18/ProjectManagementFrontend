'use client';

import { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import ProjectCard from '../components/ProjectCard';
import Header from '../components/Header';
import AddProjectModal from '../components/AddProjectModal';
import AddUserModal from '../components/AddUserModal';
import SingleProjectMembersPanel from '../components/SingleProjectMembersPanel'; // Import member panel
import { getAllProjects } from '@/lib/api/projects';


export default function DashBoard() {
  const [projects, setProjects] = useState([]);
  const [showModal,setShowModal]=useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
   const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
 useEffect(() => {
  const fetchProjects = async () => {
    try {
      const data = await getAllProjects(); // Fetch from backend
      setProjects(data);
      console.log("projects")
      console.log(data)
    } catch (err) {
      console.error('Error fetching projects:', err.message);
      alert('Could not load projects. Please try again.');
    }
  };

  fetchProjects();
}, []);
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
              <ProjectCard key={index} project={project} onViewMembers={handleViewMembers} onEdit={() => handleEditProject(project)}/>
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
          <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-5xl max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={closeMembersModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              ×
            </button>
            <SingleProjectMembersPanel projectId={selectedProjectId} />
          </div>
        </div>
      )}
    </>
  );
}
