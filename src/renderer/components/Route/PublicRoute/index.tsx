import { useSession } from '@renderer/hooks/useSession';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type PublicRouteProps = {
  Element: JSX.Element;
};

export const PublicRoute: React.FC<PublicRouteProps> = ({ Element }) => {
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) navigate('/server');
  }, [navigate, session]);

  return Element;
};
