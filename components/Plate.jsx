export default function Plate({ children, dark, className = '' }) {
  const color = dark ? 'text-red-300' : 'text-red-600';
  return (
    <span className={`inline-flex items-center gap-2 font-semibold text-xs uppercase tracking-widest ${color} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {children}
    </span>
  );
}
