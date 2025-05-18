'use client';

import { useState } from 'react';
import  supabase  from '@/lib/supabase';

interface Supplier {
  id?: string;
  name: string;
  status: string;
  contact_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  notes: string;
}

interface Props {
  supplier: Supplier;
  onClose: () => void;
}

export default function SupplierModal({ supplier, onClose }: Props) {
  const [form, setForm] = useState<Supplier>({ ...supplier });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async () => {
    if (form.id) {
      await supabase.from('suppliers').update(form).eq('id', form.id);
    } else {
      await supabase.from('suppliers').insert(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-start pt-12">
      <div className="bg-white w-full max-w-2xl rounded-md p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 text-xl">×</button>

        <h2 className="text-xl font-semibold mb-1">
          {form.id ? 'Edit Supplier' : 'Add Supplier'}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {form.id
            ? `Update supplier information for ${form.name}.`
            : 'Fill out the supplier information.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Supplier Name*</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border w-full p-2 rounded mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border w-full p-2 rounded mt-1"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Contact Person</label>
            <input
              name="contact_name"
              value={form.contact_name}
              onChange={handleChange}
              className="border w-full p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="border w-full p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="border w-full p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="border w-full p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">City</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              className="border w-full p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">State</label>
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              className="border w-full p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Postal Code</label>
            <input
              name="postal_code"
              value={form.postal_code}
              onChange={handleChange}
              className="border w-full p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Country</label>
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              className="border w-full p-2 rounded mt-1"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="border w-full p-2 rounded mt-1"
            rows={3}
            placeholder="Add any relevant information about this supplier..."
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {form.id ? 'Update Supplier' : 'Create Supplier'}
          </button>
        </div>
      </div>
    </div>
  );
}
