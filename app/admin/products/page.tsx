'use client';

import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';
import ProductCard from '@/app/components/Products/Card';
import ProductModal from '@/app/components/Products/ProductsModal';

interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  category_id: number | null;
  supplier_id: number | null;
  quantity: number;
  threshold: number;
  icon_name: string;
}

interface Category {
  id: number;
  name: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    sku: '',
    description: '',
    category_id: null as number | null,
    icon_name: 'Box',
    quantity: 0,
    threshold: 5,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) console.error(error.message);
      else setProducts(data);
    };

    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('id, name');
      if (!error && data) {
        setCategories(data);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleAddProduct = async () => {
    const { name, sku, quantity, threshold } = form;
    if (!name || !sku || quantity == null || threshold == null) {
      return alert('Please fill in all required fields.');
    }

    const { data, error } = await supabase.from('products').insert([form]).select();
    if (error) return alert(error.message);
    setProducts((prev) => [...prev, ...(data || [])]);
    setForm({
      name: '',
      sku: '',
      description: '',
      category_id: null,
      icon_name: 'Box',
      quantity: 0,
      threshold: 5,
    });
    setModalOpen(false);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search products..."
            className="border rounded px-3 py-2 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select className="border rounded px-3 py-2 text-sm">
            <option>All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id}>{cat.name}</option>
            ))}
          </select>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
          >
            + Add Product
          </button>
        </div>
      </div>

      <div className="border rounded overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category ID</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Low Stock Alert</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-8">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <ProductModal
          form={form}
          setForm={setForm}
          categories={categories}
          onClose={() => setModalOpen(false)}
          onSave={handleAddProduct}
        />
      )}
    </div>
  );
}
