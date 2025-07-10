

'use client';
import SideBar from '../components/SideBar';
import ProjectCard from '../components/ProjectCard'; 

export default function DashBoard() {

  const projects = [
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
  ];

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-black mb-6">All Projects</h1>
        
        {/* Loop through projects and render ProjectCard */}
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}

