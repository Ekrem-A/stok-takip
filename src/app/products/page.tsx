// app/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import supabase from '@supabase/supabase-js';

type Product = {
  id: string;
  name: string;
  stock: number;
  created_at: string;
};

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [stock, setStock] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleAddProduct = async () => {
    if (!name || stock <= 0) return alert('Geçerli değerler girin');
    setLoading(true);
    await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify({ name, stock }),
    });
    setName('');
    setStock(0);
    await fetchProducts();
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });
    await fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ürün Listesi</h1>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Ürün adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          type="number"
          placeholder="Stok"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="border px-2 py-1 rounded w-24"
        />
        <button
          onClick={handleAddProduct}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Ekleniyor...' : 'Ekle'}
        </button>
      </div>

      <ul className="space-y-2">
        {products.map((p) => (
          <li
            key={p.id}
            className="flex items-center justify-between border p-2 rounded"
          >
            <div>
              <strong>{p.name}</strong> — {p.stock} adet
            </div>
            <button
              onClick={() => handleDelete(p.id)}
              className="text-red-600 hover:underline"
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
