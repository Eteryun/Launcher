import { useLoading } from '@renderer/hooks/useLoading';
import React, { createContext, useCallback, useEffect, useState } from 'react';

export interface ISessionProviderProps {
  children: React.ReactNode;
}

export interface ISessionContextValues {
  session: Auth.Session | null;
  setSession: (session: Auth.Session | null) => void;
}

export const SessionContext = createContext<ISessionContextValues>({
  session: null,
  setSession: console.log,
});

export const SessionProvider: React.FC<ISessionProviderProps> = ({
  children,
}) => {
  const { setLoading } = useLoading();
  const [session, setSession] = useState<Auth.Session | null>(null);

  const fetchSession = useCallback(async () => {
    setLoading(true);
    const localSession = localStorage.getItem('session');
    if (localSession) {
      let newSession = JSON.parse(localSession);
      const now = new Date();
      if (newSession.expiresIn >= now) {
        if (newSession.microsoft.expiresIn >= now)
          newSession = await window.api.invoke(
            'microsoft/auth',
            newSession.microsoft.refreshToken,
          );
        else
          newSession = await window.api.invoke(
            'microsoft/auth',
            newSession.microsoft.accessToken,
          );
      }
      if (newSession.error) setSession(null);
      else setSession(newSession);
    }
    setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const handleSession: ISessionContextValues['setSession'] = useCallback(
    (session: Auth.Session | null) => {
      if (session) {
        setSession(session);
        localStorage.setItem('session', JSON.stringify(session));
      } else {
        setSession(null);
        localStorage.removeItem('session');
      }
    },
    [],
  );

  return (
    <SessionContext.Provider value={{ session, setSession: handleSession }}>
      {children}
    </SessionContext.Provider>
  );
};
