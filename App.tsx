import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { TimeEntry } from './components/TimeEntry';
import { Engagements } from './components/Engagements';
import { Analytics } from './components/Analytics';
import { Modal } from './components/ui/Modal';
import { Button } from './components/ui/Button';
import { ViewState } from './types';
import { CURRENT_USER } from './constants';
import { LogOut, Bell, Moon, Shield, User, Sun } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard darkMode={darkMode} />;
      case 'time-entry':
        return <TimeEntry />;
      case 'engagements':
        return <Engagements />;
      case 'analytics':
        return <Analytics darkMode={darkMode} />;
      default:
        return <Dashboard darkMode={darkMode} />;
    }
  };

  const handleLogout = () => {
    // Simulate logout
    alert("Logged out successfully. (Simulation)");
    setIsLogoutDialogOpen(false);
    // In a real app, you would clear tokens and redirect to login
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className={`min-h-screen font-sans selection:bg-emerald-500/30 transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-200`}>
        <Sidebar 
          currentView={currentView} 
          onViewChange={setCurrentView} 
          onSettingsClick={() => setIsSettingsOpen(true)}
          onLogoutClick={() => setIsLogoutDialogOpen(true)}
        />
        
        <main className="pl-64 min-h-screen transition-colors duration-300">
          <div className="max-w-7xl mx-auto p-8 pt-10">
            {renderView()}
          </div>
        </main>

        {/* Settings Modal */}
        <Modal 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
          title="System Settings"
        >
          <div className="space-y-8">
            {/* User Profile Section */}
            <div className="flex items-center space-x-4 bg-white dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                {CURRENT_USER.fullName[0]}
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{CURRENT_USER.fullName}</h4>
                <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">{CURRENT_USER.department}</p>
                <p className="text-slate-500 text-xs mt-1">ID: {CURRENT_USER.id}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2">Preferences</h5>
              
              <div className="flex items-center justify-between p-2 hover:bg-slate-100 dark:hover:bg-slate-800/30 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500 rounded-lg">
                    <Bell size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200">Email Notifications</p>
                    <p className="text-xs text-slate-500">Receive daily digest of tasks</p>
                  </div>
                </div>
                <div 
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${notificationsEnabled ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${notificationsEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 hover:bg-slate-100 dark:hover:bg-slate-800/30 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                   <div className="p-2 bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-500 rounded-lg">
                    {darkMode ? <Moon size={18} /> : <Sun size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200">Dark Mode</p>
                    <p className="text-xs text-slate-500">Toggle dark theme</p>
                  </div>
                </div>
                <div 
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${darkMode ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                  onClick={() => setDarkMode(!darkMode)}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2">Security</h5>
              
              <button className="w-full flex items-center justify-between p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg group transition-colors text-left">
                <div className="flex items-center space-x-3">
                   <div className="p-2 bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 rounded-lg">
                    <Shield size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-white">Change Password</p>
                    <p className="text-xs text-slate-500">Last changed 30 days ago</p>
                  </div>
                </div>
                <div className="text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300">→</div>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <Button onClick={() => setIsSettingsOpen(false)}>Save Changes</Button>
            </div>
          </div>
        </Modal>

        {/* Logout Confirmation Modal */}
        <Modal 
          isOpen={isLogoutDialogOpen} 
          onClose={() => setIsLogoutDialogOpen(false)} 
          title="Confirm Logout"
        >
          <div className="text-center py-4">
            <div className="bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-red-50 dark:ring-red-500/5">
                <LogOut size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">End Session?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xs mx-auto">
              Are you sure you want to log out? Any unsaved changes in draft forms may be lost.
            </p>
            <div className="flex space-x-3">
                <Button variant="secondary" className="w-full justify-center" onClick={() => setIsLogoutDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="danger" className="w-full justify-center" onClick={handleLogout}>
                  Logout
                </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;