import SupplierCards from '@/app/components/Suppliers/SupplierCards';

export default function SuppliersPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Suppliers</h1>
        {/* Add Supplier butonu burada olabilir */}
      </div>

      <SupplierCards />
    </div>
  );
}
