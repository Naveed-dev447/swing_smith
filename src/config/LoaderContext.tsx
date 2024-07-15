import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoaderContextProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoaderContext = createContext<LoaderContextProps>({
  loading: false,
  setLoading: () => {},
});

interface LoaderProviderProps {
  children: ReactNode;
}

export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
