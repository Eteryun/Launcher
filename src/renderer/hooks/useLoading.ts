import { LoadingContext } from '@renderer/contexts/LoadingContext';
import { useContext } from 'react';

export const useLoading = () => useContext(LoadingContext);
