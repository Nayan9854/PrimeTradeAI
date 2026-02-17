import React, { useState } from 'react';
import client from '@/lib/api-client';
import { Task } from '@/types';

interface TaskCardProps {
  task: Task;
  onTaskDeleted: (taskId: string) => void;
  onTaskUpdated: (task: Task) => void;
}

export default function TaskCard({ task, onTaskDeleted, onTaskUpdated }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status as 'pending' | 'in-progress' | 'completed',
    priority: task.priority as 'low' | 'medium' | 'high',
  });
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    setLoading(true);
    try {
      await client.delete(`/tasks/${task.id}`);
      onTaskDeleted(task.id);
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await client.put(`/tasks/${task.id}`, formData);
      onTaskUpdated(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    pending: 'bg-yellow-900/40 text-yellow-300 border border-yellow-700',
    'in-progress': 'bg-blue-900/40 text-blue-300 border border-blue-700',
    completed: 'bg-green-900/40 text-green-300 border border-green-700',
  };

  const priorityColors = {
    low: 'text-green-400',
    medium: 'text-yellow-400',
    high: 'text-red-400',
  };

  return (
    <div className="card">
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="form-input"
          />

          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="form-input resize-vertical"
            rows={2}
          ></textarea>

          <div className="grid grid-cols-2 gap-4">
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="form-input"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="form-input"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex space-x-2">
            <button onClick={handleUpdate} disabled={loading} className="btn-primary">
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button onClick={() => setIsEditing(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-100">{task.title}</h3>
              <p className="text-slate-400 mt-1">{task.description}</p>
            </div>
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Edit
              </button>
              <button onClick={handleDelete} disabled={loading} className="text-red-400 hover:text-red-300 font-medium transition-colors">
                Delete
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700">
            <div className="space-x-2">
              <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium ${statusColors[task.status as keyof typeof statusColors]}`}>
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </span>
              <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-semibold bg-slate-700/50 border border-slate-600 ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                {task.priority.toUpperCase()}
              </span>
            </div>
            {task.dueDate && (
              <span className="text-sm text-slate-500">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
