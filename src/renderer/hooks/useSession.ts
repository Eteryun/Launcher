import { SessionContext } from '@renderer/contexts/SessionContext';
import { useContext } from 'react';

export const useSession = () => useContext(SessionContext);
