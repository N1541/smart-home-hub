import { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface ControlButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'light-on' | 'light-off' | 'fan-on' | 'fan-off';
  isLoading?: boolean;
  isActive?: boolean;
  icon: React.ReactNode;
  label: string;
}

const ControlButton = ({ 
  variant, 
  isLoading, 
  isActive,
  icon, 
  label, 
  disabled,
  ...props 
}: ControlButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'light-on':
        return isActive
          ? 'gradient-amber text-primary-foreground glow-amber'
          : 'bg-secondary hover:bg-light-amber/20 text-foreground border border-light-amber/30';
      case 'light-off':
        return 'bg-secondary hover:bg-muted text-foreground border border-border';
      case 'fan-on':
        return isActive
          ? 'gradient-cyan text-accent-foreground glow-cyan'
          : 'bg-secondary hover:bg-fan-cyan/20 text-foreground border border-fan-cyan/30';
      case 'fan-off':
        return 'bg-secondary hover:bg-muted text-foreground border border-border';
      default:
        return 'bg-secondary text-foreground';
    }
  };

  return (
    <button
      className={`
        flex flex-col items-center justify-center gap-3 p-6 rounded-xl
        transition-all duration-300 transform
        ${getVariantStyles()}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
        min-w-[120px] min-h-[120px]
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-10 h-10 animate-spin" />
      ) : (
        <div className={`w-10 h-10 ${isActive && (variant === 'fan-on') ? 'animate-spin-slow' : ''}`}>
          {icon}
        </div>
      )}
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
};

export default ControlButton;
