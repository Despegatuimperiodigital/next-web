// tabs.js
const Tabs = ({ defaultValue, className, children }) => {
    const [activeTab, setActiveTab] = React.useState(defaultValue);
  
    return (
      <div className={`w-full ${className}`}>
        {React.Children.map(children, child => {
          if (child.type === TabsList || child.type === TabsContent) {
            return React.cloneElement(child, { activeTab, setActiveTab });
          }
          return child;
        })}
      </div>
    );
  };
  
  const TabsList = ({ className, children, activeTab, setActiveTab }) => {
    return (
      <div className={`flex space-x-2 ${className}`}>
        {React.Children.map(children, child => {
          if (child.type === TabsTrigger) {
            return React.cloneElement(child, { 
              active: activeTab === child.props.value,
              onClick: () => setActiveTab(child.props.value)
            });
          }
          return child;
        })}
      </div>
    );
  };
  
  const TabsTrigger = ({ value, active, onClick, children }) => {
    return (
      <button
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
          ${active 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted hover:bg-muted/80 text-muted-foreground'
          }`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
  
  const TabsContent = ({ value, activeTab, children }) => {
    if (value !== activeTab) return null;
    return <div>{children}</div>;
  };
  
  // card.js
  const Card = ({ className, children }) => (
    <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}>
      {children}
    </div>
  );
  
  const CardHeader = ({ className, children }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
  );
  
  const CardTitle = ({ className, children }) => (
    <h3 className={`font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
  );
  
  const CardContent = ({ className, children }) => (
    <div className={`p-6 pt-0 ${className}`}>{children}</div>
  );
  
  export { 
    Tabs, TabsList, TabsTrigger, TabsContent,
    Card, CardHeader, CardTitle, CardContent 
  };