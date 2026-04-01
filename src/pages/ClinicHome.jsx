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
    trendValue: '84%', 
    chartType: 'semi-gauge',
    subtitle: 'Annual Goal Completion',
    detail: 'Received 10,400',
    color: '#4f46e5'
  },
  { 
    name: 'Appts Today', 
    value: '42', 
    trend: 'up', 
    trendValue: '4.2%', 
    chartType: 'smooth-curve',
    subtitle: 'vs last week',
    color: '#ec4899'
  },
  { 
    name: 'Rev MTD', 
    value: '€41,8k', 
    trend: 'down', 
    trendValue: '12.2%', 
    chartType: 'multi-bars',
    subtitle: 'Financial Target',
    detail: '€3,450 / day',
    color: '#10b981'
  },
  { 
    name: 'Staff On-Duty', 
    value: '18 / 24', 
    trend: 'neutral', 
    trendValue: 'Live', 
    chartType: 'ring-split',
    subtitle: 'Active Clinicians',
    color: '#3b82f6'
  },
];

export default function ClinicHome() {
  const nextAppointments = todayAppointments.slice(0, 5);

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-700 bg-slate-50/50 min-h-screen pb-20">
      {/* Refined Header */}
      <div className="flex items-center justify-between py-4">
         <div>
            <h1 className="text-3xl font-black font-plus-jakarta text-slate-900 tracking-tight">Physician Hub 2.0</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Real-time clinical insights and patient management.</p>
         </div>
         <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-all">
               <CalendarIcon className="w-4 h-4" />
               This Week
            </button>
            <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all">
               <PlusIcon className="w-4 h-4" />
               New Report
            </button>
         </div>
      </div>

      {/* High-Fidelity Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <DataCard key={stat.name} className="relative overflow-hidden group border-white/50 bg-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-100/40 transition-all duration-500 min-h-[220px]">
             <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                   <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">{stat.name}</span>
                   </div>
                   <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-rose-500' : 'text-indigo-600'
                   }`}>
                      {stat.trendValue}
                      {stat.trend !== 'neutral' && <div className={`w-1.5 h-1.5 rounded-full ${stat.trend === 'up' ? 'bg-green-500' : 'bg-rose-500'}`} />}
                   </div>
                </div>
                
                <h3 className="text-2xl font-black font-plus-jakarta text-slate-900 tracking-tighter mt-1">{stat.value}</h3>
                <p className="text-[10px] text-slate-400 font-bold mb-4">{stat.subtitle}</p>

                {/* Highly Specialized Visuals based on References */}
                <div className="mt-auto relative w-full h-24 overflow-hidden flex items-end">
                   {stat.chartType === 'semi-gauge' && (
                      <div className="w-full flex flex-col items-center justify-end relative h-full">
                         <svg className="w-36 h-20" viewBox="0 0 100 50">
                            <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f1f5f9" strokeWidth="12" strokeLinecap="round" />
                            <path d="M 10 50 A 40 40 0 0 1 75 22" fill="none" stroke={stat.color} strokeWidth="12" strokeLinecap="round" className="animate-in fade-in duration-1000" />
                         </svg>
                         <div className="absolute bottom-2 text-center">
                            <span className="text-sm font-black text-slate-900 leading-none">72%</span>
                            <p className="text-[8px] text-slate-400 font-bold uppercase mt-1">{stat.detail}</p>
                         </div>
                      </div>
                   )}

                   {stat.chartType === 'smooth-curve' && (
                      <div className="w-full h-full pt-4">
                         <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                            <path d="M 0 40 Q 25 10 50 30 T 100 20 L 100 40 L 0 40" fill="url(#blueGradient)" opacity="0.2" />
                            <path d="M 0 40 Q 25 10 50 30 T 100 20" fill="none" stroke={stat.color} strokeWidth="3" strokeLinecap="round" />
                            <defs>
                               <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor={stat.color} />
                                  <stop offset="100%" stopColor="transparent" />
                               </linearGradient>
                            </defs>
                         </svg>
                      </div>
                   )}

                   {stat.chartType === 'multi-bars' && (
                      <div className="flex items-end justify-between h-full w-full gap-2 px-1">
                         {[30, 70, 50, 90, 40, 100, 60].map((h, i) => (
                            <div key={i} className={`flex-1 rounded-sm transition-all duration-700 ${h === 100 ? 'bg-indigo-500' : 'bg-slate-100 group-hover:bg-indigo-100'}`} style={{ height: `${h}%` }} />
                         ))}
                      </div>
                   )}

                   {stat.chartType === 'ring-split' && (
                      <div className="w-full h-full flex items-center justify-between pr-2">
                         <div className="w-16 h-16 rounded-full border-[6px] border-slate-100 relative">
                            <div className="absolute inset-[-6px] rounded-full border-[6px] border-sky-400 border-r-transparent border-b-transparent transform -rotate-45" />
                         </div>
                         <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-sky-400" />
                               <span className="text-[10px] font-bold text-slate-600">63% Men</span>
                            </div>
                            <div className="flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-rose-400" />
                               <span className="text-[10px] font-bold text-slate-600">37% Women</span>
                            </div>
                         </div>
                      </div>
                   )}
                </div>
             </div>
          </DataCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 pb-12">
        {/* Schedule List - Optimized for Clarity (HDc Reference) */}
        <div className="lg:col-span-2">
          <DataCard title="Schedule List" subtitle="April 11, 2026" headerAction={
             <div className="flex items-center gap-2">
                <button className="p-1 px-2 text-xs font-bold bg-slate-50 border border-slate-100 rounded-lg text-slate-600 hover:bg-white">Today</button>
             </div>
          }>
            <div className="mt-8 space-y-4">
              {todayAppointments.map((appt, i) => (
                <div key={appt.id} className="group relative flex items-center gap-4">
                  <div className="w-12 text-right">
                    <span className="text-[11px] font-black text-slate-400 font-mono">{appt.time}</span>
                  </div>
                  <div className={`flex-1 flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                    i === 0 ? 'bg-sky-500 border-sky-400 text-white shadow-xl shadow-sky-100' : 'bg-slate-50/50 border-slate-100 text-slate-900 group-hover:bg-white group-hover:shadow-md'
                  }`}>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-current font-bold text-sm">
                          {appt.patient.name[0]}
                       </div>
                       <div>
                          <p className={`font-black text-sm tracking-tight ${i === 0 ? 'text-white' : 'text-slate-900'}`}>Appointment - {appt.patient.name}</p>
                          <p className={`text-[10px] font-bold mt-0.5 ${i === 0 ? 'text-sky-100' : 'text-slate-400'}`}>{appt.service} &bull; Dr. {appt.clinician.name}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <StatusBadge status={appt.status} className={i === 0 ? 'bg-white/20 text-white border-0' : ''} />
                        <button className={`p-2 rounded-xl transition-all ${i === 0 ? 'bg-white/20 text-white' : 'text-slate-300 hover:text-slate-500'}`}>
                           <span className="text-lg leading-none">...</span>
                        </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-slate-50 text-center">
               <button className="text-[11px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View Monthly Schedule</button>
            </div>
          </DataCard>
        </div>

        {/* Sidebar Management - Doctor Info & Quick Actions */}
        <div className="lg:col-span-1 space-y-8">
           <DataCard title="Appointment Requests" subtitle="Pending review">
              <div className="mt-6 space-y-4">
                 {[
                   { name: 'Leslie Alexander', type: 'Female, 25', time: 'April 12 - 9:30 am' },
                   { name: 'Jacob Jones', type: 'Male, 32', time: 'April 12 - 10:30 am', status: 'Accepted' }
                 ].map((req, i) => (
                   <div key={req.name} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 font-bold text-xs shrink-0">
                           {req.name[0]}
                        </div>
                        <div className="min-w-0">
                           <p className="text-xs font-black text-slate-900 truncate tracking-tight">{req.name}</p>
                           <p className="text-[10px] text-slate-400 font-bold mt-0.5 truncate">{req.time}</p>
                        </div>
                     </div>
                     {req.status ? (
                        <span className="px-3 py-1 bg-sky-50 text-sky-600 text-[10px] font-black rounded-lg">Accepted</span>
                     ) : (
                        <div className="flex gap-1">
                           <button className="w-7 h-7 bg-indigo-500 text-white rounded-lg flex items-center justify-center text-xs shadow-md">✓</button>
                           <button className="w-7 h-7 bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center text-xs">✕</button>
                        </div>
                     )}
                   </div>
                 ))}
              </div>
           </DataCard>
...
           <DataCard title="Available Doctors" subtitle="Ready for consultation">
              <div className="mt-6 space-y-4">
                 {clinicians.slice(0, 4).map((c, i) => (
                   <div key={c.name} className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                     <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${c.bgOpacity} flex items-center justify-center font-bold ${c.color} shrink-0 group-hover:scale-110 transition-transform`}>
                           {c.name.split('. ')[1][0]}
                        </div>
                        <div className="min-w-0">
                           <p className="text-xs font-black text-slate-900 truncate tracking-tight">{c.name}</p>
                           <p className="text-[10px] text-slate-400 font-bold mt-0.5 truncate">{c.specialty}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${i < 3 ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
                        <span className="text-[9px] font-black text-slate-400 tracking-tighter uppercase">{i < 3 ? 'Online' : 'Offline'}</span>
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
