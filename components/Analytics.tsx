import React from 'react';
import { Card } from './ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DEPT_DATA = [
  { name: 'Audit', billable: 3200, nonBillable: 450 },
  { name: 'Tax', billable: 2100, nonBillable: 300 },
  { name: 'Advisory', billable: 1500, nonBillable: 600 },
  { name: 'Forensic', billable: 800, nonBillable: 120 },
  { name: 'Support', billable: 0, nonBillable: 1200 },
];

interface AnalyticsProps {
  darkMode?: boolean;
}

export const Analytics: React.FC<AnalyticsProps> = ({ darkMode = true }) => {
  const chartTextColor = darkMode ? '#94a3b8' : '#64748b'; // slate-400 vs slate-500
  const gridColor = darkMode ? '#334155' : '#e2e8f0'; // slate-700 vs slate-200
  const tooltipBg = darkMode ? '#1e293b' : '#ffffff';
  const tooltipBorder = darkMode ? '#475569' : '#e2e8f0';
  const tooltipText = darkMode ? '#fff' : '#0f172a';
  const nonBillableColor = darkMode ? '#64748b' : '#94a3b8';

  return (
    <div className="space-y-6">
      <div>
         <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Firm Analytics</h2>
         <p className="text-slate-500 dark:text-slate-400">Deep dive into departmental efficiency and forecasting.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card title="Departmental Efficiency (Billable vs Non-Billable)" className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={DEPT_DATA}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        layout="vertical"
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.5} horizontal={false} />
                        <XAxis type="number" stroke={chartTextColor} />
                        <YAxis dataKey="name" type="category" stroke={chartTextColor} width={80} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText }}
                            itemStyle={{ color: tooltipText }}
                            cursor={{fill: gridColor, opacity: 0.2}}
                        />
                        <Legend />
                        <Bar dataKey="billable" stackId="a" fill="#10b981" name="Billable Hours" radius={[0, 4, 4, 0]} />
                        <Bar dataKey="nonBillable" stackId="a" fill={nonBillableColor} name="Non-Billable" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
          </div>
          <div className="lg:col-span-1 space-y-6">
             <Card title="AI Insights" className="h-full bg-gradient-to-b from-indigo-50 to-white dark:from-slate-900 dark:to-indigo-950/30 border-slate-200 dark:border-indigo-900/50">
                 <div className="space-y-4">
                     <div className="p-4 bg-indigo-100 dark:bg-indigo-500/10 rounded-lg border border-indigo-200 dark:border-indigo-500/20">
                         <h4 className="text-indigo-600 dark:text-indigo-400 font-bold text-sm mb-1 uppercase tracking-wider">Prediction</h4>
                         <p className="text-slate-700 dark:text-slate-300 text-sm">Based on historical data (Prompt D.2), Audit utilization is expected to peak in <strong>February</strong> due to filing deadlines.</p>
                     </div>
                     <div className="p-4 bg-amber-100 dark:bg-amber-500/10 rounded-lg border border-amber-200 dark:border-amber-500/20">
                         <h4 className="text-amber-600 dark:text-amber-400 font-bold text-sm mb-1 uppercase tracking-wider">Anomaly</h4>
                         <p className="text-slate-700 dark:text-slate-300 text-sm">Unusual spike in Non-Billable hours detected in <strong>Advisory</strong> department over the last 48 hours.</p>
                     </div>
                 </div>
             </Card>
          </div>
      </div>
    </div>
  );
};