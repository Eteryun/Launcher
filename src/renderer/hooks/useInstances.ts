import { InstancesContext } from '@renderer/contexts/InstancesContext';
import { useContext } from 'react';

export const useInstances = () => useContext(InstancesContext);
