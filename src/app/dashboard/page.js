'use client';
import { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import ProjectCard from '../components/ProjectCard'
import { getAllProjects } from '../../lib/api/projects';
import Header from '../components/Header';

export default function DashBoard() {
  const [projects, setProjects] = useState([]);

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

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <Header/>
        {/* <h1 className="text-3xl font-bold text-black mb-6">All Projects</h1>
         */}
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
