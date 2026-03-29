import Link from "next/link";
import { FaVideo } from "react-icons/fa";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-slate-100 font-serif mb-6 md:mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Link
          href="/admin/works"
          className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all"
        >
          <FaVideo className="text-2xl md:text-3xl text-purple-400 mb-4" />
          <h2 className="text-base md:text-lg font-semibold text-slate-200">Manage Works</h2>
          <p className="text-sm text-slate-500 mt-1">Add, edit, or remove portfolio items</p>
        </Link>
      </div>

      <div className="mt-6 md:mt-8 p-4 md:p-6 rounded-2xl bg-white/5 border border-white/5">
        <h2 className="text-base md:text-lg font-semibold text-slate-200 mb-4">Quick Links</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm">View Site →</Link>
          <Link href="/works" className="text-purple-400 hover:text-purple-300 text-sm">Works Page →</Link>
          <Link href="/services" className="text-purple-400 hover:text-purple-300 text-sm">Services Page →</Link>
        </div>
      </div>
    </div>
  );
}
