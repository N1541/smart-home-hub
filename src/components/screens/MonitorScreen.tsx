import { useEffect, useState } from 'react';
import { Zap, Activity, Gauge, Battery, RefreshCw, AlertTriangle, Clock } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { getStatus, CURRENT_THRESHOLD } from '@/lib/api';
import SensorCard from '@/components/SensorCard';
import StatusIndicator from '@/components/StatusIndicator';
import { toast } from 'sonner';

const MonitorScreen = () => {
  const { 
    espIpAddress, 
    isConnected, 
    sensorData, 
    setSensorData,
    lastUpdated,
    setLastUpdated,
    error,
    setError
  } = useApp();
  
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchSensorData = async () => {
    if (!isConnected || !espIpAddress) return;

    setIsRefreshing(true);
    try {
      const data = await getStatus(espIpAddress);
      setSensorData(data);
      setLastUpdated(new Date());
      setError(null);

      // Check for high current warning
      if (data.current > CURRENT_THRESHOLD) {
        toast.warning(`High current detected: ${data.current}A`, {
          duration: 3000,
        });
      }
    } catch (err) {
      setError('Failed to fetch sensor data');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Auto-refresh every second
  useEffect(() => {
    if (!isConnected) return;

    fetchSensorData();
    const interval = setInterval(fetchSensorData, 1000);

    return () => clearInterval(interval);
  }, [isConnected, espIpAddress]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const isCurrentHigh = sensorData && sensorData.current > CURRENT_THRESHOLD;

  return (
    <div className="flex flex-col px-6 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Energy Monitor</h1>
          <p className="text-muted-foreground text-sm">Real-time sensor data</p>
        </div>
        <StatusIndicator isConnected={isConnected} />
      </div>

      {/* Last Updated & Refresh */}
      <div className="flex items-center justify-between mb-6">
        {lastUpdated && (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Clock className="w-4 h-4" />
            <span>Last updated: {formatTime(lastUpdated)}</span>
          </div>
        )}
        <button
          onClick={fetchSensorData}
          disabled={!isConnected || isRefreshing}
          className="flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-lg
                   text-muted-foreground hover:text-foreground transition-colors
                   disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="text-sm">Refresh</span>
        </button>
      </div>

      {/* Warning Alert */}
      {isCurrentHigh && (
        <div className="glass-card rounded-xl p-4 mb-6 border-destructive/50 bg-destructive/10 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0" />
          <div>
            <p className="text-destructive font-semibold">High Current Alert!</p>
            <p className="text-destructive/80 text-sm">
              Current exceeds safe limit of {CURRENT_THRESHOLD}A
            </p>
          </div>
        </div>
      )}

      {/* Connection Warning */}
      {!isConnected && (
        <div className="glass-card rounded-xl p-4 mb-6 border-warning/50 bg-warning/10">
          <p className="text-warning text-sm text-center">
            ⚠️ Connect to ESP32 from the Home tab to view sensor data
          </p>
        </div>
      )}

      {/* Error Alert */}
      {error && isConnected && (
        <div className="glass-card rounded-xl p-4 mb-6 border-destructive/50 bg-destructive/10">
          <p className="text-destructive text-sm text-center">
            ⚠️ {error}
          </p>
        </div>
      )}

      {/* Sensor Data Grid */}
      {isConnected && sensorData ? (
        <div className="grid grid-cols-2 gap-4">
          <SensorCard
            icon={<Zap className="w-5 h-5" />}
            label="Voltage"
            value={sensorData.voltage}
            unit="V"
          />
          <SensorCard
            icon={<Activity className="w-5 h-5" />}
            label="Current"
            value={sensorData.current}
            unit="A"
            isWarning={isCurrentHigh}
          />
          <SensorCard
            icon={<Gauge className="w-5 h-5" />}
            label="Power"
            value={sensorData.power}
            unit="W"
          />
          <SensorCard
            icon={<Battery className="w-5 h-5" />}
            label="Energy"
            value={sensorData.energy}
            unit="kWh"
          />
        </div>
      ) : isConnected ? (
        <div className="glass-card rounded-2xl p-8 text-center">
          <RefreshCw className="w-12 h-12 text-muted-foreground mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Loading sensor data...</p>
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-8 text-center">
          <Gauge className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">No data available</p>
          <p className="text-muted-foreground text-sm mt-2">Connect to ESP32 to see readings</p>
        </div>
      )}

      {/* Info Footer */}
      <div className="mt-8 text-center text-muted-foreground text-xs">
        <p>Data refreshes automatically every second</p>
        <p className="mt-1">Current threshold: {CURRENT_THRESHOLD}A</p>
      </div>
    </div>
  );
};

export default MonitorScreen;
