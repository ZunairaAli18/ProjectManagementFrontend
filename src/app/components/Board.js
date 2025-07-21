'use client';
import { useEffect, useState } from 'react';
import Column from './Column';

export default function Board({ projectId }) {
  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    if (!projectId) return;

    const fetchUserStories = async () => {
      try {
        console.log(projectId)
        const response = await fetch('http://localhost:5000/user-stories/all', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ project_id: projectId }),
        });

        const data = await response.json();
        if (data.Success) {
          setUserStories(data.stories || []);
        } else {
          console.error('Failed to fetch user stories:', data.error);
        }
      } catch (error) {
        console.error('Error fetching user stories:', error);
      }
    };

    fetchUserStories();
  }, [projectId]);

  const updateStoryStatus = (storyIndex, newStatusId) => {
    const updatedStories = [...userStories];
    const story = updatedStories[storyIndex];
    if (!story) return;

    story.status_id = newStatusId;

    // Update backend here if needed
    fetch(`http://localhost:5000/user-story/${story.story_id}/update-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  status_id: newStatusId }),
    }).catch(console.error);

    setUserStories(updatedStories);
  };

  const handleDragStart = (story_id) => {
  window.draggedStoryId = story_id;
};


  const handleDrop = (newStatusId) => {
  const storyId = window.draggedStoryId;
  const storyIndex = userStories.findIndex((s) => s.story_id === storyId);
  if (storyIndex !== -1) {
    updateStoryStatus(storyIndex, newStatusId);
  }
};

 const onSaveStory = async (newStory) => {
  try {
    const response = await fetch('http://localhost:5000/user-stories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStory),
    });

    if (!response.ok) {
      throw new Error('Failed to save user story');
    }

    const savedStory = await response.json();
    setUserStories((prev) => [...prev, savedStory]);
  } catch (error) {
    console.error('Error saving user story:', error);
    // Optional: show error to user
  }
};


  const onUpdateStory = (updatedStory) => {
    setUserStories((prev) =>
      prev.map((s) => (s.story_id === updatedStory.story_id ? updatedStory : s))
    );
  };

  const toDo = userStories.filter((s) => s.status_id === 2);
  const inProgress = userStories.filter((s) => s.status_id === 3);
  const completed = userStories.filter((s) => s.status_id === 4);

  return (
    <div className="flex space-x-4 p-4">
      <Column
        title="To Do"
        tasks={toDo}
        onDragStart={handleDragStart}
        onDrop={() => handleDrop(2)}
        projectId={projectId}
        onSaveStory={onSaveStory}
        onUpdateStory={onUpdateStory}
      />
      <Column
        title="In Progress"
        tasks={inProgress}
        onDragStart={handleDragStart}
        onDrop={() => handleDrop(3)}
        projectId={projectId}
        onSaveStory={onSaveStory}
        onUpdateStory={onUpdateStory}
      />
      <Column
        title="Completed"
        tasks={completed}
        onDragStart={handleDragStart}
        onDrop={() => handleDrop(4)}
        projectId={projectId}
        onSaveStory={onSaveStory}
        onUpdateStory={onUpdateStory}
      />
    </div>
  );
}
