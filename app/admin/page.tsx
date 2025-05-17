import StatCard from '@/app/components/StatCard';
import StockTrends from '@/app/components/Charts/StockTrends';
import InventoryByCategory from '@/app/components/Charts/InventoryByCategory';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Products" value="0" change="+8%" />
        <StatCard title="Items in Stock" value="0" change="+12%" />
        <StatCard title="Low Stock Items" value="0" change="-2%" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StockTrends />
        <InventoryByCategory />
      </div>
    </div>
  );
}