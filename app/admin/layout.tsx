"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaVideo, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { logout } from "@/app/actions/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: FaUser },
    { href: "/admin/works", label: "Works", icon: FaVideo },
  ];

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#07070f] flex">
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-100 font-serif">Admin</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-white/10 text-slate-400"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-72 bg-black/40 md:bg-black/20
          border-r border-white/5 p-8
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          pt-20 md:pt-8
        `}
      >
        <h1 className="text-2xl font-bold text-slate-100 font-serif mb-10 hidden md:block">Admin</h1>

        <nav className="space-y-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-4 px-5 py-4 rounded-xl transition-all
                  ${isActive
                    ? "bg-purple-500/20 text-purple-400"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }
                `}
              >
                <item.icon className="text-base" />
                <span className="text-base">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full px-5 py-4 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all text-base text-left"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 pt-20 md:pt-10 overflow-auto">
        {children}
      </main>
    </div>
  );
}
