import React, { useState } from 'react';
import client from '@/lib/api-client';
import { Task, UpdateTaskPayload } from '@/types';

interface TaskFormProps {
  onTaskCreated: (task: Task) => void;
  onCancel: () => void;
}

export default function TaskForm({ onTaskCreated, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.title) {
      setError('Title is required');
      setLoading(false);
      return;
    }

    try {
      const response = await client.post('/tasks', {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        dueDate: formData.dueDate || undefined,
      });

      onTaskCreated(response.data);
      setFormData({ title: '', description: '', priority: 'medium', dueDate: '' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-700/50 border border-slate-600 p-6 rounded-lg mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="Task title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-input"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-input resize-vertical"
          placeholder="Task description"
          rows={3}
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      {error && <div className="p-4 bg-red-900/30 border border-red-700/50 text-red-400 rounded-lg">{error}</div>}

      <div className="flex space-x-2">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Creating...' : 'Create Task'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
}
