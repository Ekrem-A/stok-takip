// components/Products/ProductCard.tsx
import { Box, Cpu } from 'lucide-react';

const IconMap = {
  Box: <Box size={16} />,
  Chip: <Cpu size={16} />,
};

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    icon_name: string;
    quantity: number;
    threshold: number;
    category_id: number | null;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <tr className="border-t">
      <td className="p-3 flex items-center gap-2">
        {IconMap[product.icon_name as keyof typeof IconMap]} {product.name}
      </td>
      <td className="p-3">{product.category_id ?? '—'}</td>
      <td className="p-3">{product.quantity}</td>
      <td className="p-3">
        {product.quantity <= product.threshold ? (
          <span className="text-red-500">Yes</span>
        ) : (
          <span className="text-green-500">No</span>
        )}
      </td>
      <td className="p-3 capitalize">active</td>
      <td className="p-3 text-right">
        <button className="text-blue-600 hover:underline text-sm">Edit</button>
      </td>
    </tr>
  );
}
