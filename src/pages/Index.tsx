import { useState } from 'react';
import { AppProvider } from '@/contexts/AppContext';
import BottomNav from '@/components/BottomNav';
import HomeScreen from '@/components/screens/HomeScreen';
import ControlScreen from '@/components/screens/ControlScreen';
import MonitorScreen from '@/components/screens/MonitorScreen';

const SmartHomeApp = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'control' | 'monitor'>('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'control':
        return <ControlScreen />;
      case 'monitor':
        return <MonitorScreen />;
      default:
        return <HomeScreen />;
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
