import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { controlRef, monitoringRef, statusRef, onValue, set, off } from '@/lib/firebase';

// Types matching Firebase structure
export interface ControlData {
  light: 'ON' | 'OFF';
  fan: 'ON' | 'OFF';
  pump: 'ON' | 'OFF';
  mode: 'AUTO' | 'MANUAL';
}

export interface MonitoringData {
  voltage: number;
  current: number;
  power: number;
  energy: number;
}

export interface StatusData {
  fire: boolean;
  waterLevel: 'LOW' | 'FULL';
}

interface AppContextType {
  // Data states
  controlData: ControlData | null;
  monitoringData: MonitoringData | null;
  statusData: StatusData | null;
  
  // Connection state
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  
  // Control functions
  setLight: (value: 'ON' | 'OFF') => Promise<void>;
  setFan: (value: 'ON' | 'OFF') => Promise<void>;
  setPump: (value: 'ON' | 'OFF') => Promise<void>;
  setMode: (value: 'AUTO' | 'MANUAL') => Promise<void>;
  setFire: (value: boolean) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [controlData, setControlData] = useState<ControlData | null>(null);
  const [monitoringData, setMonitoringData] = useState<MonitoringData | null>(null);
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Subscribe to Firebase real-time updates
  useEffect(() => {
    setIsLoading(true);

    // Listen to control data
    const unsubControl = onValue(controlRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setControlData(data);
        setIsConnected(true);
        setLastUpdated(new Date());
        setError(null);
      }
    }, (err) => {
      setError('Failed to connect to Firebase');
      setIsConnected(false);
    });

    // Listen to monitoring data
    const unsubMonitoring = onValue(monitoringRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMonitoringData(data);
        setLastUpdated(new Date());
      }
    });

    // Listen to status data
    const unsubStatus = onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setStatusData(data);
        setLastUpdated(new Date());
      }
      setIsLoading(false);
    });

    // Cleanup subscriptions
    return () => {
      off(controlRef);
      off(monitoringRef);
      off(statusRef);
    };
  }, []);

  // Control functions
  const setLight = useCallback(async (value: 'ON' | 'OFF') => {
    try {
      await set(controlRef, { ...controlData, light: value });
    } catch (err) {
      setError('Failed to update light');
    }
  }, [controlData]);

  const setFan = useCallback(async (value: 'ON' | 'OFF') => {
    try {
      await set(controlRef, { ...controlData, fan: value });
    } catch (err) {
      setError('Failed to update fan');
    }
  }, [controlData]);

  const setPump = useCallback(async (value: 'ON' | 'OFF') => {
    try {
      await set(controlRef, { ...controlData, pump: value });
    } catch (err) {
      setError('Failed to update pump');
    }
  }, [controlData]);

  const setMode = useCallback(async (value: 'AUTO' | 'MANUAL') => {
    try {
      await set(controlRef, { ...controlData, mode: value });
    } catch (err) {
      setError('Failed to update mode');
    }
  }, [controlData]);

  const setFire = useCallback(async (value: boolean) => {
    try {
      await set(statusRef, { ...statusData, fire: value });
    } catch (err) {
      setError('Failed to update fire status');
    }
  }, [statusData]);

  return (
    <AppContext.Provider
      value={{
        controlData,
        monitoringData,
        statusData,
        isConnected,
        isLoading,
        error,
        lastUpdated,
        setLight,
        setFan,
        setPump,
        setMode,
        setFire,
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
