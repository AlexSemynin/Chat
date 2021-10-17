import React, {
    useState, createContext, useContext, useEffect,
  } from 'react';
  
  const NavigationContext = createContext(null);
  const useNavigation = (): any => useContext(NavigationContext);
  
  function NavigationProvider(props: any) {
    const [navigationData, setNavigationData] = useState({});
  
    return (
      <NavigationContext.Provider
        value={{ navigationData, setNavigationData }}
        {...props}
      />
    );
  }
  
  function withNavigationWatcher(Component: any) {
    return function (props: any) {
      const { setNavigationData } = useNavigation();
      useEffect(() => {
        setNavigationData({ currentPath: props.match.path });
      }, [props.match.path, setNavigationData]);
  
      return React.createElement(Component, props);
    };
  }
  
  export {
    NavigationProvider,
    useNavigation,
    withNavigationWatcher,
  };
  