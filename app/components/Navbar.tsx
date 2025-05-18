'use client';

import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // İlk yüklemede oturumu getir
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Oturum değişikliklerini dinle
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="flex justify-between p-4 bg-gray-100">
      <h1 className="text-lg font-bold text-blue-600">Gözlükçü Takip</h1>
      <div className="space-x-4 text-sm text-blue-600">
        {user ? (
          <>
            <a href="/admin">Admin Paneli</a>
            <button
              onClick={handleLogout}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Çıkış
            </button>
          </>
        ) : (
          <>
            <a href="/login">Giriş Yap</a>
            <a href="/register" className="ml-4">
              Kayıt Ol
            </a>
          </>
        )}
      </div>
    </header>
  );
}
