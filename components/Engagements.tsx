import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { MOCK_ENGAGEMENTS } from '../constants';
import { Engagement } from '../types';
import { Search, Briefcase, FileText, User, MoreHorizontal, Filter, DollarSign, Calendar } from 'lucide-react';

export const Engagements: React.FC = () => {
  // Use state for engagements to allow adding new ones
  const [engagements, setEngagements] = useState<Engagement[]>(MOCK_ENGAGEMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    engagementName: '',
    partnerInCharge: '',
    contractValue: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.clientName || !formData.engagementName || !formData.contractValue) {
      alert("Please fill in all required fields.");
      return;
    }

    const value = parseFloat(formData.contractValue);
    
    const newEngagement: Engagement = {
      id: `ENG-2024-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      clientId: `CLT-${Math.floor(Math.random() * 1000)}`,
      clientName: formData.clientName,
      engagementName: formData.engagementName,
      partnerInCharge: formData.partnerInCharge || 'Unassigned',
      contractValue: value,
      remainingValue: value, // Initially full value remaining
      status: 'Pending',
    };

    setEngagements([newEngagement, ...engagements]);
    setIsModalOpen(false);
    setFormData({ clientName: '', engagementName: '', partnerInCharge: '', contractValue: '' });
  };

  const filtered = engagements.filter(e => 
    e.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.partnerInCharge.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.engagementName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Client Master</h2>
           <p className="text-slate-500 dark:text-slate-400">Manage engagements, contracts, and billing setups.</p>
        </div>
        <Button className="shrink-0" onClick={() => setIsModalOpen(true)}>
            <PlusIcon className="w-4 h-4 mr-2" />
            New Engagement
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-lg shadow-slate-200/50 dark:shadow-none sticky top-0 z-10 backdrop-blur-md">
          <div className="flex gap-4">
              <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search clients, partners, or contract IDs..." 
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder-slate-500 dark:placeholder-slate-600"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
              <Button variant="secondary" className="hidden md:flex">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
              </Button>
          </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map(eng => (
            <div key={eng.id} className="group bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500/50 rounded-xl p-5 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-emerald-900/5 dark:hover:shadow-emerald-900/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><MoreHorizontal size={20} /></button>
                </div>
                
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-slate-600 dark:text-white font-bold text-lg shadow-inner border border-slate-200 dark:border-slate-600">
                        {eng.clientName.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                        <h3 className="font-bold text-slate-800 dark:text-slate-100 leading-tight truncate">{eng.clientName}</h3>
                        <span className="text-xs text-slate-500 font-mono">{eng.clientId}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                        <Briefcase size={16} className="mr-2 text-emerald-600 dark:text-emerald-500 shrink-0" />
                        <span className="font-medium truncate">{eng.engagementName}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                        <User size={16} className="mr-2 text-slate-400 dark:text-slate-500 shrink-0" />
                        <span className="truncate">Partner: {eng.partnerInCharge}</span>
                    </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-500">Contract Usage</span>
                        <span className="text-slate-600 dark:text-slate-300 font-mono">
                            ${(eng.contractValue - eng.remainingValue).toLocaleString()} / ${eng.contractValue.toLocaleString()}
                        </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full ${eng.remainingValue < eng.contractValue * 0.2 ? 'bg-red-500' : 'bg-emerald-500'}`}
                            style={{ width: `${((eng.contractValue - eng.remainingValue) / eng.contractValue) * 100}%` }}
                        ></div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${
                            eng.status === 'Active' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-200 dark:border-emerald-500/20' : 
                            eng.status === 'Pending' ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-200 dark:border-amber-500/20' : 
                            'bg-slate-100 dark:bg-slate-500/10 text-slate-600 dark:text-slate-500 border-slate-200 dark:border-slate-500/20'
                        }`}>
                            {eng.status}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">{eng.id}</span>
                    </div>
                </div>
            </div>
        ))}
        
        {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500">
                No engagements found matching "{searchTerm}"
            </div>
        )}
      </div>

      {/* Create Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Engagement">
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <label htmlFor="clientName" className="text-sm font-medium text-slate-700 dark:text-slate-300">Client Name <span className="text-red-400">*</span></label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FileText size={16} className="text-slate-400 dark:text-slate-500" />
                    </div>
                    <input
                        type="text"
                        name="clientName"
                        id="clientName"
                        required
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block pl-10 p-2.5"
                        placeholder="e.g. Megacorp Industries"
                        value={formData.clientName}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="engagementName" className="text-sm font-medium text-slate-700 dark:text-slate-300">Engagement Name <span className="text-red-400">*</span></label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase size={16} className="text-slate-400 dark:text-slate-500" />
                    </div>
                    <input
                        type="text"
                        name="engagementName"
                        id="engagementName"
                        required
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block pl-10 p-2.5"
                        placeholder="e.g. Annual Audit 2024"
                        value={formData.engagementName}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="partnerInCharge" className="text-sm font-medium text-slate-700 dark:text-slate-300">Partner In Charge</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={16} className="text-slate-400 dark:text-slate-500" />
                    </div>
                    <input
                        type="text"
                        name="partnerInCharge"
                        id="partnerInCharge"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block pl-10 p-2.5"
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.partnerInCharge}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="contractValue" className="text-sm font-medium text-slate-700 dark:text-slate-300">Contract Value (USD) <span className="text-red-400">*</span></label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign size={16} className="text-slate-400 dark:text-slate-500" />
                    </div>
                    <input
                        type="number"
                        name="contractValue"
                        id="contractValue"
                        required
                        min="0"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block pl-10 p-2.5"
                        placeholder="0.00"
                        value={formData.contractValue}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="pt-4 flex space-x-3">
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} className="flex-1">
                    Cancel
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                    Create Engagement
                </Button>
            </div>
        </form>
      </Modal>
    </div>
  );
};

const PlusIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);