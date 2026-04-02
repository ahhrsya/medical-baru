import { clinics, clinicians } from '../lib/db';
import DataCard from '../components/ui/DataCard';
import { 
  MapPinIcon, 
  UsersIcon, 
  BanknotesIcon, 
  ChartBarIcon, 
  ArrowTrendingUpIcon,
  ClockIcon,
  ShieldCheckIcon,
  BellAlertIcon,
  ArrowRightIcon,
  HomeModernIcon
} from '@heroicons/react/24/outline';

const comparisonData = [
  { name: 'City Centre', appts: 68, util: 84, revenue: 14200, growth: '+12%', staff: 12 },
  { name: 'Meridian North', appts: 42, util: 71, revenue: 9800, growth: '+5%', staff: 8 },
  { name: 'Meridian South', appts: 51, util: 78, revenue: 11500, growth: '+8%', staff: 10 },
  { name: 'Meridian East', appts: 28, util: 62, revenue: 6400, growth: '-2%', staff: 6 },
];

export default function LocationsOverview() {
  return (
    <div className="flex flex-col space-y-10 animate-in fade-in duration-700 pb-24">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
         <div>
            <h1 className="text-3xl font-bold font-plus-jakarta text-[#111827] tracking-tight">Multi-Location Group Overview</h1>
            <p className="text-sm text-[#6B7280] font-medium mt-1">High-level visibility for Meridian Health Group performance across all facilities.</p>
         </div>
         <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white border border-[#E2E8F0] px-4 py-2 rounded-xl text-sm font-bold text-[#1e293b] shadow-sm hover:bg-[#F8FAFC] transition-all">
               <HomeModernIcon className="w-5 h-5 text-[#94A3B8]" />
               Manage Facilities
            </button>
         </div>
      </div>

      {/* Location Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {clinics.map((clinic, idx) => (
            <DataCard key={clinic.id} className="relative overflow-hidden group hover:border-[#0D9488]/30 hover:shadow-xl transition-all duration-300">
               <div className="flex items-center justify-between mb-6">
                  <div className="p-2.5 rounded-xl bg-[#F0FDFA] text-[#0D9488] group-hover:bg-[#0D9488] group-hover:text-white transition-all duration-500">
                     <MapPinIcon className="w-5 h-5" />
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    comparisonData[idx].growth.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {comparisonData[idx].growth}
                  </div>
               </div>
               
               <div>
                  <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">{clinic.city}</p>
                  <h3 className="text-lg font-bold text-[#111827] tracking-tight mb-6">{clinic.name}</h3>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Utilization</p>
                        <p className="text-xl font-bold text-[#111827]">{comparisonData[idx].util}%</p>
                     </div>
                     <div className="flex-1 max-w-[100px] mb-1 px-3">
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                           <div 
                              className="h-full bg-[#0D9488] rounded-full transition-all duration-1000" 
                              style={{ width: `${comparisonData[idx].util}%` }} 
                           />
                        </div>
                     </div>
                  </div>
                  
                  <div className="pt-4 border-t border-[#F8FAFC] flex justify-between items-center">
                     <div className="flex items-center gap-1.5">
                        <UsersIcon className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span className="text-[11px] font-bold text-[#6B7280]">{comparisonData[idx].appts} Appts</span>
                     </div>
                     <span className="text-xs font-bold text-[#111827]">€{comparisonData[idx].revenue.toLocaleString()}</span>
                  </div>
               </div>
            </DataCard>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Detailed Comparison Table */}
         <div className="lg:col-span-2">
            <DataCard title="Performance Audit" subtitle="Competitive analysis across location network">
               <div className="mt-8 overflow-hidden rounded-2xl border border-[#F1F5F9]">
                  <table className="min-w-full divide-y divide-[#F1F5F9]">
                     <thead className="bg-[#F8FAFC]">
                        <tr className="text-left text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">
                           <th className="px-6 py-5">Location Entity</th>
                           <th className="px-6 py-5 text-center">Efficiency Score</th>
                           <th className="px-6 py-5 text-center">Staff Count</th>
                           <th className="px-6 py-5 text-right">Revenue MTD</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-[#F1F5F9] bg-white">
                        {comparisonData.map(l => (
                           <tr key={l.name} className="text-sm group hover:bg-[#F0FDFA]/30 transition-colors">
                              <td className="px-6 py-5">
                                 <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#0D9488]" />
                                    <span className="font-bold text-[#111827] truncate">{l.name} Clinic</span>
                                 </div>
                              </td>
                              <td className="px-6 py-5 text-center">
                                 <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-[#0D9488] rounded-full text-xs font-bold">
                                    <ShieldCheckIcon className="w-3.5 h-3.5" />
                                    {(l.util * 0.95).toFixed(1)}
                                 </span>
                              </td>
                              <td className="px-6 py-5 text-center font-bold text-[#64748B]">
                                 {l.staff} Clinicians
                              </td>
                              <td className="px-6 py-5 text-right font-black text-[#111827]">
                                 €{l.revenue.toLocaleString()}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </DataCard>
         </div>

         {/* Clinician Leaderboard */}
         <div className="lg:col-span-1">
            <DataCard title="Group Top Performers" subtitle="Highest clinical efficiency this month">
               <div className="space-y-6 mt-8">
                  {clinicians.slice(0, 5).map((c, i) => (
                     <div key={c.id} className="flex items-center justify-between p-3 rounded-2xl border border-transparent hover:border-[#F1F5F9] hover:bg-[#F8FAFC] transition-all group">
                        <div className="flex items-center gap-3">
                           <div className="relative">
                              <div className={`w-11 h-11 rounded-2xl ${c.bgOpacity} flex items-center justify-center font-bold ${c.color} ring-4 ring-white shadow-sm`}>
                                 {c.name.split('. ')[1][0]}
                              </div>
                              <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#1e293b] text-white flex items-center justify-center text-[10px] font-black border-2 border-white shadow-sm">
                                 {i + 1}
                              </div>
                           </div>
                           <div className="min-w-0">
                               <p className="text-sm font-bold text-[#111827] truncate">{c.name}</p>
                               <p className="text-[10px] text-[#6B7280] font-medium truncate">{c.specialty}</p>
                           </div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                           <span className="text-sm font-black text-[#111827]">98.2%</span>
                           <span className="text-[9px] text-[#10B981] font-bold uppercase tracking-tight">Top 1% Group</span>
                        </div>
                     </div>
                  ))}
               </div>
               <button className="w-full mt-6 py-3 rounded-2xl border border-[#F1F5F9] text-xs font-bold text-[#6B7280] hover:bg-[#F8FAFC] hover:text-[#111827] transition-all flex items-center justify-center gap-2">
                  View Full Ranking
                  <ArrowRightIcon className="w-3.5 h-3.5" />
               </button>
            </DataCard>
         </div>
      </div>

      {/* NEW CONTENT: Bottom Analytics & Operational Notices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
         {/* Strategic Insights */}
         <DataCard title="Strategic Health Insight" subtitle="Group-wide capacity forecasting">
            <div className="mt-6 flex flex-col items-center justify-center py-8 bg-[#F8FAFC] rounded-3xl border border-[#F1F5F9] relative overflow-hidden">
               {/* Abstract Graph Pattern */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                     <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                     </pattern>
                     <rect width="100" height="100" fill="url(#grid)" />
                  </svg>
               </div>
               
               <div className="text-center space-y-2 relative z-10">
                  <p className="text-4xl font-black text-[#111827] tracking-tighter">74.2%</p>
                  <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest">Average Group Load</p>
                  <div className="flex items-center gap-2 mt-4">
                     <span className="px-3 py-1 bg-[#F0FDFA] rounded-full text-[10px] font-bold text-[#0D9488] border border-[#CCFBF1]">Optimized Capacity</span>
                  </div>
               </div>

               <div className="grid grid-cols-3 gap-8 mt-10 w-full px-10 relative z-10">
                  <div className="text-center">
                     <p className="text-lg font-bold text-[#111827]">142</p>
                     <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-tight">Active Rooms</p>
                  </div>
                  <div className="text-center border-x border-[#E2E8F0]">
                     <p className="text-lg font-bold text-[#111827]">38</p>
                     <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-tight">Clinicians</p>
                  </div>
                  <div className="text-center">
                     <p className="text-lg font-bold text-[#111827]">2,1k</p>
                     <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-tight">Avg Patients/Mo</p>
                  </div>
               </div>
            </div>
         </DataCard>

         {/* Upcoming Maintenance & Operational Alerts */}
         <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
               <div>
                  <h3 className="text-lg font-bold text-[#111827]">Operational Notices</h3>
                  <p className="text-xs text-[#6B7280] font-medium">Group-wide maintenance and alerts</p>
               </div>
               <BellAlertIcon className="w-5 h-5 text-amber-500" />
            </div>

            <div className="space-y-4">
               {[
                  { location: 'Meridian North', event: 'MRI Scanner Calibration', date: 'April 15, 2026', type: 'Maintenance' },
                  { location: 'City Centre', event: 'Quarterly Staff Training', date: 'April 18, 2026', type: 'Training' },
                  { location: 'Meridian East', event: 'New Telehealth System Integration', date: 'April 22, 2026', type: 'Critical' },
               ].map((alert, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#F1F5F9] hover:border-[#0D9488]/30 transition-all shadow-sm">
                     <div className={`w-12 h-12 flex items-center justify-center rounded-xl shrink-0 ${
                        alert.type === 'Critical' ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-500'
                     }`}>
                        <ClockIcon className="w-5 h-5" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                           <span className="text-[10px] font-bold text-[#0D9488] uppercase tracking-wide">{alert.location}</span>
                           <span className="text-[10px] font-black text-[#6B7280]">{alert.date}</span>
                        </div>
                        <p className="text-sm font-bold text-[#111827] truncate">{alert.event}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">{alert.type} Window: 08:00 - 12:00</p>
                     </div>
                  </div>
               ))}
            </div>

            <button className="w-full py-4 bg-[#F8FAFC] rounded-2xl border border-dashed border-[#E2E8F0] text-xs font-bold text-[#6B7280] hover:bg-[#F0FDFA] hover:text-[#0D9488] hover:border-[#0D9488]/30 transition-all">
               + Schedule Group Notice
            </button>
         </div>
      </div>
    </div>
  );
}
