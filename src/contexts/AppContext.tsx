import React, { createContext, useContext, useState, useCallback } from 'react';

interface SensorData {
  voltage: number;
  current: number;
  power: number;
  energy: number;
}

interface AppContextType {
  espIpAddress: string;
  setEspIpAddress: (ip: string) => void;
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
  sensorData: SensorData | null;
  setSensorData: (data: SensorData | null) => void;
  lightStatus: boolean;
  setLightStatus: (status: boolean) => void;
  fanStatus: boolean;
  setFanStatus: (status: boolean) => void;
  lastUpdated: Date | null;
  setLastUpdated: (date: Date | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [espIpAddress, setEspIpAddress] = useState<string>(() => {
    return localStorage.getItem('esp_ip_address') || '';
  });
  const [isConnected, setIsConnected] = useState(false);
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [lightStatus, setLightStatus] = useState(false);
  const [fanStatus, setFanStatus] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetEspIpAddress = useCallback((ip: string) => {
    setEspIpAddress(ip);
    localStorage.setItem('esp_ip_address', ip);
  }, []);

  return (
    <AppContext.Provider
      value={{
        espIpAddress,
        setEspIpAddress: handleSetEspIpAddress,
        isConnected,
        setIsConnected,
        sensorData,
        setSensorData,
        lightStatus,
        setLightStatus,
        fanStatus,
        setFanStatus,
        lastUpdated,
        setLastUpdated,
        error,
        setError,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
