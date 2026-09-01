import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Settings, 
  FileText, 
  Image as ImageIcon, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

const AdminLayout = () => {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard (Bookings)', path: '/admin', icon: LayoutDashboard, end: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-gray-900">
      {/* Mobile header */}
      <div className="md:hidden bg-white shadow-sm border-b border-gray-200 flex items-center justify-between p-4 sticky top-0 z-40">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Admin Panel</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none transition-colors">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-xl md:shadow-none transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 hidden md:block border-b border-gray-100">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">Admin Panel</h2>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.end}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'}
                  `}
                >
                  <Icon size={20} className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600 transition-colors'} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-100 space-y-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-semibold text-sm"
            >
              <span>View Website</span>
            </a>
            <button
              onClick={logout}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors font-semibold text-sm"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto relative">
        <main className="p-4 md:p-8 max-w-7xl mx-auto min-h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
