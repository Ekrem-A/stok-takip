// components/Products/ProductModal.tsx

interface Category {
  id: number;
  name: string;
}

interface ProductModalProps {
  form: any;
  setForm: (form: any) => void;
  categories: Category[];
  onClose: () => void;
  onSave: () => void;
}

export default function ProductModal({
  form,
  setForm,
  categories,
  onClose,
  onSave,
}: ProductModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-bold">Add New Product</h2>
            <p className="text-sm text-gray-600">
              Add a new product to your inventory. Fill in all the required fields.
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-xl">×</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name *</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter product name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">SKU *</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. TV-460"
              value={form.sku}
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
            />
            <p className="text-xs text-gray-500 mt-1">Unique identifier for this product</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={form.category_id ?? ''}
              onChange={(e) =>
                setForm({ ...form, category_id: +e.target.value || null })
              }
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Icon</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={form.icon_name}
              onChange={(e) => setForm({ ...form, icon_name: e.target.value })}
            >
              <option>Box</option>
              <option>Chip</option>
              <option>Bag</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Initial Quantity *</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: +e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Low Stock Threshold *</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={form.threshold}
              onChange={(e) =>
                setForm({ ...form, threshold: +e.target.value })
              }
            />
            <p className="text-xs text-gray-500 mt-1">
              When stock falls below this level, alerts will be triggered
            </p>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[80px]"
            placeholder="Enter product description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-sm hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded text-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
