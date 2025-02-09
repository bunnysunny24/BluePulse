const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`
          w-full px-4 py-2 rounded-lg
          bg-blue-50 border-2 border-transparent
          focus:border-blue-500 focus:ring-2 focus:ring-blue-200
          outline-none transition-all
          placeholder:text-gray-400
          ${className}
        `}
        ref={ref}
        {...props}
      />
    );
  });
  
  const Button = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          px-6 py-3 rounded-lg font-medium
          bg-blue-500 text-white
          hover:bg-blue-600
          active:bg-blue-700
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  });
  
  const Tabs = ({ defaultValue, children, className }) => {
    const [value, setValue] = React.useState(defaultValue);
  
    return (
      <div className={className}>
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { value, onChange: setValue });
          }
          return child;
        })}
      </div>
    );
  };
  
  const TabsList = ({ className, children }) => {
    return (
      <div className={`flex rounded-lg bg-blue-50 p-1 ${className}`}>
        {children}
      </div>
    );
  };
  
  const TabsTrigger = ({ value, activeValue, onChange, children, className }) => {
    const isActive = value === activeValue;
    
    return (
      <button
        onClick={() => onChange(value)}
        className={`
          flex-1 px-4 py-2 rounded-md
          font-medium text-sm
          transition-all
          ${isActive 
            ? 'bg-blue-500 text-white shadow-sm' 
            : 'text-blue-900 hover:bg-blue-100'
          }
          ${className}
        `}
      >
        {children}
      </button>
    );
  };
  
  const TabsContent = ({ value, activeValue, children }) => {
    if (value !== activeValue) return null;
    return <div>{children}</div>;
  };
  
  const SignInPage = () => {
    const [loading, setLoading] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('personal');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      setTimeout(() => setLoading(false), 1000);
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
        <header className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg 
              className="w-8 h-8 text-blue-500" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
            </svg>
            <span className="text-2xl font-bold text-blue-900">BluePulse</span>
          </div>
        </header>
        <main className="max-w-md mx-auto mt-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-900">Welcome Back</h1>
            <p className="mt-2 text-gray-600">Sign in to your BluePulse account</p>
          </div>
  
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <Tabs defaultValue="personal" className="space-y-8">
              <TabsList>
                <TabsTrigger value="personal" activeValue={activeTab} onChange={setActiveTab}>
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                  </svg>
                  Personal
                </TabsTrigger>
                <TabsTrigger value="industrial" activeValue={activeTab} onChange={setActiveTab}>
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  Industrial
                </TabsTrigger>
              </TabsList>
  
              {['personal', 'industrial'].map((type) => (
                <TabsContent key={type} value={type} activeValue={activeTab}>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Input
                        type="email"
                        placeholder="Email Address"
                        required
                      />
                    </div>
  
                    <div>
                      <Input
                        type="password"
                        placeholder="Password"
                        required
                      />
                    </div>
  
                    {type === 'industrial' && (
                      <div>
                        <Input
                          type="text"
                          placeholder="Company ID"
                          required
                        />
                      </div>
                    )}
  
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600">Remember me</span>
                      </label>
                      <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
                        Forgot password?
                      </a>
                    </div>
  
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
  
                    <div className="text-center text-sm text-gray-600">
                      Don't have an account?{' '}
                      <a href="#" className="text-blue-500 hover:text-blue-600">
                        Create one now
                      </a>
                    </div>
                  </form>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </main>
      </div>
    );
  };
  
  export default SignInPage;