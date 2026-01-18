import { Home, ToggleLeft, Activity } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'control' | 'monitor';
  onTabChange: (tab: 'home' | 'control' | 'monitor') => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'control' as const, label: 'Control', icon: ToggleLeft },
    { id: 'monitor' as const, label: 'Monitor', icon: Activity },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-border/50 backdrop-blur-xl">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
