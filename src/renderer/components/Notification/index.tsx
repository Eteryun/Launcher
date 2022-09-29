import { useNotification } from '@renderer/hooks/useNotification';
import { useEffect, useRef } from 'react';
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillInfoCircle,
  AiFillWarning,
} from 'react-icons/ai';

import { Close, Container, Description, Icon } from './styles';

export const Notification = () => {
  const timeout = useRef<NodeJS.Timeout>();
  const { current: icons } = useRef({
    success: <AiFillCheckCircle />,
    error: <AiFillCloseCircle />,
    warning: <AiFillWarning />,
    info: <AiFillInfoCircle />,
  });
  const { notification, close } = useNotification();

  useEffect(() => {
    if (notification.show) {
      timeout.current = setTimeout(() => {
        close();
      }, notification.time * 1000);
    }
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, [close, icons, notification.show, notification.time]);

  const handleClose = () => {
    close();
    timeout.current && clearTimeout(timeout.current);
  };

  return (
    <Container
      show={notification.show}
      type={notification.type}
      time={notification.time}>
      <Close onClick={handleClose} />
      <Icon>{icons[notification.type]}</Icon>
      <Description>{notification.description}</Description>
    </Container>
  );
};
