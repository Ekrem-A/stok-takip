'use client';

import { useState } from 'react';
import supabase from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
    if (error.message === 'Email not confirmed') {
      return alert('Lütfen e-posta adresinizi doğrulayın. Mail kutunuzu kontrol edin.');
    }
    return alert(error.message); // Diğer hatalar için
  }
    router.push('/products');
  };

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-xl font-bold">Giriş Yap</h1>
      <input
        type="email"
        placeholder="E-posta"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
      />
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 w-full">
        Giriş Yap
      </button>
    </div>
  );
}
