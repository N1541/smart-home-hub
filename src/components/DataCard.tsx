import { ReactNode } from 'react';

interface DataCardProps {
  icon: ReactNode;
  label: string;
  value: string | number | null;
  unit: string;
  isWarning?: boolean;
}

const DataCard = ({ icon, label, value, unit, isWarning }: DataCardProps) => {
  const displayValue = value !== null && value !== undefined 
    ? (typeof value === 'number' ? value.toFixed(2) : value)
    : '--';

  return (
    <div className={`
      glass-card rounded-xl p-4 transition-all
      ${isWarning ? 'border-destructive/50 bg-destructive/5' : ''}
    `}>
      <div className="flex items-center gap-2 mb-2">
        <div className={`
          p-1.5 rounded-lg 
          ${isWarning ? 'bg-destructive/20 text-destructive' : 'bg-primary/15 text-primary'}
        `}>
          {icon}
        </div>
        <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={`
          text-2xl font-bold tracking-tight
          ${isWarning ? 'text-destructive' : 'text-foreground'}
          ${value === null ? 'text-muted-foreground' : ''}
        `}>
          {displayValue}
        </span>
        <span className="text-muted-foreground text-sm">{unit}</span>
      </div>
    </div>
  );
};

export default DataCard;
