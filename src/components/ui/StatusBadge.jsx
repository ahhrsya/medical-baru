export default function StatusBadge({ status, className = "" }) {
  const getStatusStyles = (s) => {
    const statusLower = s?.toLowerCase().replace(/\s+/g, '');
    
    // Maricare Brand Theme Mappings (PRD/Style compliant)
    const config = {
      available: 'bg-teal-50 text-teal-700 border-teal-100',
      unavailable: 'bg-rose-50 text-rose-600 border-rose-100',
      confirmed: 'bg-teal-50 text-teal-700 border-teal-100',
      paid: 'bg-teal-50 text-teal-700 border-teal-100',
      pending: 'bg-amber-50 text-amber-700 border-amber-100',
      scheduled: 'bg-teal-50 text-teal-700 border-teal-100',
      completed: 'bg-gray-50 text-gray-500 border-gray-100',
      checkedin: 'bg-green-50 text-green-700 border-green-100',
      noshow: 'bg-rose-50 text-rose-700 border-rose-100',
      cancelled: 'bg-gray-50 text-gray-400 border-gray-100',
    };

    return config[statusLower] || 'bg-slate-50 text-slate-500 border-slate-100';
  };

  return (
    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all duration-300 ${getStatusStyles(status)} ${className}`}>
      {status}
    </span>
  );
}
