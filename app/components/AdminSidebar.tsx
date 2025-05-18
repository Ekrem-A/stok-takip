'use client';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';
import {
  LayoutDashboard,
  Package,
  Truck,
  Repeat,
  Bell,
  FileText,
  Settings,
} from 'lucide-react';




export default function AdminSidebar() {

  const [profile, setProfile] = useState<{ username: string; role: string } | null>(null);

useEffect(() => {
  const getProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('username, role')
      .eq('id', user.id)
      .single();

    if (!error && data) {
      setProfile(data);
    }
  };

  getProfile();
}, []);

  return (
    <aside className="w-64 bg-white shadow h-screen p-4 flex flex-col justify-between">
      <div>
        <h2 className="font-bold text-xl mb-6 flex items-center gap-2">
          <span className="text-blue-600">▍</span> StockTracker
        </h2>
        <nav className="space-y-1 text-sm">
          <SidebarLink icon={LayoutDashboard} href="/admin">Dashboard</SidebarLink>
          <SidebarLink icon={Package} href="/admin/products">Products</SidebarLink>
          <SidebarLink icon={Truck} href="/admin/suppliers">Suppliers</SidebarLink>
          <SidebarLink icon={Repeat} href="#">Stock Movements</SidebarLink>
          <SidebarLink icon={Bell} href="#">Alerts</SidebarLink>
          <SidebarLink icon={FileText} href="#">Reports</SidebarLink>
          <SidebarLink icon={Settings} href="#">Settings</SidebarLink>
        </nav>
      </div>

      {profile && (
        <div className="text-xs text-gray-600 mt-6 border-t pt-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">{profile.username}</p>
            <p className="text-gray-400">{profile.role}</p>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            title="Logout"
          >
            <LogOut className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      )}

    </aside>
  );
}

function SidebarLink({
  icon: Icon,
  href,
  children,
}: {
  icon: React.ElementType;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-2 px-2 py-2 rounded hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
    >
      <Icon className="w-4 h-4" />
      {children}
    </a>
  );
}
