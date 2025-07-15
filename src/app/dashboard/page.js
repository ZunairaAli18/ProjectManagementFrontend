'use client';

import { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import ProjectCard from '../components/ProjectCard';
import Header from '../components/Header';
import AddProjectModal from '../components/AddProjectModal';
import AddUserModal from '../components/AddUserModal';
import MembersPanel from '../components/MembersPanel'; // ✅ Import

export default function DashBoard() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showMembersPanel, setShowMembersPanel] = useState(false); // ✅
  const [selectedProjectId, setSelectedProjectId] = useState(null); // ✅

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Dummy test data (unchanged)
        const data = [
          {
            project_id: 1,
            title: "Project Management System",
            created_by: "Ali Raza",
            created_at: "2025-07-10T10:30:00Z",
            status: "In Progress",
            deadline: "2025-08-15",
          },
          {
            project_id: 2,
            title: "Website Redesign",
            created_by: "Sarah Khan",
            created_at: "2025-06-22T14:00:00Z",
            status: "Completed",
            deadline: "2025-07-05",
          },
          {
            project_id: 3,
            title: "Mobile App Launch",
            created_by: "Ahmed Faraz",
            created_at: "2025-06-01T08:15:00Z",
            status: "Not Started",
            deadline: "2025-08-01",
          },
          {
            project_id: 4,
            title: "Employee Payroll System",
            created_by: "Muhammad Hadi",
            created_at: "2025-08-02T09:17:00Z",
            status: "Paused",
            deadline: "2025-09-20",
          },
        ];
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err.message);
        alert('Could not load projects. Please try again.');
      }
    };

    fetchProjects();
  }, []);
  const handleViewMembers = (projectId) => {
    setSelectedProjectId(projectId);
    setShowMembersModal(true);
  };

  const closeMembersModal = () => {
    setShowMembersModal(false);
    setSelectedProjectId(null);
  };

  const handleSaveProject = async (newProject) => {
    // setProjects([...projects, newProject]);
  };

  const handleAssignMemberClick = (projectId) => {
    setSelectedProjectId(projectId);
    setShowMembersPanel(true);
  };

  return (
    <>
      <div className="flex relative">
        <SideBar />

        <div className={`flex-1 p-6 bg-[#FFE6E1] min-h-screen transition duration-300 ${(showModal || showUserModal || showMembersPanel) ? 'blur-sm' : ''}`}>
          <Header onAddProjectClick={() => setShowModal(true)} />
          <div className="h-[calc(100vh-120px)] overflow-y-auto pr-2">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                onAssignMemberClick={handleAssignMemberClick} // ✅ pass click handler
              />
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <AddProjectModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveProject}
        />
      )}

      {showUserModal && (
        <AddUserModal onClose={() => setShowUserModal(false)} />
      )}

      {showMembersPanel && (
        <MembersPanel
          projectId={selectedProjectId}
          onClose={() => setShowMembersPanel(false)}
        />
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
