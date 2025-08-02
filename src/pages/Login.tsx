import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('token', data.token);
      navigate('/'); // Redirect to home or admin page
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/90 to-indigo-900">
      <form onSubmit={handleSubmit} className="bg-white/10 p-8 rounded-lg shadow-lg w-full max-w-sm space-y-6">
        <h2 className="text-2xl font-bold text-center text-white mb-4">Login</h2>
        {error && <div className="text-red-400 text-center">{error}</div>}
        <div>
          <label className="block text-white mb-1">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-white mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;