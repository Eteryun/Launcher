import { Notification } from '@renderer/components/Notification';
import React, { createContext, useState } from 'react';

type Notification = {
  type: 'success' | 'error' | 'warning' | 'info';
  description: string;
  show: boolean;
  time: number;
};

export interface INotificationProviderProps {
  children: React.ReactNode;
}

export interface INotificationContextValues {
  notification: Notification;
  setNotification: (notification: Notification) => void;
}

export const defaultNotification: Notification = {
  type: 'success',
  description: '',
  show: false,
  time: 5,
};

export const NotificationContext = createContext<INotificationContextValues>({
  notification: defaultNotification,
  setNotification: console.log,
});

export const NotificationProvider: React.FC<INotificationProviderProps> = ({
  children,
}) => {
  const [notification, setNotification] =
    useState<Notification>(defaultNotification);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
      <Notification />
    </NotificationContext.Provider>
  );
};
