import { clinics } from '../lib/db';
import DataCard from '../components/ui/DataCard';
import { 
  MapPinIcon, 
  UsersIcon, 
  ArrowTrendingUpIcon,
  ClockIcon,
  ShieldCheckIcon,
  BellAlertIcon,
  HomeModernIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const comparisonData = [
  { name: 'City Centre', appts: 68, util: 84, revenue: 14200, growth: '+12%', staff: 12 },
  { name: 'Meridian North', appts: 42, util: 71, revenue: 9800, growth: '+5%', staff: 8 },
  { name: 'Meridian South', appts: 51, util: 78, revenue: 11500, growth: '+8%', staff: 10 },
  { name: 'Meridian East', appts: 28, util: 62, revenue: 6400, growth: '-2%', staff: 6 },
  { name: 'Westside Annex', appts: 15, util: 45, revenue: 3200, growth: '+20%', staff: 4 },
  { name: 'Harbor Wing', appts: 33, util: 55, revenue: 7800, growth: '+15%', staff: 7 },
];

export default function LocationsOverview() {
  const displayedClinics = comparisonData; // Simulations showing more than 4 clinics

  return (
    <div className="flex flex-col space-y-10 animate-in fade-in duration-700 pb-24">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
         <div>
            <h1 className="text-3xl font-bold font-plus-jakarta text-[#111827] tracking-tight">Multi-Location Group Overview</h1>
            <p className="text-sm text-[#6B7280] font-medium mt-1">Real-time operational status across all {displayedClinics.length} active facilities.</p>
         </div>
         <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#0D9488] text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-[#0D9488]/20 hover:bg-[#0F766E] transition-all">
               <PlusIcon className="w-4 h-4" />
               Add New Location
            </button>
            <button className="flex items-center gap-2 bg-white border border-[#E2E8F0] px-5 py-2.5 rounded-2xl text-sm font-bold text-[#1e293b] shadow-sm hover:bg-[#F8FAFC] transition-all">
               <HomeModernIcon className="w-5 h-5 text-[#94A3B8]" />
               Manage Group Settings
            </button>
         </div>
      </div>

      {/* Dynamic Location Cards Grid - Handles > 4 locations with responsive wrap */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {displayedClinics.map((clinic, idx) => (
            <DataCard key={idx} className="relative overflow-hidden group hover:border-[#0D9488]/30 hover:shadow-xl transition-all duration-300">
               <div className="flex items-center justify-between mb-6">
                  <div className="p-2.5 rounded-xl bg-[#F0FDFA] text-[#0D9488] transition-all duration-500">
                     <MapPinIcon className="w-5 h-5" />
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    clinic.growth.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {clinic.growth}
                  </div>
               </div>
               
               <div>
                  <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">Entity-ID: #L00{idx+1}</p>
                  <h3 className="text-lg font-bold text-[#111827] tracking-tight mb-6">{clinic.name} Clinic</h3>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Utilization</p>
                        <p className="text-xl font-bold text-[#111827]">{clinic.util}%</p>
                     </div>
                     <div className="flex-1 max-w-[100px] mb-1 px-3">
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                           <div 
                              className="h-full bg-[#0D9488] rounded-full transition-all duration-1000" 
                              style={{ width: `${clinic.util}%` }} 
                           />
                        </div>
                     </div>
                  </div>
                  
                  <div className="pt-4 border-t border-[#F8FAFC] flex justify-between items-center">
                     <div className="flex items-center gap-1.5">
                        <UsersIcon className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span className="text-[11px] font-bold text-[#6B7280]">{clinic.appts} Appts</span>
                     </div>
                     <span className="text-xs font-bold text-[#111827]">€{clinic.revenue.toLocaleString()}</span>
                  </div>
               </div>
            </DataCard>
         ))}
      </div>

      {/* Refactored Section Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Detailed Comparison Table (Left Side - 2/3) */}
         <div className="lg:col-span-2">
            <DataCard title="Performance Audit" subtitle="Competitive network efficiency analysis">
               <div className="mt-8 overflow-hidden rounded-2xl border border-[#F1F5F9]">
                  <table className="min-w-full divide-y divide-[#F1F5F9]">
                     <thead className="bg-[#F8FAFC]">
                        <tr className="text-left text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">
                           <th className="px-6 py-5">Location Entity</th>
                           <th className="px-6 py-5 text-center">Efficiency</th>
                           <th className="px-6 py-5 text-center">Staffing</th>
                           <th className="px-6 py-5 text-right">Revenue MTD</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-[#F1F5F9] bg-white">
                        {displayedClinics.map(l => (
                           <tr key={l.name} className="text-sm group hover:bg-[#F0FDFA]/30 transition-colors">
                              <td className="px-6 py-5">
                                 <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#0D9488]" />
                                    <span className="font-bold text-[#111827] truncate">{l.name}</span>
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

         {/* Operational Notices (Right Side - 1/3 - Replaced Top Performers) */}
         <div className="lg:col-span-1 space-y-6">
            <DataCard title="Operational Notices" subtitle="Group-wide alerts & maintenance">
               <div className="space-y-4 mt-8">
                  {[
                     { location: 'Meridian North', event: 'MRI Scanner Calibration', date: 'April 15', type: 'Maintenance' },
                     { location: 'City Centre', event: 'Quarterly Staff Training', date: 'April 18', type: 'Training' },
                     { location: 'Meridian East', event: 'Telehealth Integration', date: 'April 22', type: 'Critical' },
                     { location: 'Westside Annex', event: 'HVAC Filter Replacement', date: 'April 25', type: 'Maintenance' },
                     { location: 'Harbor Wing', event: 'Regional Lead Audit', date: 'May 02', type: 'Audit' },
                  ].map((alert, i) => (
                     <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#F1F5F9] hover:border-[#0D9488]/30 transition-all shadow-sm">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-xl shrink-0 ${
                           alert.type === 'Critical' ? 'bg-rose-50 text-rose-500' : 
                           alert.type === 'Audit' ? 'bg-amber-50 text-amber-500' : 'bg-slate-50 text-slate-500'
                        }`}>
                           <ClockIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center justify-between mb-0.5">
                              <span className="text-[9px] font-black text-[#0D9488] uppercase tracking-wide">{alert.location}</span>
                              <span className="text-[9px] font-bold text-[#6B7280]">{alert.date}</span>
                           </div>
                           <p className="text-sm font-bold text-[#111827] truncate">{alert.event}</p>
                           <p className="text-[10px] text-[#6B7280] font-medium">{alert.type}</p>
                        </div>
                     </div>
                  ))}
               </div>
               <button className="w-full mt-6 py-4 bg-[#F8FAFC] rounded-2xl border border-dashed border-[#E2E8F0] text-xs font-bold text-[#6B7280] hover:bg-[#F0FDFA] hover:text-[#0D9488] hover:border-[#0D9488]/30 transition-all">
                  + Schedule New Group Notice
               </button>
            </DataCard>
         </div>
      </div>
    </div>
  );
}
