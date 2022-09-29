import { useSession } from '@renderer/hooks/useSession';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type PrivateRouteProps = {
  Element: JSX.Element;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ Element }) => {
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) navigate('/');
  }, [navigate, session]);

  return Element;
};
