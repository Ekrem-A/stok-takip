'use client';

import { useState } from 'react';
import supabase from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push('/admin'); // Giriş başarılıysa yönlendirme
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/img/LoginBackground.jpg')" }}
    >
      <form
        onSubmit={handleLogin}
        className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md"
        style={{ backgroundImage: "url('/img/LoginBackground.jpg')" }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>

        {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full py-3 px-4 rounded-full bg-blue-200 placeholder-gray-700 text-gray-800 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full py-3 px-4 rounded-full bg-blue-200 placeholder-gray-700 text-gray-800 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm mt-4 px-2">
          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-purple-700" />
            <span className="text-gray-600">Remember me</span>
          </label>
          <a href="#" className="text-gray-600 hover:underline">
            forgot password
          </a>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-3 mt-6 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>

        <div className="text-center text-sm mt-4">
          <a href="/register" className="text-gray-700 hover:underline">
            Create Account
          </a>
        </div>
      </form>
    </div>
  );
}
