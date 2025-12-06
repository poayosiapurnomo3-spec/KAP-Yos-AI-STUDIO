import React from 'react';
import { LayoutDashboard, Clock, Briefcase, BarChart3, Settings, LogOut, Hexagon } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  onSettingsClick: () => void;
  onLogoutClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onViewChange,
  onSettingsClick,
  onLogoutClick 
}) => {
  const navItems: { id: ViewState; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'time-entry', label: 'Time & Billing', icon: <Clock size={20} /> },
    { id: 'engagements', label: 'Engagements', icon: <Briefcase size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed left-0 top-0 z-20 transition-colors duration-300">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-200 dark:border-slate-800">
        <div className="bg-emerald-600 p-2 rounded-lg shadow-lg shadow-emerald-900/20 dark:shadow-emerald-900/50">
           <Hexagon size={24} className="text-white fill-current" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">KAP Yos</h1>
          <p className="text-xs text-slate-500 uppercase tracking-wider">Enterprise ERP</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              currentView === item.id
                ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-700 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span className={`${currentView === item.id ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`}>
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <button 
          onClick={onSettingsClick}
          className="w-full flex items-center space-x-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Settings size={20} />
          <span>Settings</span>
        </button>
        <button 
          onClick={onLogoutClick}
          className="w-full flex items-center space-x-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors mt-1"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};