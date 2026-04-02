import { useLocation } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  ChevronDownIcon, 
  CalendarDaysIcon, 
  ArrowUpTrayIcon 
} from '@heroicons/react/24/outline';

export default function TopBar() {
  const location = useLocation();
  const path = location.pathname;

  // Context-aware logic for header buttons
  const showWeekly = path === '/' || path === '/calendar';
  const showExport = path === '/' || path === '/patients' || path === '/billing';

  return (
    <div className="h-20 bg-transparent flex items-center justify-between px-8 z-10">
      <div className="flex-1">
          <div className="relative max-w-sm">
             <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
             <input 
               type="text" 
               placeholder="Search clinical records..." 
               className="w-full bg-white border border-[#F1F5F9] rounded-2xl py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-4 focus:ring-brand-teal/5 focus:border-brand-teal outline-none shadow-sm transition-all"
             />
          </div>
      </div>

      <div className="flex items-center gap-4">
        {showWeekly && (
          <button className="flex items-center gap-2 bg-white border border-[#E2E8F0] px-4 py-2 rounded-2xl text-sm font-bold text-[#1e293b] shadow-sm hover:bg-[#F8FAFC] transition-all animate-in fade-in zoom-in-95 duration-300">
            <CalendarDaysIcon className="w-5 h-5 text-[#94A3B8]" />
            Weekly
            <ChevronDownIcon className="w-4 h-4 text-[#94A3B8]" />
          </button>
        )}

        {showExport && (
          <button className="flex items-center gap-2 bg-[#1e293b] text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all animate-in fade-in zoom-in-95 duration-300">
            <ArrowUpTrayIcon className="w-5 h-5 text-slate-300" />
            Export
            <ChevronDownIcon className="w-4 h-4 text-slate-300" />
          </button>
        )}
      </div>
    </div>
  );
}
