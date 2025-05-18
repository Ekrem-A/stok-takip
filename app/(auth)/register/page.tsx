'use client';

import { useState } from 'react';
import supabase from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data: signUpData, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      if (signUpData?.user?.id) {
        await supabase.from('profiles').insert({
          id: signUpData.user.id,
          username: username,
          role: 'User',
        });
      }
      router.push('/login');
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/img/LoginBackground.jpg')" }}
    >
      <form
        onSubmit={handleRegister}
        className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md"
        style={{ backgroundImage: "url('/img/LoginBackground.jpg')" }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-white-800">Hesap Oluşturun</h1>

        {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Kullanıcı adı"
            className="w-full py-3 px-4 rounded-full bg-blue-200 placeholder-gray-700 text-gray-800 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
            placeholder="Şifre"
            className="w-full py-3 px-4 rounded-full bg-blue-200 placeholder-gray-700 text-gray-800 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="w-full bg-blue-600 text-white py-3 mt-6 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Oluşturuluyor...' : 'Kayıt ol'}
        </button>

        <div className="text-center text-sm mt-4">
          <a href="/login" className="text-white-700 hover:underline">
            Zaten bir heap var mı? Giriş yapın
          </a>
        </div>
      </form>
    </div>
  );
}
