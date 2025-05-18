'use client';

import { useEffect, useState } from 'react';
import  supabase  from '@/lib/supabase';
import SupplierDetailsModal from './SupplierDetailsModal';
import SupplierModal from './SupplierModal';

export interface Supplier {
  id: string;
  name: string;
  contact_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  notes: string;
  status: string;
}

export default function SupplierCards() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [editMode, setEditMode] = useState(false);

  const fetchSuppliers = async () => {
    const { data } = await supabase.from('suppliers').select('*');
    setSuppliers(data || []);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suppliers.map((s) => (
          <div key={s.id} className="bg-white border rounded-lg p-6 shadow-sm relative">
            <div className="absolute top-4 right-4">
              <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">{s.status}</span>
            </div>
            <h2 className="font-bold text-lg">{s.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{s.contact_name}</p>
            <p className="text-sm text-gray-700">📞 {s.phone}</p>
            <p className="text-sm text-gray-700">✉️ {s.email}</p>
            <p className="text-sm text-gray-700">📍 {s.city}, {s.country}</p>

            <div className="flex justify-between mt-4">
              <button
                className="text-sm px-4 py-1 border rounded hover:bg-gray-100"
                onClick={() => {
                  setSelectedSupplier(s);
                  setEditMode(false);
                }}
              >
                View Details
              </button>
              <button className="text-sm text-blue-600 hover:underline">
                View Products
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedSupplier && !editMode && (
        <SupplierDetailsModal
          supplier={selectedSupplier}
          onClose={() => setSelectedSupplier(null)}
          onEdit={() => setEditMode(true)}
        />
      )}

      {/* Edit Modal */}
      {selectedSupplier && editMode && (
        <SupplierModal
          supplier={selectedSupplier}
          onClose={() => {
            setEditMode(false);
            setSelectedSupplier(null);
            fetchSuppliers(); // güncelleme sonrası liste yenile
          }}
        />
      )}
    </>
  );
}
