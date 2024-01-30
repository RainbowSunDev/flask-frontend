import React, { useState } from 'react';
import GlobalContext from './globalContext';

const GlobalState = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
