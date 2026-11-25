import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Tags, Inbox, LogOut, ExternalLink, Menu, X } from 'lucide-react';
import { isAuthenticated, logout } from '../../services/auth';
import { useEnquiries } from '../../services/store';
import AdminLogin from './AdminLogin';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: Tags },
  { to: '/admin/enquiries', label: 'Enquiries', icon: Inbox },
];

const AdminLayout = () => {
  const [authed, setAuthed] = useState(isAuthenticated());
  const [menuOpen, setMenuOpen] = useState(false);
  const enquiries = useEnquiries();
  const navigate = useNavigate();
  const newCount = enquiries.filter((e) => e.status === 'new').length;

  useEffect(() => {
    document.title = 'Admin | LAC Stones';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  if (!authed) return <AdminLogin onSuccess={() => setAuthed(true)} />;

  const handleLogout = () => {
    logout();
    setAuthed(false);
    navigate('/admin');
  };

  const sidebar = (
    <nav className="flex flex-col h-full">
      <div className="px-6 py-6 border-b border-stone-700 flex items-center gap-3">
        <img src="/images/lac-mark-sm.png" alt="" width="40" height="43" className="h-11 w-auto" />
        <div>
          <p className="font-sans font-medium tracking-[0.25em] text-white">LAC STONES</p>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-yellow-600 mt-1">Admin Panel</p>
        </div>
      </div>
      <div className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-yellow-600 text-white' : 'text-stone-300 hover:bg-stone-700'
              }`
            }
          >
            <Icon size={18} />
            <span className="flex-1">{label}</span>
            {label === 'Enquiries' && newCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{newCount}</span>
            )}
          </NavLink>
        ))}
      </div>
      <div className="px-3 py-4 border-t border-stone-700 space-y-1">
        <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-stone-300 hover:bg-stone-700">
          <ExternalLink size={18} /> View website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-stone-300 hover:bg-stone-700"
        >
          <LogOut size={18} /> Log out
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-stone-100 lg:flex">
      <aside className="hidden lg:block w-64 bg-stone-800 fixed inset-y-0 left-0">{sidebar}</aside>

      <header className="lg:hidden flex items-center justify-between bg-stone-800 text-white px-4 h-14 sticky top-0 z-40">
        <span className="font-sans font-medium tracking-[0.2em]">LAC STONES · Admin</span>
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>
      {menuOpen && <aside className="lg:hidden fixed inset-0 top-14 z-30 bg-stone-800">{sidebar}</aside>}

      <main className="flex-1 lg:ml-64 p-4 md:p-8 min-w-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
