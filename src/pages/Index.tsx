import { useState } from 'react';
import { AppProvider } from '@/contexts/AppContext';
import BottomNav from '@/components/BottomNav';
import DashboardScreen from '@/components/screens/DashboardScreen';
import ControlScreen from '@/components/screens/ControlScreen';
import MonitorScreen from '@/components/screens/MonitorScreen';

const SmartHomeApp = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'control' | 'monitor'>('dashboard');

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'control':
        return <ControlScreen />;
      case 'monitor':
        return <MonitorScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto">
        {renderScreen()}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

const Index = () => {
  return (
    <AppProvider>
      <SmartHomeApp />
    </AppProvider>
  );
};

export default Index;
