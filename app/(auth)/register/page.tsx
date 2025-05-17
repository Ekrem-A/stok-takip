'use client';

import { useState } from 'react';
import  supabase  from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push('/login');
    }

    setLoading(false);
  };

  return (
    <main className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">Kayıt Ol</h1>

      <input
        type="email"
        placeholder="E-posta"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full rounded"
      />

      {error && <p className="text-red-600">{error}</p>}

      <button
        onClick={handleRegister}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
      >
        {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
      </button>
    </main>
  );
}
