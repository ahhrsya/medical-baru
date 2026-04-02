export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) {
  const baseStyle = 'inline-flex items-center justify-center font-plus-jakarta font-extrabold text-sm transition-all duration-300 rounded-2xl px-6 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95';
  
  const variants = {
    primary: 'bg-brand-teal text-white shadow-lg shadow-brand-teal/20 hover:bg-brand-teal-dark',
    secondary: 'bg-white border border-[#E2E8F0] text-[#1e293b] hover:bg-[#F8FAFC] hover:border-[#CBD5E1]',
    ghost: 'text-[#64748B] hover:bg-brand-teal-light hover:text-brand-teal',
    danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-200',
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
