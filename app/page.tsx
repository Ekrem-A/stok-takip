import Navbar from '@/app/components/Navbar';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Gözlükçü Stok Takip Sistemine Hoş Geldiniz</h1>
        <p className="text-lg">Ürünleri yönetmek için giriş yapın veya kayıt olun.</p>
      </main>
    </>
  );
}
