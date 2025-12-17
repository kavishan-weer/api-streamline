import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, Save, X } from 'lucide-react';

// CONFIGURATION
const API_URL = 'https://apistreamline.com/mock/YOUR_PROJECT_ID/users';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });

  // 1. GET - Fetch Users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setLoading(false);
    }
  };

  // 2. POST - Create User
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const newUser = await res.json();
      setUsers([...users, newUser]);
      setFormData({ name: '', email: '', role: '' }); // Reset form
    } catch (err) {
      console.error('Failed to create user', err);
    }
  };

  // 3. DELETE - Remove User
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  // 4. PATCH - Update User
  const handleUpdate = async (id, updates) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const updatedUser = await res.json();
      setUsers(users.map(u => (u.id === id ? updatedUser : u)));
      setEditingId(null);
    } catch (err) {
      console.error('Failed to update user', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">API Streamline Demo</h1>
          <p className="text-gray-600">React Client Integration Example</p>
        </header>

        {/* Create User Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Plus size={20} className="text-indigo-600" /> Add New User
          </h2>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              placeholder="Name"
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Role"
              className="w-40 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.role}
              onChange={e => setFormData({...formData, role: e.target.value})}
              required
            />
            <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
              Add
            </button>
          </form>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold">Users List ({users.length})</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading users...</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-sm">
                <tr>
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                    {editingId === user.id ? (
                      // Editing Row
                      <>
                        <td className="p-4"><input defaultValue={user.name} id={`name-${user.id}`} className="w-full border rounded px-2 py-1" /></td>
                        <td className="p-4"><input defaultValue={user.email} id={`email-${user.id}`} className="w-full border rounded px-2 py-1" /></td>
                        <td className="p-4"><input defaultValue={user.role} id={`role-${user.id}`} className="w-full border rounded px-2 py-1" /></td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleUpdate(user.id, {
                                name: document.getElementById(`name-${user.id}`).value,
                                email: document.getElementById(`email-${user.id}`).value,
                                role: document.getElementById(`role-${user.id}`).value,
                              })}
                              className="text-green-600 hover:bg-green-50 p-1 rounded"
                            >
                              <Save size={18} />
                            </button>
                            <button onClick={() => setEditingId(null)} className="text-gray-400 hover:bg-gray-100 p-1 rounded">
                              <X size={18} />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      // Display Row
                      <>
                        <td className="p-4 font-medium text-gray-900">{user.name}</td>
                        <td className="p-4 text-gray-500">{user.email}</td>
                        <td className="p-4">
                          <span className="inline-block px-2 py-1 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-full">
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setEditingId(user.id)} className="text-indigo-600 hover:bg-indigo-50 p-1 rounded">
                              <Edit2 size={18} />
                            </button>
                            <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
