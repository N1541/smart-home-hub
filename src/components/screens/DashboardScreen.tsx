import { 
  Home, 
  Flame, 
  Droplets, 
  Lightbulb, 
  Fan, 
  Gauge,
  Settings2,
  Clock
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import ConnectionStatus from '@/components/ConnectionStatus';

const DashboardScreen = () => {
  const { 
    controlData, 
    monitoringData, 
    statusData, 
    isConnected, 
    isLoading,
    lastUpdated 
  } = useApp();

  const formatTime = (date: Date | null) => {
    if (!date) return 'Never';
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const isFireAlert = statusData?.fire === true;

  return (
    <div className="flex flex-col px-5 py-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl gradient-amber">
            <Home className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Smart Home</h1>
            <p className="text-xs text-muted-foreground">Control & Monitor</p>
          </div>
        </div>
        <ConnectionStatus isConnected={isConnected} isLoading={isLoading} />
      </div>

      {/* Fire Alert Banner */}
      {isFireAlert && (
        <div className="mb-4 p-4 rounded-xl bg-destructive/20 border border-destructive/50 flex items-center gap-3 animate-pulse">
          <Flame className="w-6 h-6 text-destructive" />
          <div>
            <p className="font-bold text-destructive">🔥 FIRE DETECTED!</p>
            <p className="text-sm text-destructive/80">Immediate attention required</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="glass-card rounded-xl p-8 text-center mb-4">
          <Gauge className="w-10 h-10 text-muted-foreground mx-auto mb-3 animate-pulse" />
          <p className="text-muted-foreground text-sm">Waiting for data...</p>
        </div>
      )}

      {/* Mode Status */}
      <div className="glass-card rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              controlData?.mode === 'AUTO' 
                ? 'bg-success/20 text-success' 
                : 'bg-primary/20 text-primary'
            }`}>
              <Settings2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Mode</p>
              <p className={`font-bold text-lg ${
                controlData?.mode === 'AUTO' ? 'text-success' : 'text-primary'
              }`}>
                {controlData?.mode || '--'}
              </p>
            </div>
          </div>
          <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
            controlData?.mode === 'AUTO'
              ? 'bg-success/20 text-success border border-success/30'
              : 'bg-primary/20 text-primary border border-primary/30'
          }`}>
            {controlData?.mode === 'AUTO' ? 'Automatic' : 'Manual Control'}
          </div>
        </div>
      </div>

      {/* Quick Status Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Light Status */}
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className={`w-5 h-5 ${
              controlData?.light === 'ON' ? 'text-primary' : 'text-muted-foreground'
            }`} />
            <span className="text-sm text-muted-foreground">Light</span>
          </div>
          <p className={`font-bold ${
            controlData?.light === 'ON' ? 'text-primary' : 'text-muted-foreground'
          }`}>
            {controlData?.light || '--'}
          </p>
        </div>

        {/* Fan Status */}
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Fan className={`w-5 h-5 ${
              controlData?.fan === 'ON' ? 'text-accent animate-spin-slow' : 'text-muted-foreground'
            }`} />
            <span className="text-sm text-muted-foreground">Fan</span>
          </div>
          <p className={`font-bold ${
            controlData?.fan === 'ON' ? 'text-accent' : 'text-muted-foreground'
          }`}>
            {controlData?.fan || '--'}
          </p>
        </div>

        {/* Pump Status */}
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className={`w-5 h-5 ${
              controlData?.pump === 'ON' ? 'text-blue-400' : 'text-muted-foreground'
            }`} />
            <span className="text-sm text-muted-foreground">Pump</span>
          </div>
          <p className={`font-bold ${
            controlData?.pump === 'ON' ? 'text-blue-400' : 'text-muted-foreground'
          }`}>
            {controlData?.pump || '--'}
          </p>
        </div>

        {/* Water Level */}
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className={`w-5 h-5 ${
              statusData?.waterLevel === 'FULL' ? 'text-success' : 'text-warning'
            }`} />
            <span className="text-sm text-muted-foreground">Water</span>
          </div>
          <p className={`font-bold ${
            statusData?.waterLevel === 'FULL' ? 'text-success' : 'text-warning'
          }`}>
            {statusData?.waterLevel || '--'}
          </p>
        </div>
      </div>

      {/* Power Summary */}
      <div className="glass-card rounded-xl p-4 mb-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Power Summary</p>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {monitoringData?.power?.toFixed(1) || '--'}
            </p>
            <p className="text-xs text-muted-foreground">Watts</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {monitoringData?.voltage?.toFixed(0) || '--'}
            </p>
            <p className="text-xs text-muted-foreground">Volts</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {monitoringData?.energy?.toFixed(3) || '--'}
            </p>
            <p className="text-xs text-muted-foreground">kWh</p>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
        <Clock className="w-3.5 h-3.5" />
        <span>Last updated: {formatTime(lastUpdated)}</span>
      </div>
    </div>
  );
};

export default DashboardScreen;
