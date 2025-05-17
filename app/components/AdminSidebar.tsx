export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white shadow h-screen p-4">
      <h2 className="font-bold text-lg mb-4">StockTracker</h2>
      <nav className="space-y-2">
        <a href="/admin" className="block hover:underline">Dashboard</a>
        <a href="/admin/products" className="block hover:underline">Products</a>
        <a href="/admin/suppliers" className="block hover:underline">Suppliers</a>
      </nav>
    </aside>
  );
}