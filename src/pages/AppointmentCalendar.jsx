import { useState } from 'react';
import { clinicians, todayAppointments } from '../lib/db';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  PlusIcon,
  CalendarDaysIcon,
  ListBulletIcon,
  TableCellsIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const timeSlots = [];
for (let i = 8; i <= 18; i++) {
  timeSlots.push(`${i}:00`);
  timeSlots.push(`${i}:30`);
}

// Simulated data expansion for more doctors
const extendedClinicians = [
  ...clinicians,
  { id: 5, name: 'Dr. Michael Scott', specialty: 'Dermatologist', color: 'text-rose-600', bgOpacity: 'bg-rose-50', border: 'border-rose-200' },
  { id: 6, name: 'Dr. Pam Beesly', specialty: 'Radiology', color: 'text-sky-600', bgOpacity: 'bg-sky-50', border: 'border-sky-200' },
  { id: 7, name: 'Dr. James Halpert', specialty: 'Cardiologist', color: 'text-indigo-600', bgOpacity: 'bg-indigo-50', border: 'border-indigo-200' },
  { id: 8, name: 'Dr. Angela Martin', specialty: 'Pediatrician', color: 'text-yellow-600', bgOpacity: 'bg-yellow-50', border: 'border-yellow-200' },
];

export default function AppointmentCalendar() {
  const [viewMode, setViewMode] = useState('Day');

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-700 pb-20">
      {/* Calendar Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-[#F1F5F9] shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold font-plus-jakarta text-[#111827] tracking-tight">Thursday, April 02</h2>
            <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mt-1">Multi-Resource View</p>
          </div>
          <div className="flex items-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-1.5 gap-1 shadow-sm">
            <button className="p-2 hover:bg-white rounded-xl transition-all"><ChevronLeftIcon className="w-5 h-5 text-[#64748B]" /></button>
            <button className="px-4 py-2 text-xs font-bold bg-white rounded-xl shadow-sm border border-[#E2E8F0] text-[#0D9488]">Today</button>
            <button className="p-2 hover:bg-white rounded-xl transition-all"><ChevronRightIcon className="w-5 h-5 text-[#64748B]" /></button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-1 gap-1">
            {[
              { label: 'Day', icon: CalendarDaysIcon },
              { label: 'Week', icon: ListBulletIcon },
              { label: 'Month', icon: TableCellsIcon }
            ].map(v => (
              <button 
                key={v.label}
                onClick={() => setViewMode(v.label)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  viewMode === v.label ? 'bg-white text-[#0D9488] shadow-sm border border-[#E2E8F0]' : 'text-[#64748B] hover:bg-white/50'
                }`}
              >
                <v.icon className="w-4 h-4" />
                {v.label}
              </button>
            ))}
          </div>

          <div className="h-8 w-[1px] bg-[#E2E8F0] mx-2 hidden md:block" />

          <button className="flex items-center gap-2 bg-[#0D9488] text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-[#0F766E] shadow-lg shadow-[#0D9488]/20 transition-all">
            <PlusIcon className="w-4 h-4" />
            New Appointment
          </button>
        </div>
      </div>

      {/* Main Container - Added Horizontal Scroll Capability */}
      {viewMode === 'Day' ? (
        <div className="flex-1 bg-white rounded-3xl border border-[#F1F5F9] shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col">
          {/* Scrollable Container Wrapper */}
          <div className="flex-1 overflow-x-auto overflow-y-hidden flex flex-col relative select-none group/scroll">
            
            {/* Headers - Clinician Columns */}
            <div className="flex border-b border-[#F1F5F9] bg-[#F8FAFC]/50 min-w-max">
              {/* Spacer for time axis */}
              <div className="sticky left-0 z-40 bg-[#F8FAFC] w-20 border-r border-[#F1F5F9]" />
              
              {extendedClinicians.map((clinician) => (
                <div key={clinician.id} className="w-[200px] px-6 py-5 border-r border-[#F1F5F9] text-center shrink-0">
                  <div className={`w-10 h-10 mx-auto rounded-xl ${clinician.bgOpacity} flex items-center justify-center font-bold ${clinician.color} mb-3 shadow-sm`}>
                    {clinician.name.split('. ')[1][0]}
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-[#111827]">{clinician.name}</p>
                  <p className="text-[9px] text-[#6B7280] font-bold mt-0.5">{clinician.specialty}</p>
                </div>
              ))}
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden min-w-max relative custom-scrollbar">
              <div className="flex min-h-full">
                {/* Fixed Time labels axis */}
                <div className="sticky left-0 z-30 w-20 flex-shrink-0 bg-white/80 backdrop-blur-md border-r border-[#F1F5F9]">
                  {timeSlots.map((time) => (
                    <div key={time} className="h-[60px] border-b border-[#F8FAFC] flex items-start justify-center pt-2">
                      <span className="text-[10px] font-mono font-black text-[#94A3B8]">{time}</span>
                    </div>
                  ))}
                </div>

                {/* Grid Columns */}
                <div className="flex relative flex-1">
                   {extendedClinicians.map((clinician) => (
                      <div key={clinician.id} className="w-[200px] border-r border-[#F1F5F9] relative h-full shrink-0 group hover:bg-[#F8FAFC]/30 transition-all">
                         {/* Horizontal Guide Lines */}
                         {timeSlots.map((time) => (
                            <div key={time} className="h-[60px] border-b border-[#F1F5F9]/30 w-full" />
                         ))}

                         {/* Appointment Slots - Filtered for Clinician */}
                         {todayAppointments
                          .filter(appt => appt.clinician.id === clinician.id)
                          .map((appt) => {
                            const hour = parseInt(appt.time.split(':')[0]);
                            const minute = parseInt(appt.time.split(':')[1]);
                            const offsetSlots = ((hour - 8) * 2) + (minute >= 30 ? 1 : 0);
                            const durationSlots = parseInt(appt.duration.split(' ')[0]) / 30;
                            
                            return (
                              <div 
                                key={appt.id}
                                className={`absolute left-3 right-3 rounded-2xl border-l-[6px] p-4 transition-all hover:scale-[1.02] hover:shadow-xl cursor-pointer z-10 group/appt ${clinician.bgOpacity} ${clinician.border}`}
                                style={{ top: `${offsetSlots * 60 + 6}px`, height: `${Math.max(durationSlots * 60 - 12, 50)}px` }}
                              >
                                <div className="flex flex-col h-full justify-between">
                                  <div>
                                    <p className="text-[11px] font-black text-[#111827] leading-tight mb-1">{appt.patient.name}</p>
                                    <p className="text-[10px] text-[#6B7280] font-bold truncate opacity-80">{appt.service}</p>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono font-bold text-[#64748B]">{appt.time}</span>
                                    <div className="w-2 h-2 rounded-full bg-[#0D9488]/30 animate-pulse" />
                                  </div>
                                </div>
                              </div>
                            )
                          })
                         }
                      </div>
                   ))}

                   {/* Current Time Indicator (Active Real-time simulation) */}
                   <div className="absolute left-0 right-0 h-[2px] bg-[#0D9488]/40 z-20 pointer-events-none" style={{ top: '240px' }}>
                      <div className="w-6 h-6 rounded-full bg-white border-2 border-[#0D9488] shadow-md flex items-center justify-center absolute -left-3 -top-[11px]">
                         <div className="w-2 h-2 rounded-full bg-[#0D9488]" />
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Custom Horizontal Scroll Visual Indicator (Floating Overlay) */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 p-2 bg-[#111827]/80 backdrop-blur-md rounded-xl text-white opacity-0 group-hover/scroll:opacity-100 transition-opacity pointer-events-none">
               <FunnelIcon className="w-4 h-4" />
               <span className="text-[10px] font-bold">Scroll horizontally to see {extendedClinicians.length} doctors</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 bg-[#F8FAFC] rounded-3xl border border-dashed border-[#E2E8F0] flex flex-col items-center justify-center space-y-4">
           <div className="w-16 h-16 rounded-3xl bg-white shadow-md flex items-center justify-center text-[#94A3B8]">
              <TableCellsIcon className="w-8 h-8" />
           </div>
           <p className="text-sm font-bold text-[#64748B]">Switching to {viewMode} View...</p>
           <button onClick={() => setViewMode('Day')} className="text-xs font-bold text-[#0D9488] underline">Return to Day (Doctor) View</button>
        </div>
      )}
    </div>
  );
}
