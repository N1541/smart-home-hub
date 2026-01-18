import { useState } from 'react';
import { Lightbulb, Fan, Power, PowerOff } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { controlLight, controlFan } from '@/lib/api';
import ControlButton from '@/components/ControlButton';
import StatusIndicator from '@/components/StatusIndicator';
import { toast } from 'sonner';

const ControlScreen = () => {
  const { 
    espIpAddress, 
    isConnected, 
    lightStatus, 
    setLightStatus, 
    fanStatus, 
    setFanStatus 
  } = useApp();
  
  const [isLightLoading, setIsLightLoading] = useState(false);
  const [isFanLoading, setIsFanLoading] = useState(false);

  const handleLightControl = async (turnOn: boolean) => {
    if (!isConnected) {
      toast.error('Not connected to ESP32');
      return;
    }

    setIsLightLoading(true);
    try {
      const success = await controlLight(espIpAddress, turnOn);
      if (success) {
        setLightStatus(turnOn);
        toast.success(`Light turned ${turnOn ? 'ON' : 'OFF'}`);
      } else {
        toast.error('Failed to control light');
      }
    } catch (err) {
      toast.error('Connection error. Check ESP32.');
    } finally {
      setIsLightLoading(false);
    }
  };

  const handleFanControl = async (turnOn: boolean) => {
    if (!isConnected) {
      toast.error('Not connected to ESP32');
      return;
    }

    setIsFanLoading(true);
    try {
      const success = await controlFan(espIpAddress, turnOn);
      if (success) {
        setFanStatus(turnOn);
        toast.success(`Fan turned ${turnOn ? 'ON' : 'OFF'}`);
      } else {
        toast.error('Failed to control fan');
      }
    } catch (err) {
      toast.error('Connection error. Check ESP32.');
    } finally {
      setIsFanLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-6 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Device Control</h1>
          <p className="text-muted-foreground text-sm">Manage your smart devices</p>
        </div>
        <StatusIndicator isConnected={isConnected} />
      </div>

      {!isConnected && (
        <div className="glass-card rounded-xl p-4 mb-6 border-warning/50 bg-warning/10">
          <p className="text-warning text-sm text-center">
            ⚠️ Connect to ESP32 from the Home tab first
          </p>
        </div>
      )}

      {/* Light Control Section */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-lg ${lightStatus ? 'bg-primary/30 text-primary' : 'bg-secondary text-muted-foreground'}`}>
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Light Control</h2>
            <p className="text-sm text-muted-foreground">
              Status: <span className={lightStatus ? 'text-primary' : 'text-muted-foreground'}>{lightStatus ? 'ON' : 'OFF'}</span>
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <ControlButton
            variant="light-on"
            isActive={lightStatus}
            isLoading={isLightLoading}
            disabled={!isConnected}
            icon={<Power className="w-full h-full" />}
            label="Turn ON"
            onClick={() => handleLightControl(true)}
          />
          <ControlButton
            variant="light-off"
            isLoading={isLightLoading}
            disabled={!isConnected}
            icon={<PowerOff className="w-full h-full" />}
            label="Turn OFF"
            onClick={() => handleLightControl(false)}
          />
        </div>
      </div>

      {/* Fan Control Section */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-lg ${fanStatus ? 'bg-accent/30 text-accent' : 'bg-secondary text-muted-foreground'}`}>
            <Fan className={`w-6 h-6 ${fanStatus ? 'animate-spin-slow' : ''}`} />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Fan Control</h2>
            <p className="text-sm text-muted-foreground">
              Status: <span className={fanStatus ? 'text-accent' : 'text-muted-foreground'}>{fanStatus ? 'ON' : 'OFF'}</span>
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <ControlButton
            variant="fan-on"
            isActive={fanStatus}
            isLoading={isFanLoading}
            disabled={!isConnected}
            icon={<Fan className="w-full h-full" />}
            label="Turn ON"
            onClick={() => handleFanControl(true)}
          />
          <ControlButton
            variant="fan-off"
            isLoading={isFanLoading}
            disabled={!isConnected}
            icon={<PowerOff className="w-full h-full" />}
            label="Turn OFF"
            onClick={() => handleFanControl(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlScreen;
