import { Wifi, WifiOff, Loader2 } from 'lucide-react';

interface ConnectionStatusProps {
  isConnected: boolean;
  isLoading?: boolean;
}

const ConnectionStatus = ({ isConnected, isLoading }: ConnectionStatusProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border">
        <Loader2 className="w-3.5 h-3.5 text-muted-foreground animate-spin" />
        <span className="text-xs font-medium text-muted-foreground">Connecting...</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
      isConnected 
        ? 'bg-success/10 border border-success/30' 
        : 'bg-destructive/10 border border-destructive/30'
    }`}>
      <div className={`w-2 h-2 rounded-full ${
        isConnected 
          ? 'bg-success animate-pulse' 
          : 'bg-destructive'
      }`} />
      {isConnected ? (
        <Wifi className="w-3.5 h-3.5 text-success" />
      ) : (
        <WifiOff className="w-3.5 h-3.5 text-destructive" />
      )}
      <span className={`text-xs font-medium ${
        isConnected ? 'text-success' : 'text-destructive'
      }`}>
        {isConnected ? 'Live' : 'Offline'}
      </span>
    </div>
  );
};

export default ConnectionStatus;
