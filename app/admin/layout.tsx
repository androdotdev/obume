"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/app/actions/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#07070f] flex justify-center">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-5 py-4">
          <h1 className="text-lg md:text-xl font-bold text-slate-100 font-serif">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-5 md:p-8 pt-20 md:pt-24 max-w-4xl mx-auto">
        {children}
      </main>
    </div>
  );
}
