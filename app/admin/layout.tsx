'use client';
import AdminTopbar from '@/app/components/AdminTopbar';
import AdminGuard from '@/app/components/AdminGuard';
import dynamic from 'next/dynamic';

const AdminSidebar = dynamic(() => import('@/app/components/AdminSidebar'), {
  ssr: false, // ❗ önemli: sadece client'ta çalışsın
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminSidebar/>
        <div className="flex-1 bg-gray-50">
          <AdminTopbar/>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}
