import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ACTIVITY_OPTIONS, MOCK_ENGAGEMENTS, MOCK_TIME_ENTRIES, CURRENT_USER } from '../constants';
import { ActivityType, TimeEntry as TimeEntryType } from '../types';
import { Search, Plus, Calendar, Clock, CheckCircle } from 'lucide-react';

export const TimeEntry: React.FC = () => {
  const [entries, setEntries] = useState<TimeEntryType[]>(MOCK_TIME_ENTRIES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [engagementId, setEngagementId] = useState('');
  const [activityType, setActivityType] = useState<ActivityType | ''>('');
  const [hours, setHours] = useState<string>('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [isBillable, setIsBillable] = useState(true);

  // Filter engagements based on simulated search input
  const filteredEngagements = MOCK_ENGAGEMENTS.filter(e => 
    e.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.engagementName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation: Hours max 12
    if (parseFloat(hours) > 12) {
      alert("Validation Error: Hours spent cannot exceed 12 hours in a single day.");
      return;
    }
    if (!engagementId || !activityType || !hours) {
        alert("Please fill all required fields");
        return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newEntry: TimeEntryType = {
        id: `TE-${Math.floor(Math.random() * 10000)}`,
        engagementId,
        date,
        hoursSpent: parseFloat(hours),
        activityType: activityType as ActivityType,
        isBillable,
        notes
      };
      
      setEntries([newEntry, ...entries]);
      setIsSubmitting(false);
      
      // Reset form
      setHours('');
      setNotes('');
      // Keep date and engagement for convenience
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Time & Billing</h2>
          <p className="text-slate-500 dark:text-slate-400">Log your hours and manage billable activities.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center space-x-2">
            <span className="text-slate-500 dark:text-slate-400 text-sm">Billable Rate:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">${CURRENT_USER.billableRate}/hr</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Entry Form */}
        <div className="lg:col-span-1">
          <Card title="New Entry" className="h-full border-t-4 border-t-emerald-500">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Autocomplete Engagement Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Engagement</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search Client or Engagement..."
                    className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block pl-10 p-2.5"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {searchTerm && (
                   <div className="max-h-40 overflow-y-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg mt-1 absolute z-10 w-[85%] shadow-xl">
                      {filteredEngagements.map(eng => (
                          <div 
                            key={eng.id} 
                            onClick={() => {
                                setEngagementId(eng.id);
                                setSearchTerm(`${eng.clientName} - ${eng.engagementName}`);
                            }}
                            className="p-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700/50 last:border-0"
                          >
                              <div className="font-bold">{eng.clientName}</div>
                              <div className="text-xs text-slate-500">{eng.engagementName}</div>
                          </div>
                      ))}
                      {filteredEngagements.length === 0 && (
                          <div className="p-2 text-sm text-slate-500">No results found</div>
                      )}
                   </div>
                )}
                {engagementId && <div className="text-xs text-emerald-600 dark:text-emerald-500">Selected: {engagementId}</div>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Activity Type</label>
                <select
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value as ActivityType)}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5"
                >
                  <option value="" disabled>Select Activity</option>
                  {ACTIVITY_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date</label>
                  <div className="relative">
                     <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5"
                     />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Hours</label>
                  <input
                    type="number"
                    step="0.5"
                    max="12"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5"
                    placeholder="0.0"
                  />
                </div>
              </div>

              <div className="flex items-center p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/50">
                  <input 
                    id="billable-checkbox" 
                    type="checkbox" 
                    checked={isBillable}
                    onChange={(e) => setIsBillable(e.target.checked)}
                    className="w-5 h-5 text-emerald-600 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded focus:ring-emerald-600 focus:ring-2"
                  />
                  <label htmlFor="billable-checkbox" className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-200 cursor-pointer">Is Billable?</label>
              </div>

              <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Notes</label>
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 h-20 resize-none"
                    placeholder="Describe task..."
                  />
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold py-3"
                isLoading={isSubmitting}
              >
                Submit Entry
              </Button>
            </form>
          </Card>
        </div>

        {/* List View */}
        <div className="lg:col-span-2">
            <Card title="Recent Entries" className="h-full">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                        <thead className="text-xs text-slate-700 dark:text-slate-500 uppercase bg-slate-100 dark:bg-slate-800/50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Client / Engagement</th>
                                <th scope="col" className="px-6 py-3">Activity</th>
                                <th scope="col" className="px-6 py-3 text-center">Hours</th>
                                <th scope="col" className="px-6 py-3 text-center">Billable</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry) => {
                                const eng = MOCK_ENGAGEMENTS.find(e => e.id === entry.engagementId);
                                return (
                                    <tr key={entry.id} className="bg-white dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-slate-700 dark:text-slate-300">{entry.date}</td>
                                        <td className="px-6 py-4">
                                            {eng ? (
                                                <div>
                                                    <div className="text-slate-900 dark:text-slate-200 font-medium">{eng.clientName}</div>
                                                    <div className="text-xs text-slate-500">{eng.engagementName}</div>
                                                </div>
                                            ) : <span className="text-slate-500 italic">Internal</span>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded text-xs border border-slate-200 dark:border-slate-700">
                                                {entry.activityType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center font-bold text-slate-900 dark:text-slate-200">{entry.hoursSpent}</td>
                                        <td className="px-6 py-4 text-center">
                                            {entry.isBillable ? 
                                                <CheckCircle size={16} className="text-emerald-500 inline" /> : 
                                                <span className="w-4 h-4 inline-block rounded-full border border-slate-400 dark:border-slate-600"></span>
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-emerald-600 dark:text-emerald-500 text-xs font-medium bg-emerald-100 dark:bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20">Posted</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};