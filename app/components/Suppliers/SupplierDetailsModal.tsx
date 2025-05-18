import { Supplier } from './SupplierCards';

interface Props {
  supplier: Supplier;
  onClose: () => void;
  onEdit: () => void;
}

export default function SupplierDetailsModal({ supplier, onClose, onEdit }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-md rounded-md p-6 shadow-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 text-xl hover:text-gray-700"
        >
          ×
        </button>

        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold">{supplier.name}</h2>
            <p className="text-sm text-gray-500">Contact: {supplier.contact_name}</p>
          </div>
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full h-fit">
            {supplier.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
          <div>
            <h4 className="font-medium text-gray-700 mb-1">Contact Information</h4>
            <p>📞 {supplier.phone}</p>
            <p>✉️ {supplier.email}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-1">Address</h4>
            <p>{supplier.address}</p>
            <p>{supplier.city}, {supplier.state} {supplier.postal_code}</p>
            <p>{supplier.country}</p>
          </div>
        </div>

        {supplier.notes && (
          <div className="mt-4 text-sm">
            <h4 className="font-medium text-gray-700 mb-1">Notes</h4>
            <p className="text-gray-600 italic">{supplier.notes}</p>
          </div>
        )}

        <div className="flex justify-between mt-6 gap-2">
          <button
            onClick={onEdit}
            className="border px-4 py-2 rounded text-sm hover:bg-gray-50"
          >
            Edit Supplier
          </button>
          <button
            onClick={() =>
              window.location.assign(`/admin/suppliers/${supplier.id}/products`)
            }
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            View Products
          </button>
        </div>
      </div>
    </div>
  );
}
