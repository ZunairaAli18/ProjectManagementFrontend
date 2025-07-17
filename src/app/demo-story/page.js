import UserStoryDetails from "../components/UserStoryDetails";

export default function DemoStoryPage() {
  const demoStory = {
    story_id: 101,
    title: "Login Page Story",
    description: "Implement login functionality using OAuth2.",
    project_title: "Authentication Module",     // joined title
    status_name: "In Progress",                 // joined name
    estimated_time: "3 hours",
    created_by: 14,
    created_at: "2025-07-15T06:00:00.000Z",
    modified_at: "2025-07-16T09:00:00.000Z",
  };

  return <UserStoryDetails story={demoStory} />;
}
