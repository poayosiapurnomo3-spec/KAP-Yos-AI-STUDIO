import React from 'react';
import { Card } from './ui/Card';
import { REVENUE_DATA, UTILIZATION_DATA, AGING_AR_DATA, MOCK_ENGAGEMENTS } from '../constants';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { TrendingUp, Users, AlertCircle, DollarSign, Briefcase, Zap, PieChart as PieChartIcon } from 'lucide-react';

interface DashboardProps {
  darkMode?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ darkMode = true }) => {
  // Chart Colors based on theme
  const chartTextColor = darkMode ? '#94a3b8' : '#64748b'; // slate-400 vs slate-500
  const gridColor = darkMode ? '#334155' : '#e2e8f0'; // slate-700 vs slate-200
  const tooltipBg = darkMode ? '#1e293b' : '#ffffff';
  const tooltipBorder = darkMode ? '#475569' : '#e2e8f0';
  const tooltipText = darkMode ? '#fff' : '#0f172a';
  const barTargetColor = darkMode ? '#475569' : '#cbd5e1'; // slate-600 vs slate-300

  // Filter for specific engagements requested
  const watchlist = MOCK_ENGAGEMENTS.filter(e => 
    e.engagementName.includes('Tax Advisory') || 
    e.engagementName.includes('Due Diligence')
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Executive Overview</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time performance metrics and financial insights.</p>
        </div>
        <div className="text-right text-sm text-slate-400 dark:text-slate-500">
          Last updated: Just now
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">YTD Realized Revenue</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">$2,155,000</h3>
              <div className="flex items-center mt-2 text-emerald-600 dark:text-emerald-500 text-sm">
                <TrendingUp size={16} className="mr-1" />
                <span>+12.5% vs Target</span>
              </div>
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-500/10 rounded-lg text-emerald-600 dark:text-emerald-500">
              <DollarSign size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Avg. Staff Utilization</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">75.2%</h3>
              <div className="flex items-center mt-2 text-slate-500 dark:text-slate-400 text-sm">
                <Users size={16} className="mr-1" />
                <span>Dept: Audit Assurance</span>
              </div>
            </div>
             <div className="p-3 bg-blue-100 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-500">
              <Users size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Dept. Budget Used</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">91.3%</h3>
              <div className="flex items-center mt-2 text-amber-600 dark:text-amber-500 text-sm">
                <PieChartIcon size={16} className="mr-1" />
                <span>Audit Assurance</span>
              </div>
            </div>
             <div className="p-3 bg-amber-100 dark:bg-amber-500/10 rounded-lg text-amber-600 dark:text-amber-500">
              <PieChartIcon size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">AR {'>'} 60 Days</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">$15,000</h3>
              <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle size={16} className="mr-1" />
                <span>Needs Attention</span>
              </div>
            </div>
             <div className="p-3 bg-red-100 dark:bg-red-500/10 rounded-lg text-red-600 dark:text-red-500">
              <AlertCircle size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Revenue: Realized vs Target (k USD)" className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={REVENUE_DATA}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.5} />
              <XAxis dataKey="month" stroke={chartTextColor} />
              <YAxis stroke={chartTextColor} />
              <Tooltip 
                contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText }}
                itemStyle={{ color: tooltipText }}
              />
              <Legend />
              <Bar dataKey="target" fill={barTargetColor} name="Target" radius={[4, 4, 0, 0]} />
              <Bar dataKey="realized" fill="#10b981" name="Realized" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Staff Utilization Distribution" className="h-96">
          <div className="flex h-full items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={UTILIZATION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {UTILIZATION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText }}
                />
                <Legend verticalAlign="bottom" height={36} />
                <text x="50%" y="50%" dy={-10} textAnchor="middle" fill={darkMode ? "#fff" : "#0f172a"} className="text-3xl font-bold">75%</text>
                <text x="50%" y="50%" dy={15} textAnchor="middle" fill={chartTextColor} className="text-sm">Billable</text>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

       {/* Bottom Row: Watchlist & Aging AR */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* New Card: Strategic Engagement Watchlist */}
        <Card title="Strategic Engagement Status" className="h-80">
          <div className="flex flex-col justify-center h-full space-y-8 px-2">
            {watchlist.map(eng => {
              const budgetUsed = Math.round(((eng.contractValue - eng.remainingValue) / eng.contractValue) * 100);
              const isBudgetHigh = budgetUsed > 80;
              
              // Mock Utilization logic for display purposes
              const utilization = eng.engagementName.includes('Due Diligence') ? 94.5 : 82.3;

              return (
                <div key={eng.id} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="flex items-center space-x-2">
                         <Briefcase size={14} className="text-emerald-500" />
                         <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{eng.engagementName}</h4>
                      </div>
                      <p className="text-xs text-slate-500 ml-6">{eng.clientName}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 ml-6">
                      {/* Budget Column */}
                      <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-500">Budget Used</span>
                            <span className={`font-bold ${isBudgetHigh ? 'text-amber-500' : 'text-slate-700 dark:text-slate-300'}`}>
                              {budgetUsed}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ease-out ${isBudgetHigh ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                style={{ width: `${budgetUsed}%` }}
                              ></div>
                          </div>
                      </div>

                      {/* Utilization Column */}
                      <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-500">Avg. Utilization</span>
                            <span className="font-bold text-blue-600 dark:text-blue-400">
                              {utilization}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full bg-blue-500 transition-all duration-1000 ease-out"
                                style={{ width: `${utilization}%` }}
                              ></div>
                          </div>
                      </div>
                  </div>
                </div>
              );
            })}
            {watchlist.length === 0 && (
              <p className="text-slate-500 text-sm text-center">No strategic engagements flagged.</p>
            )}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/50">
               <p className="text-xs text-center text-slate-400">
                  <Zap size={12} className="inline mr-1" />
                  Real-time metrics sourced from Time & Billing module.
               </p>
            </div>
          </div>
        </Card>

        {/* Existing Card: Aging AR */}
        <Card title="Aging Accounts Receivable" className="h-80">
            <div className="flex flex-col justify-center h-full space-y-5 px-2">
              {AGING_AR_DATA.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-100 dark:border-slate-700/50">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">{item.range}</span>
                        <span className={`text-xl font-bold ${idx === 2 ? 'text-amber-500' : 'text-slate-800 dark:text-slate-200'}`}>
                            ${item.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-32 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                          <div 
                              className={`h-full rounded-full ${idx === 2 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                              style={{ width: `${(item.amount / 120000) * 100}%` }}
                          ></div>
                      </div>
                  </div>
              ))}
            </div>
        </Card>
       </div>
    </div>
  );
};