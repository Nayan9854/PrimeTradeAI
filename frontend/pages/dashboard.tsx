import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import client from '@/lib/api-client';
import { useAuthStore } from '@/lib/store';
import { User, Task } from '@/types';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';

export default function Dashboard() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  const [profile, setProfile] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const token = Cookie.get('auth_token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchProfile();
    fetchTasks();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await client.get('/auth/profile');
      setProfile(response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await client.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Cookie.remove('auth_token');
    logout();
    router.push('/login');
  };

  const handleTaskCreated = (newTask: Task) => {
    setTasks([newTask, ...tasks]);
    setShowForm(false);
  };

  const handleTaskDeleted = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchFilter = filter === 'all' || task.status === filter;
    const matchSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-slate-400 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="bg-slate-800 border-b border-slate-700 shadow-lg sticky top-0 z-50">
        <div className="container-custom py-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Dashboard</h1>
            <p className="text-slate-400 mt-1">Namaste, <span className="text-blue-400 font-semibold">{profile?.name}</span>! 🙏</p>
          </div>
          <button onClick={handleLogout} className="btn-danger px-6 py-2">
            Logout
          </button>
        </div>
      </header>

      <main className="container-custom py-8 space-y-8">
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">👤</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Profile Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
              <p className="text-slate-100 text-lg">{profile?.name}</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
              <p className="text-slate-100 text-lg">{profile?.email}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-100">My Tasks</h2>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary"
            >
              {showForm ? '✕ Cancel' : '+ New Task'}
            </button>
          </div>

          {showForm && (
            <div className="mb-8 p-6 bg-slate-700/30 border border-slate-600 rounded-lg">
              <TaskForm onTaskCreated={handleTaskCreated} onCancel={() => setShowForm(false)} />
            </div>
          )}

          <div className="mb-8 space-y-4">
            <input
              type="text"
              placeholder="🔍 Search tasks by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
            />

            <div className="flex flex-wrap gap-2">
              {['all', 'pending', 'in-progress', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    filter === status
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {status === 'all' ? '📋 All' : status === 'pending' ? '⏳ Pending' : status === 'in-progress' ? '🚀 In Progress' : '✅ Completed'}
                </button>
              ))}
            </div>
          </div>

          <TaskList
            tasks={filteredTasks}
            onTaskDeleted={handleTaskDeleted}
            onTaskUpdated={handleTaskUpdated}
          />
        </div>
      </main>
    </div>
  );
}
