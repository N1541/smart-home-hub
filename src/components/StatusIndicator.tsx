import { Wifi, WifiOff } from 'lucide-react';

interface StatusIndicatorProps {
  isConnected: boolean;
}

const StatusIndicator = ({ isConnected }: StatusIndicatorProps) => {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full glass-card ${
      isConnected ? 'border-success/50' : 'border-destructive/50'
    }`}>
      <div className={`w-2.5 h-2.5 rounded-full ${
        isConnected 
          ? 'bg-success animate-pulse-glow glow-success' 
          : 'bg-destructive'
      }`} />
      {isConnected ? (
        <Wifi className="w-4 h-4 text-success" />
      ) : (
        <WifiOff className="w-4 h-4 text-destructive" />
      )}
      <span className={`text-sm font-medium ${
        isConnected ? 'text-success' : 'text-destructive'
      }`}>
        {isConnected ? 'Connected' : 'Disconnected'}
      </span>
    </div>
  );
};

export default StatusIndicator;
