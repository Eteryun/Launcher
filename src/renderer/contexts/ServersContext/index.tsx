import { useLoading } from '@renderer/hooks/useLoading';
import React, { createContext, useCallback, useEffect, useState } from 'react';

export interface IServersProviderProps {
  children: React.ReactNode;
}

export interface IServersContextValues {
  servers: Distro.Server[];
  selectedServer: Distro.Server;
  setSelectedServer: (server: Distro.Server) => void;
}

export const ServersContext = createContext<IServersContextValues>({
  servers: [],
  selectedServer: {} as Distro.Server,
  setSelectedServer: console.log,
});

export const ServersProvider: React.FC<IServersProviderProps> = ({
  children,
}) => {
  const { setLoading } = useLoading();
  const [servers, setServers] = useState<Distro.Server[]>([]);
  const [selectedServer, setSelectedServer] = useState({} as Distro.Server);

  const fetchServers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        process.env.NODE_ENV === 'development'
          ? 'https://jsonware.com/api/v1/json/154cd64c-093a-4475-ac55-ac1be8ce749b'
          : 'https://jsonware.com/api/v1/json/154cd64c-093a-4475-ac55-ac1be8ce749b',
      );
      const data = await response.json();
      setServers(data);
      setSelectedServer(data[0]);
      localStorage.setItem('servers', JSON.stringify(data));
    } catch (error) {
      const localServers = localStorage.getItem('servers');
      if (!localServers) return;
      const data = JSON.parse(localServers);
      setServers(data);
      setSelectedServer(data[0]);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    fetchServers();
  }, [fetchServers]);

  return (
    <ServersContext.Provider
      value={{ servers, selectedServer, setSelectedServer }}>
      {children}
    </ServersContext.Provider>
  );
};
