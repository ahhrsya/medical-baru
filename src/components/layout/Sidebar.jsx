import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  CalendarIcon, 
  UsersIcon, 
  MapPinIcon, 
  ChatBubbleOvalLeftIcon, 
  BellIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  ClipboardDocumentCheckIcon,
  ShieldCheckIcon,
  MoonIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '/' },
  { name: 'Calendar', icon: CalendarIcon, href: '/calendar' },
  { name: 'Patient Directory', icon: UsersIcon, href: '/patients' },
  { name: 'Book Appt', icon: ClipboardDocumentCheckIcon, href: '/booking' },
  { name: 'Consultation Notes', icon: ClipboardDocumentCheckIcon, href: '/notes' },
  { name: 'Locations', icon: MapPinIcon, href: '/locations' },
  { name: 'Communications', icon: ChatBubbleOvalLeftIcon, href: '/communications' },
  { name: 'Billing', icon: CreditCardIcon, href: '/billing' },
];

const secondaryNavigation = [
  { name: 'Settings', icon: Cog6ToothIcon, href: '/settings' },
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white border-r border-[#F1F5F9] z-50 shadow-sm">
      {/* Brand Logo - Updated to brand-teal */}
      <div className="flex items-center gap-3 px-6 h-20">
        <div className="w-10 h-10 rounded-xl bg-[#0D9488] flex items-center justify-center text-white shadow-lg shadow-[#0D9488]/20 shrink-0">
          <ShieldCheckIcon className="w-6 h-6" />
        </div>
        <span className="text-xl font-bold font-plus-jakarta text-[#111827] tracking-tight truncate">MediBook</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
        <nav className="flex flex-col gap-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => `
                group flex items-center justify-between px-3 py-2.5 text-sm font-bold rounded-xl transition-all
                ${isActive 
                  ? 'bg-[#0D9488] text-white shadow-lg shadow-[#0D9488]/10' 
                  : 'text-[#6B7280] hover:bg-[#F0FDFA] hover:text-[#0D9488]'}
              `}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 shrink-0" />
                {item.name}
              </div>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="px-4 py-4 border-t border-[#F1F5F9] space-y-1">
        {secondaryNavigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-[#6B7280] hover:bg-[#F0FDFA] hover:text-[#0D9488] rounded-xl transition-all"
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
        
        <div className="flex items-center justify-between px-3 py-2.5 text-sm font-bold text-[#6B7280]">
           <div className="flex items-center gap-3">
              <MoonIcon className="h-5 w-5" />
              Dark Mode
           </div>
           <div className="w-9 h-5 bg-[#F1F5F9] rounded-full relative p-0.5 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full shadow-sm ring-1 ring-[#E5E7EB]" />
           </div>
        </div>

        {/* Profile Card Bottom */}
        <div className="mt-4 p-3 bg-[#F8FAFC] rounded-2xl border border-[#F1F5F9] flex items-center justify-between group cursor-pointer transition-all hover:border-[#0D9488]/30">
          <div className="flex items-center gap-3 text-left">
             <div className="w-10 h-10 rounded-full bg-[#E2E8F0] overflow-hidden shrink-0 ring-2 ring-white">
                <div className="w-full h-full bg-[#0D9488]/10 flex items-center justify-center text-[#0D9488] font-bold text-xs uppercase">AF</div>
             </div>
             <div className="min-w-0">
                <p className="text-xs font-bold text-[#111827] leading-tight truncate">Alice Fisher</p>
                <p className="text-[10px] text-[#6B7280] font-medium leading-tight uppercase tracking-wider">Super Admin</p>
             </div>
          </div>
          <div className="text-[#94A3B8] text-[10px]">↕</div>
        </div>
      </div>
    </aside>
  );
}
