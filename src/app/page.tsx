import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {

   const router = useRouter();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      // Token yoksa kullanıcıyı login sayfasına yönlendir
      router.push('/login');
    }
  }, [token, router]);

  if (!token) {
    // Eğer token yoksa, sayfa içeriğini göstermeyin.
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <h1>Korunan Sayfaya Hoş Geldiniz!</h1>
      <p>Bu sayfa yalnızca giriş yapan kullanıcılar için erişilebilir.</p>
    </div>
  );
};

