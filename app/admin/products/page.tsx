'use client';

import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';

export default function ProductsPage() {
  const [products, setProducts] = useState<{ id: string; name: string; stock: number }[]>([]);
  const [name, setName] = useState('');
  const [stock, setStock] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (data) setProducts(data);
      if (error) console.error(error.message);
    };

    fetchProducts();
  }, []);

  const addProduct = async () => {
    if (!name) return;
    const { data, error } = await supabase.from('products').insert([{ name, stock }]).select();
    if (data) setProducts([data[0], ...products]);
    if (error) alert(error.message);
    setName('');
    setStock(0);
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) setProducts(products.filter((p) => p.id !== id));
    if (error) alert(error.message);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Ürünler</h1>

      <div className="flex gap-2">
        <input
          placeholder="Ürün adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="border p-2 rounded w-24"
        />
        <button onClick={addProduct} className="bg-blue-600 text-white px-4 rounded">
          Ekle
        </button>
      </div>

      <ul className="space-y-2">
        {products.map((p) => (
          <li
            key={p.id}
            className={`bg-white p-4 rounded shadow flex justify-between ${p.stock <= 5 ? 'border-l-4 border-red-500' : ''}`}
          >
            <span>
              <strong>{p.name}</strong> — {p.stock} adet
              {p.stock <= 5 && <span className="text-red-600 ml-2 text-sm">(Stok az)</span>}
            </span>
            <button
              onClick={() => deleteProduct(p.id)}
              className="text-red-600 hover:underline"
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
