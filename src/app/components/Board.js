'use client';

import { useState } from 'react';
import Column from './Column';

export default function Board() {
  const [columns, setColumns] = useState({
    Backlog: [
      { title: "E-mail after registration...", tag: "Development", avatar: "/avatar1.png" },
      { title: "Find top 5 customers...", tag: "Marketing", avatar: "/avatar2.png" },
    ],
    "To Do": [
      { title: "Two-factor authentication...", tag: "Design", avatar: "/avatar3.png" },
    ],
    Done: [
      { title: "Email confirmation...", tag: "Development", avatar: "/avatar1.png" },
    ],
  });

  const [draggedTaskInfo, setDraggedTaskInfo] = useState(null);

  const handleDragStart = (columnName, taskIndex) => {
    setDraggedTaskInfo({ sourceColumn: columnName, index: taskIndex });
  };

  const handleDropTask = (taskIndex, targetColumn) => {
    if (!draggedTaskInfo) return;

    const { sourceColumn, index } = draggedTaskInfo;

    if (sourceColumn === targetColumn) return;

    const taskToMove = columns[sourceColumn][index];
    const newSourceTasks = [...columns[sourceColumn]];
    newSourceTasks.splice(index, 1);
    const newTargetTasks = [...columns[targetColumn], taskToMove];

    setColumns(prev => ({
      ...prev,
      [sourceColumn]: newSourceTasks,
      [targetColumn]: newTargetTasks,
    }));

    setDraggedTaskInfo(null);
  };

  return (
    <div className="flex justify-between px-8 py-6">
      {Object.entries(columns).map(([columnTitle, tasks]) => (
        <Column
          key={columnTitle}
          title={columnTitle}
          tasks={tasks}
          onDragStart={(index) => handleDragStart(columnTitle, index)}
          onDrop={() => handleDropTask(draggedTaskInfo?.index, columnTitle)}
        />
      ))}
    </div>
  );
}
