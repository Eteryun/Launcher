import {
  defaultNotification,
  NotificationContext,
} from '@renderer/contexts/NotificationContext';
import { useContext } from 'react';

export const useNotification = () => {
  const { setNotification, notification } = useContext(NotificationContext);

  const info = (description: string, time = 5) => {
    show(description, 'info', time);
  };

  const success = (description: string, time = 5) => {
    show(description, 'success', time);
  };

  const error = (description: string, time = 5) => {
    show(description, 'error', time);
  };

  const warning = (description: string, time = 5) => {
    show(description, 'warning', time);
  };

  const show = (
    description: string,
    type: 'success' | 'error' | 'warning' | 'info',
    time: number,
  ) => {
    const notification = Object.assign({}, defaultNotification);
    notification.description = description;
    notification.type = type;
    notification.time = time;
    notification.show = true;

    setNotification(notification);
  };

  const close = () => {
    setNotification(defaultNotification);
  };

  return {
    info,
    success,
    error,
    warning,
    close,
    notification,
  };
};
