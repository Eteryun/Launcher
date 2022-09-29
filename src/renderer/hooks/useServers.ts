import { ServersContext } from '@renderer/contexts/ServersContext';
import { useContext } from 'react';

export const useServers = () => useContext(ServersContext);
