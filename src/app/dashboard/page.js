'use client';

import { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import ProjectCard from '../components/ProjectCard';
import Header from '../components/Header';
import AddProjectModal from '../components/AddProjectModal';
import AddUserModal from '../components/AddUserModal';


export default function DashBoard() {
  const [projects, setProjects] = useState([]);
  const [showModal,setShowModal]=useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Dummy test data
        const data = [
          {
            title: "Project Management System",
            created_by: "Ali Raza",
            created_at: "2025-07-10T10:30:00Z",
            status: "In Progress",
            deadline: "2025-08-15",
          },
          {
            title: "Website Redesign",
            created_by: "Sarah Khan",
            created_at: "2025-06-22T14:00:00Z",
            status: "Completed",
            deadline: "2025-07-05",
          },
          {
            title: "Mobile App Launch",
            created_by: "Ahmed Faraz",
            created_at: "2025-06-01T08:15:00Z",
            status: "Not Started",
            deadline: "2025-08-01",
          },
          {
            title: "Employee Payroll System",
            created_by: "Muhammad Hadi",
            created_at: "2025-08-02T09:17:00Z",
            status: "Paused",
            deadline: "2025-09-20",
          },
        ];

        setProjects(data);

        // When backend ready:
        // const data = await getAllProjects();
        // setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err.message);
        alert('Could not load projects. Please try again.');
      }
    };

    fetchProjects();
  }, []);

  const handleSaveProject = async (newProject) => {
    // Logic to save project goes here
    // setProjects([...projects, newProject]);
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
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </div>
     
      {/* Modal for Add Project */}
      {showModal && (
        <AddProjectModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveProject}
        />
      )}
      {showUserModal && (
          <AddUserModal onClose={() => setShowUserModal(false)} />
      )}
    </>
  );
}
