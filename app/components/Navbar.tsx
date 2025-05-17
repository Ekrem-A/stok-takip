'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import  supabase  from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setLoggedIn(!!data.user);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <nav className="flex justify-between items-center bg-gray-100 p-4 shadow-sm">
      <Link href="/" className="text-xl font-bold text-blue-700">
        Gözlükçü Takip
      </Link>

      <div className="space-x-4">
        {loggedIn ? (
          <>
            <Link href="/admin" className="text-blue-600 hover:underline">
              Admin Paneli
            </Link>
            <button onClick={handleLogout} className="text-red-600 hover:underline">
              Çıkış
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-blue-600 hover:underline">
              Giriş Yap
            </Link>
            <Link href="/register" className="text-blue-600 hover:underline">
              Kayıt Ol
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
