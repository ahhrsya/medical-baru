import DataCard from '../components/ui/DataCard';
import StatusBadge from '../components/ui/StatusBadge';
import { 
  UsersIcon, 
  CalendarIcon, 
  BanknotesIcon, 
  ChartBarIcon, 
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { clinics, todayAppointments, clinicians } from '../lib/db';

const stats = [
  { 
    name: 'Total Patients', 
    value: '12,842', 
    trend: 'up', 
    trendValue: '12%', 
    chartType: 'growth-line',
    subtitle: 'Active records in database',
    detail: '+142 this month',
    color: '#0D9488' // brand-teal
  },
  { 
    name: 'Appts Today', 
    value: '42', 
    trend: 'up', 
    trendValue: '4.2%', 
    chartType: 'smooth-curve',
    subtitle: 'Confirmed consultations',
    color: '#0D9488'
  },
  { 
    name: 'Revenue MTD', 
    value: '€41,8k', 
    trend: 'up', 
    trendValue: '8.4%', 
    chartType: 'multi-bars',
    subtitle: 'Monthly target: €50k',
    color: '#0D9488'
  },
  { 
    name: 'Clinic Utilization', 
    value: '78%', 
    trend: 'up', 
    trendValue: 'Live', 
    chartType: 'utilization-gauge',
    subtitle: 'Filled Slots vs Capacity',
    detail: '18 / 24 Active Rooms',
    color: '#0D9488'
  },
];

export default function ClinicHome() {
  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-700 bg-[#F8FAFC] min-h-screen pb-20">
      {/* Refined Header */}
      <div className="flex items-center justify-between py-6">
         <div>
            <h1 className="text-3xl font-bold font-plus-jakarta text-[#111827] tracking-tight">Physician Dashboard</h1>
            <p className="text-sm text-[#6B7280] font-medium mt-1">European Clinic Chain Management & Analytics</p>
         </div>
         <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2 rounded-xl text-sm font-semibold text-[#6B7280] shadow-sm hover:bg-[#F0FDFA] transition-all">
               <CalendarIcon className="w-4 h-4" />
               View Calendar
            </button>
            <button className="flex items-center gap-2 bg-[#0D9488] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-[#0D9488]/20 hover:bg-[#0F766E] transition-all">
               <PlusIcon className="w-4 h-4" />
               New Appointment
            </button>
         </div>
      </div>

      {/* High-Fidelity Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <DataCard key={stat.name} className="relative overflow-hidden group border-white/50 bg-white shadow-sm hover:shadow-xl hover:border-[#0D9488]/20 transition-all duration-500 min-h-[180px]">
             <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">{stat.name}</span>
                   </div>
                   <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      stat.trend === 'up' ? 'text-[#0D9488] bg-[#F0FDFA]' : 'text-rose-500 bg-rose-50'
                   }`}>
                      {stat.trendValue}
                      <ArrowTrendingUpIcon className={`w-3 h-3 ${stat.trend === 'up' ? 'rotate-0' : 'rotate-180'}`} />
                   </div>
                </div>
                
                <h3 className="text-3xl font-bold font-plus-jakarta text-[#111827] tracking-tighter">{stat.value}</h3>
                <p className="text-xs text-[#6B7280] font-medium mt-1">{stat.subtitle}</p>

                {/* Refined Data Visualizations */}
                <div className="mt-auto relative w-full h-16 pt-4">
                   {stat.chartType === 'growth-line' && (
                      <div className="w-full h-full">
                         <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                            <path d="M 0 30 L 10 25 L 25 28 L 40 18 L 60 22 L 80 8 L 100 5 L 100 30 Z" fill="#0D9488" opacity="0.1" />
                            <path d="M 0 30 L 10 25 L 25 28 L 40 18 L 60 22 L 80 8 L 100 5" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                         </svg>
                      </div>
                   )}

                   {stat.chartType === 'smooth-curve' && (
                      <div className="w-full h-full">
                         <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                            <path d="M 0 30 Q 25 5 50 25 T 100 10 L 100 30 Z" fill="#0D9488" opacity="0.1" />
                            <path d="M 0 30 Q 25 5 50 25 T 100 10" fill="none" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" />
                         </svg>
                      </div>
                   )}

                   {stat.chartType === 'multi-bars' && (
                      <div className="flex items-end justify-between h-full w-full gap-1.5">
                         {[40, 70, 50, 90, 60, 100, 80].map((h, i) => (
                            <div key={i} className={`flex-1 rounded-t-lg transition-all duration-700 ${h === 100 ? 'bg-[#0D9488]' : 'bg-[#CCFBF1]'}`} style={{ height: `${h}%` }} />
                         ))}
                      </div>
                   )}

                   {stat.chartType === 'utilization-gauge' && (
                      <div className="w-full h-full">
                         <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold text-[#6B7280]">{stat.detail}</span>
                            <span className="text-[10px] font-bold text-[#0D9488]">78%</span>
                         </div>
                         <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                            <div className="h-full bg-[#0D9488] rounded-full" style={{ width: '78%' }} />
                         </div>
                      </div>
                   )}
                </div>
             </div>
          </DataCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4 pb-12">
        <div className="lg:col-span-2">
          <DataCard title="Today's Schedule" subtitle="Real-time check-in status" headerAction={
             <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#0D9488] bg-[#F0FDFA] px-2 py-1 rounded-md uppercase">4 Check-ins pending</span>
             </div>
          }>
            <div className="mt-8 space-y-3">
              {todayAppointments.map((appt, i) => (
                <div key={appt.id} className="group relative flex items-center gap-4">
                  <div className="w-16 text-right">
                    <p className="text-xs font-bold text-[#111827] font-mono leading-none">{appt.time}</p>
                    <p className="text-[10px] text-[#6B7280] font-medium mt-1 uppercase">30m</p>
                  </div>
                  <div className={`flex-1 flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                    appt.status === 'Checked In' ? 'bg-[#F0FDFA] border-[#CCFBF1] shadow-sm' : 'bg-white border-[#F1F5F9] hover:border-[#0D9488]/30 hover:shadow-md'
                  }`}>
                    <div className="flex items-center gap-4 text-left">
                       <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#111827] font-bold text-sm">
                          {appt.patient.name[0]}
                       </div>
                       <div>
                          <p className="font-bold text-sm text-[#111827] tracking-tight">{appt.patient.name}</p>
                          <p className="text-[10px] text-[#6B7280] font-medium mt-0.5">{appt.service} &bull; {appt.clinician.name}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <StatusBadge status={appt.status} className={appt.status === 'Checked In' ? 'bg-[#0D9488] text-white border-0' : 'bg-[#F1F5F9] text-[#6B7280] border-0'} />
                        <button className="p-2 rounded-xl text-[#CBD5E1] hover:text-[#111827] transition-colors">
                           <ClockIcon className="w-5 h-5" />
                        </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-[#F1F5F9] text-center">
               <button className="text-xs font-bold text-[#0D9488] hover:underline">View Full Calendar</button>
            </div>
          </DataCard>
        </div>

        {/* Sidebar Management */}
        <div className="lg:col-span-1 space-y-8">
           <DataCard title="Appointment Intake" subtitle="Pending confirmation">
              <div className="mt-6 space-y-4">
                 {[
                   { name: 'Leslie Alexander', type: 'Initial Consult', time: '09:30 am', color: '#0D9488' },
                   { name: 'Jacob Jones', type: 'Follow Up', time: '10:30 am', status: 'Confirmed' }
                 ].map((req, i) => (
                   <div key={req.name} className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#F1F5F9] hover:border-[#0D9488]/30 transition-all group">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#F0FDFA] flex items-center justify-center text-[#0D9488] font-bold text-xs">
                           {req.name[0]}
                        </div>
                        <div className="min-w-0">
                           <p className="text-xs font-bold text-[#111827] truncate">{req.name}</p>
                           <p className="text-[10px] text-[#6B7280] font-medium mt-0.5 truncate">{req.type} &bull; {req.time}</p>
                        </div>
                     </div>
                     {req.status ? (
                        <CheckCircleIcon className="w-5 h-5 text-[#10B981]" />
                     ) : (
                        <div className="flex gap-1.5">
                           <button className="w-8 h-8 bg-[#0D9488] text-white rounded-lg flex items-center justify-center text-xs hover:bg-[#0F766E] transition-colors">✓</button>
                           <button className="w-8 h-8 bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center text-xs hover:bg-rose-100 transition-colors">✕</button>
                        </div>
                     )}
                   </div>
                 ))}
              </div>
           </DataCard>

           <DataCard title="Clinician Shifts" subtitle="Today's active availability">
              <div className="mt-6 space-y-4">
                 {clinicians.slice(0, 4).map((c, i) => (
                   <div key={c.name} className="flex flex-col p-4 rounded-2xl bg-white border border-[#F1F5F9] hover:border-[#0D9488]/30 transition-all gap-3">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className={`w-10 h-10 rounded-xl ${c.bgOpacity} flex items-center justify-center font-bold ${c.color} shrink-0`}>
                              {c.name.split('. ')[1][0]}
                           </div>
                           <div className="min-w-0">
                              <p className="text-xs font-bold text-[#111827] truncate">{c.name}</p>
                              <p className="text-[10px] text-[#6B7280] font-medium truncate">{c.specialty}</p>
                           </div>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${i < 3 ? 'bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-[#CBD5E1]'}`} />
                     </div>
                     <div className="flex items-center justify-between pt-2 border-t border-[#F8FAFC]">
                        <div className="flex items-center gap-1.5">
                           <ClockIcon className="w-3.5 h-3.5 text-[#6B7280]" />
                           <span className="text-[10px] font-bold text-[#6B7280]">09:00 - 17:00</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#0D9488] bg-[#F0FDFA] px-2 py-0.5 rounded-full lowercase">
                           {i === 1 ? 'In consultation' : i === 3 ? 'On break' : 'Next: 14:30'}
                        </span>
                     </div>
                   </div>
                 ))}
              </div>
           </DataCard>
        </div>
      </div>
    </div>
  );
}
