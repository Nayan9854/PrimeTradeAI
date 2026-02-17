import React, { useState } from 'react';
import client from '@/lib/api-client';
import { Task } from '@/types';
import TaskCard from '@/components/TaskCard';

interface TaskListProps {
  tasks: Task[];
  onTaskDeleted: (taskId: string) => void;
  onTaskUpdated: (task: Task) => void;
}

export default function TaskList({ tasks, onTaskDeleted, onTaskUpdated }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 text-lg">📭 No tasks found yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onTaskDeleted={onTaskDeleted}
          onTaskUpdated={onTaskUpdated}
        />
      ))}
    </div>
  );
}
