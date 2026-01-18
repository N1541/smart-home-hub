import { Zap, Activity, Gauge, Battery, Clock, RefreshCw } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import DataCard from '@/components/DataCard';
import ConnectionStatus from '@/components/ConnectionStatus';

const MonitorScreen = () => {
  const { 
    monitoringData, 
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

  // Current threshold for visual warning
  const CURRENT_THRESHOLD = 5.0;
  const isCurrentHigh = monitoringData && monitoringData.current > CURRENT_THRESHOLD;

  return (
    <div className="flex flex-col px-5 py-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Energy Monitor</h1>
          <p className="text-sm text-muted-foreground">Real-time sensor data</p>
        </div>
        <ConnectionStatus isConnected={isConnected} isLoading={isLoading} />
      </div>

      {/* Last Updated */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Clock className="w-4 h-4" />
          <span>Updated: {formatTime(lastUpdated)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
          <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Live</span>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="glass-card rounded-xl p-8 text-center mb-4">
          <RefreshCw className="w-10 h-10 text-muted-foreground mx-auto mb-3 animate-spin" />
          <p className="text-muted-foreground text-sm">Waiting for data...</p>
        </div>
      )}

      {/* High Current Warning */}
      {isCurrentHigh && (
        <div className="mb-4 p-3 rounded-xl bg-destructive/15 border border-destructive/40 flex items-center gap-3">
          <Activity className="w-5 h-5 text-destructive" />
          <div>
            <p className="font-semibold text-destructive text-sm">High Current Alert!</p>
            <p className="text-xs text-destructive/80">Current exceeds {CURRENT_THRESHOLD}A threshold</p>
          </div>
        </div>
      )}

      {/* Sensor Data Grid */}
      {isConnected && !isLoading ? (
        <div className="grid grid-cols-2 gap-3">
          <DataCard
            icon={<Zap className="w-4 h-4" />}
            label="Voltage"
            value={monitoringData?.voltage ?? null}
            unit="V"
          />
          <DataCard
            icon={<Activity className="w-4 h-4" />}
            label="Current"
            value={monitoringData?.current ?? null}
            unit="A"
            isWarning={isCurrentHigh}
          />
          <DataCard
            icon={<Gauge className="w-4 h-4" />}
            label="Power"
            value={monitoringData?.power ?? null}
            unit="W"
          />
          <DataCard
            icon={<Battery className="w-4 h-4" />}
            label="Energy"
            value={monitoringData?.energy ?? null}
            unit="kWh"
          />
        </div>
      ) : !isLoading ? (
        <div className="glass-card rounded-xl p-8 text-center">
          <Gauge className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground font-medium">No data available</p>
          <p className="text-muted-foreground text-sm mt-1">Check Firebase connection</p>
        </div>
      ) : null}

      {/* Total Energy Highlight */}
      {monitoringData && isConnected && (
        <div className="mt-4 glass-card rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Energy Consumed</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold text-primary">
                  {monitoringData.energy?.toFixed(3) || '0.000'}
                </span>
                <span className="text-muted-foreground">kWh</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-primary/15">
              <Battery className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
      )}

      {/* Info Footer */}
      <div className="mt-6 text-center text-muted-foreground text-xs space-y-1">
        <p>Data synced via Firebase Realtime Database</p>
        <p>ESP32 → Firebase → This App</p>
      </div>
    </div>
  );
};

export default MonitorScreen;
