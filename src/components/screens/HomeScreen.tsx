import { useState } from 'react';
import { Home, Server, Wifi, Loader2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { checkConnection } from '@/lib/api';
import StatusIndicator from '@/components/StatusIndicator';
import { toast } from 'sonner';

const HomeScreen = () => {
  const { espIpAddress, setEspIpAddress, isConnected, setIsConnected, setError } = useApp();
  const [inputIp, setInputIp] = useState(espIpAddress);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (!inputIp.trim()) {
      toast.error('Please enter an IP address');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const connected = await checkConnection(inputIp.trim());
      
      if (connected) {
        setEspIpAddress(inputIp.trim());
        setIsConnected(true);
        toast.success('Connected to ESP32!');
      } else {
        setIsConnected(false);
        toast.error('Could not connect to ESP32. Check the IP address.');
      }
    } catch (err) {
      setIsConnected(false);
      toast.error('Connection failed. Is the ESP32 powered on?');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast.info('Disconnected from ESP32');
  };

  return (
    <div className="flex flex-col items-center px-6 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl gradient-amber glow-amber">
          <Home className="w-8 h-8 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Smart Home Monitor</h1>
          <p className="text-muted-foreground text-sm">ESP32 Control Center</p>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="mb-8">
        <StatusIndicator isConnected={isConnected} />
      </div>

      {/* Connection Card */}
      <div className="w-full max-w-sm glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Server className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">ESP32 Configuration</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-2">
              ESP32 IP Address
            </label>
            <input
              type="text"
              value={inputIp}
              onChange={(e) => setInputIp(e.target.value)}
              placeholder="192.168.43.120"
              className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl 
                       text-foreground placeholder:text-muted-foreground
                       focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                       transition-all"
              disabled={isConnecting}
            />
          </div>

          {isConnected ? (
            <button
              onClick={handleDisconnect}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 
                       bg-destructive/20 text-destructive border border-destructive/30
                       rounded-xl font-semibold transition-all hover:bg-destructive/30"
            >
              <Wifi className="w-5 h-5" />
              Disconnect
            </button>
          ) : (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 
                       gradient-amber text-primary-foreground glow-amber
                       rounded-xl font-semibold transition-all 
                       hover:opacity-90 active:scale-98 disabled:opacity-50"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wifi className="w-5 h-5" />
                  Connect
                </>
              )}
            </button>
          )}
        </div>

        {isConnected && (
          <div className="mt-6 p-4 bg-success/10 border border-success/30 rounded-xl">
            <p className="text-success text-sm text-center">
              ✓ Connected to <span className="font-mono font-semibold">{espIpAddress}</span>
            </p>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center text-muted-foreground text-sm max-w-xs">
        <p>Enter your ESP32's IP address and tap Connect to start controlling your smart home devices.</p>
      </div>
    </div>
  );
};

export default HomeScreen;
