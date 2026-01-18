import { ReactNode } from 'react';

interface SensorCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  unit: string;
  isWarning?: boolean;
}

const SensorCard = ({ icon, label, value, unit, isWarning }: SensorCardProps) => {
  return (
    <div className={`
      glass-card rounded-xl p-5 animate-fade-in
      ${isWarning ? 'border-destructive/50 bg-destructive/10' : ''}
    `}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`
          p-2 rounded-lg 
          ${isWarning ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-primary'}
        `}>
          {icon}
        </div>
        <span className="text-muted-foreground text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`
          text-3xl font-bold tracking-tight
          ${isWarning ? 'text-destructive' : 'text-foreground'}
        `}>
          {typeof value === 'number' ? value.toFixed(2) : value}
        </span>
        <span className="text-muted-foreground text-lg">{unit}</span>
      </div>
    </div>
  );
};

export default SensorCard;
