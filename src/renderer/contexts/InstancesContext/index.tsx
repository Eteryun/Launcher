import React, { createContext, useCallback, useEffect, useState } from 'react';

type Instance = {
  id: string;
  version: string;
};

export interface IInstancesProviderProps {
  children: React.ReactNode;
}

export interface IInstancesContextValues {
  instances: Instance[];
  addInstance: (instance: Instance) => void;
}

export const InstancesContext = createContext<IInstancesContextValues>({
  instances: [],
  addInstance: console.log,
});

export const InstancesProvider: React.FC<IInstancesProviderProps> = ({
  children,
}) => {
  const [instances, setInstances] = useState<Instance[]>([]);

  useEffect(() => {
    const localInstances = localStorage.getItem('instances');
    if (!localInstances) return;
    const newInstances = JSON.parse(localInstances);
    setInstances(newInstances);
  }, []);

  const addInstance: IInstancesContextValues['addInstance'] = useCallback(
    (instance: Instance) => {
      setInstances((prev) => {
        const filtered = prev.filter((inst) => inst.id !== instance.id);
        const newInstances = [...filtered, instance];
        localStorage.setItem('instances', JSON.stringify(newInstances));
        return newInstances;
      });
    },
    [],
  );

  return (
    <InstancesContext.Provider value={{ instances, addInstance }}>
      {children}
    </InstancesContext.Provider>
  );
};
