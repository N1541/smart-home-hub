import { Lightbulb, Fan, Droplets, Settings2, Lock } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import ToggleCard from '@/components/ToggleCard';
import ConnectionStatus from '@/components/ConnectionStatus';
import { toast } from 'sonner';

const ControlScreen = () => {
  const { 
    controlData, 
    isConnected, 
    isLoading,
    setLight,
    setFan,
    setPump,
    setMode
  } = useApp();

  const isAutoMode = controlData?.mode === 'AUTO';

  const handleLightToggle = async (value: boolean) => {
    if (isAutoMode) return;
    await setLight(value ? 'ON' : 'OFF');
    toast.success(`Light turned ${value ? 'ON' : 'OFF'}`);
  };

  const handleFanToggle = async (value: boolean) => {
    if (isAutoMode) return;
    await setFan(value ? 'ON' : 'OFF');
    toast.success(`Fan turned ${value ? 'ON' : 'OFF'}`);
  };

  const handlePumpToggle = async (value: boolean) => {
    if (isAutoMode) return;
    await setPump(value ? 'ON' : 'OFF');
    toast.success(`Pump turned ${value ? 'ON' : 'OFF'}`);
  };

  const handleModeToggle = async (value: boolean) => {
    await setMode(value ? 'AUTO' : 'MANUAL');
    toast.success(`Mode set to ${value ? 'AUTO' : 'MANUAL'}`);
  };

  return (
    <div className="flex flex-col px-5 py-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Device Control</h1>
          <p className="text-sm text-muted-foreground">Manage your smart devices</p>
        </div>
        <ConnectionStatus isConnected={isConnected} isLoading={isLoading} />
      </div>

      {/* Auto Mode Warning */}
      {isAutoMode && (
        <div className="mb-4 p-3 rounded-xl bg-success/10 border border-success/30 flex items-center gap-3">
          <Lock className="w-5 h-5 text-success" />
          <div>
            <p className="font-semibold text-success text-sm">Auto Mode Active</p>
            <p className="text-xs text-success/80">Manual controls are disabled</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="glass-card rounded-xl p-6 text-center mb-4">
          <p className="text-muted-foreground text-sm">Waiting for data...</p>
        </div>
      )}

      {/* Mode Control */}
      <div className="mb-6">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3 px-1">System Mode</p>
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg transition-colors ${
                isAutoMode ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary'
              }`}>
                <Settings2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Operation Mode</h3>
                <p className={`text-sm font-medium ${
                  isAutoMode ? 'text-success' : 'text-primary'
                }`}>
                  {isAutoMode ? 'Automatic Control' : 'Manual Control'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium ${!isAutoMode ? 'text-primary' : 'text-muted-foreground'}`}>
                MANUAL
              </span>
              <button
                onClick={() => handleModeToggle(!isAutoMode)}
                className={`
                  relative w-14 h-7 rounded-full transition-colors duration-200
                  ${isAutoMode ? 'bg-success' : 'bg-secondary'}
                `}
              >
                <div className={`
                  absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200
                  ${isAutoMode ? 'translate-x-8' : 'translate-x-1'}
                `} />
              </button>
              <span className={`text-xs font-medium ${isAutoMode ? 'text-success' : 'text-muted-foreground'}`}>
                AUTO
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Device Controls */}
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3 px-1">Devices</p>
        
        <ToggleCard
          icon={<Lightbulb className="w-5 h-5" />}
          label="Light"
          description="Room lighting control"
          isOn={controlData?.light === 'ON'}
          onToggle={handleLightToggle}
          disabled={isAutoMode || !isConnected}
          variant="light"
        />

        <ToggleCard
          icon={<Fan className={`w-5 h-5 ${controlData?.fan === 'ON' ? 'animate-spin-slow' : ''}`} />}
          label="Fan"
          description="Ceiling fan control"
          isOn={controlData?.fan === 'ON'}
          onToggle={handleFanToggle}
          disabled={isAutoMode || !isConnected}
          variant="fan"
        />

        <ToggleCard
          icon={<Droplets className="w-5 h-5" />}
          label="Water Pump"
          description="Water pump control"
          isOn={controlData?.pump === 'ON'}
          onToggle={handlePumpToggle}
          disabled={isAutoMode || !isConnected}
          variant="pump"
        />
      </div>

      {/* Info Footer */}
      {!isConnected && !isLoading && (
        <div className="mt-6 p-3 rounded-xl bg-warning/10 border border-warning/30 text-center">
          <p className="text-warning text-sm">⚠️ Not connected to Firebase</p>
        </div>
      )}
    </div>
  );
};

export default ControlScreen;
