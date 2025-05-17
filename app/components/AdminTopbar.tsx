export default function AdminTopbar() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="font-semibold text-lg">Admin Panel</h1>
      <input
        placeholder="Search products..."
        className="border rounded px-3 py-1 text-sm"
      />
    </header>
  );
}