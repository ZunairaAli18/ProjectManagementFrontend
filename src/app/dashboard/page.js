'use client';
import { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import ProjectCard from '../components/ProjectCard'
import { getAllProjects } from '../../lib/api/projects';
import Header from '../components/Header';
import AddProjectModal from '../components/AddProjectModal';


export default function DashBoard() {
  const [projects, setProjects] = useState([]);
  const [showModal,setShowModal]=useState(false);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err.message);
        alert('Could not load projects. Please try again.');
      }
    };

    fetchProjects();
  }, []);
  const handleSaveProject = async (newProject) => {
   
  };
  return (
    <>
      <div className="flex relative ">
        <SideBar />
        <div className={`flex-1 p-6 bg-[#FFE6E1] min-h-screen transition duration-300 ${showModal ? 'blur-sm' : ''}`}>
          <Header onAddProjectClick={() => setShowModal(true)} />
          {/* <UserHeader/> */}
          {/* <h1 className="text-3xl font-bold text-black mb-6">All Projects</h1> */}
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>

      {showModal && (
        <AddProjectModal onClose={() => setShowModal(false)} onSave={handleSaveProject} />
      )}
    </>
    
  );
}
