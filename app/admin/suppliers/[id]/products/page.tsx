// ✅ /app/admin/suppliers/[id]/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import supabase from '@/lib/supabase';

interface Product {
  id: string;
  name: string;
  stock: number;
  supplier_id: string;
}

interface Supplier {
  id: string;
  company: string;
}

export default function SupplierProductsPage() {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [stock, setStock] = useState(0);
  const [supplier, setSupplier] = useState<Supplier | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [productRes, supplierRes] = await Promise.all([
        supabase.from('products').select('*').eq('supplier_id', id),
        supabase.from('suppliers').select('id, company').eq('id', id).single(),
      ]);

      if (productRes.data) setProducts(productRes.data);
      if (productRes.error) console.error(productRes.error.message);

      if (supplierRes.data) setSupplier(supplierRes.data);
      if (supplierRes.error) console.error(supplierRes.error.message);
    };

    if (id) fetchData();
  }, [id]);

  const handleAddProduct = async () => {
    if (!name || !id) return;
    const { data, error } = await supabase
      .from('products')
      .insert([{ name, stock, supplier_id: id }])
      .select();

    if (data) setProducts((prev) => [...prev, data[0]]);
    if (error) alert(error.message);
    setName('');
    setStock(0);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Products of {supplier ? supplier.company : 'Supplier'}
      </h1>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <h2 className="font-semibold">Add New Product</h2>
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name"
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            placeholder="Stock"
            className="border p-2 rounded w-24"
          />
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>

      <ul className="space-y-2">
        {products.length === 0 ? (
          <p className="text-sm text-gray-500">No products found for this supplier.</p>
        ) : (
          products.map((p) => (
            <li key={p.id} className="bg-white p-4 rounded shadow flex justify-between">
              <span>
                <strong>{p.name}</strong> — {p.stock} in stock
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
