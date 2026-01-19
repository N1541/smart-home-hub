import { Switch } from '@/components/ui/switch';
import { ReactNode } from 'react';

interface ToggleCardProps {
  icon: ReactNode;
  label: string;
  description?: string;
  isOn: boolean;
  onToggle: (value: boolean) => void;
  disabled?: boolean;
  variant?: 'light' | 'fan' | 'pump' | 'mode' | 'fire';
}

const ToggleCard = ({ 
  icon, 
  label, 
  description, 
  isOn, 
  onToggle, 
  disabled,
  variant = 'light'
}: ToggleCardProps) => {
  const getAccentColor = () => {
    if (!isOn) return 'bg-secondary text-muted-foreground';
    switch (variant) {
      case 'light': return 'bg-primary/20 text-primary';
      case 'fan': return 'bg-accent/20 text-accent';
      case 'pump': return 'bg-blue-500/20 text-blue-400';
      case 'mode': return 'bg-success/20 text-success';
      case 'fire': return 'bg-destructive/20 text-destructive';
      default: return 'bg-primary/20 text-primary';
    }
  };

  const getStatusColor = () => {
    if (!isOn) return 'text-muted-foreground';
    switch (variant) {
      case 'light': return 'text-primary';
      case 'fan': return 'text-accent';
      case 'pump': return 'text-blue-400';
      case 'mode': return 'text-success';
      case 'fire': return 'text-destructive';
      default: return 'text-primary';
    }
  };

  return (
    <div className={`
      glass-card rounded-xl p-4 transition-all duration-200
      ${disabled ? 'opacity-60' : ''}
      ${isOn ? 'border-primary/30' : ''}
    `}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg transition-colors ${getAccentColor()}`}>
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{label}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            <p className={`text-xs font-medium mt-0.5 ${getStatusColor()}`}>
              {isOn ? 'ON' : 'OFF'}
            </p>
          </div>
        </div>
        <Switch
          checked={isOn}
          onCheckedChange={onToggle}
          disabled={disabled}
          className="data-[state=checked]:bg-primary"
        />
      </div>
    </div>
  );
};

export default ToggleCard;
