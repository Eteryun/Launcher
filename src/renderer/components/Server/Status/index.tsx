import { Paragraph } from '@renderer/components/Typography/Paragraph';
import useInterval from '@renderer/hooks/useInterval';
import { useServers } from '@renderer/hooks/useServers';
import { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

import { CircleIndicator, Container } from './styles';

export const ServerStatus = () => {
  const { selectedServer } = useServers();
  const theme = useTheme();
  const [status, setStatus] = useState({
    isOnline: false,
    players: 0,
    maxPlayers: 0,
  });

  const getStatus = useCallback(async () => {
    if (!selectedServer.minecraft || !selectedServer.minecraft.address) return;
    const [address, port] = selectedServer.minecraft.address.split(':');

    const status = await window.api.invoke('server/status', {
      address,
      port,
    });
    setStatus(status);
  }, [selectedServer.minecraft]);

  useEffect(() => {
    getStatus();
  }, [getStatus]);

  useInterval(getStatus, 60000);

  return (
    <Container>
      <CircleIndicator status={status.isOnline ? 'online' : 'offline'} />
      <Paragraph size="small" uppercase color={theme.colors.secondary.light}>
        Jogadores:
      </Paragraph>
      <Paragraph size="small" color={theme.colors.secondary.light}>
        {status.players}/{status.maxPlayers}
      </Paragraph>
    </Container>
  );
};
