import React, { createContext, useCallback, useState } from 'react';

export interface ILoadingProviderProps {
  children: React.ReactNode;
}

export interface ILoadingContextValues {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}

export const LoadingContext = createContext<ILoadingContextValues>({
  isLoading: false,
  setLoading: console.log,
});

export const LoadingProvider: React.FC<ILoadingProviderProps> = ({
  children,
}) => {
  const [loadings, setLoadings] = useState(0);

  const setLoading: ILoadingContextValues['setLoading'] = useCallback(
    (value: boolean) => {
      setLoadings((prev) => (value ? prev + 1 : prev - 1));
    },
    [],
  );

  return (
    <LoadingContext.Provider value={{ isLoading: loadings > 0, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
