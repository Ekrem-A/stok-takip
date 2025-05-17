export default function StatCard({ title, value, change }: { title: string, value: string, change: string }) {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col">
      <span className="text-gray-500">{title}</span>
      <strong className="text-2xl">{value}</strong>
      <span className="text-green-600 text-sm">{change} from last month</span>
    </div>
  );
}