import { compareVersions } from '@common/utils/strings';
import { Header } from '@renderer/components/Header';
import { ActionButton } from '@renderer/components/Server/Button';
import { ServerInfo } from '@renderer/components/Server/Info';
import { ServerProgress } from '@renderer/components/Server/Progress';
import { ServerStatus } from '@renderer/components/Server/Status';
import { useInstances } from '@renderer/hooks/useInstances';
import { useServers } from '@renderer/hooks/useServers';
import { LauncherState } from '@renderer/types/launcher';
import { useEffect, useState } from 'react';

import { Container } from './styles';

export const Server = () => {
  const { selectedServer } = useServers();
  const { instances } = useInstances();
  const [state, setState] = useState(LauncherState.DOWNLOAD);

  useEffect(() => {
    const instance = instances.find(
      (instance) => instance.id === selectedServer.id,
    );
    if (instance) {
      const compare = compareVersions(instance.version, selectedServer.version);
      if (compare === 0 || compare === 1) setState(LauncherState.PLAY);
      else setState(LauncherState.UPDATE);
    } else if (selectedServer.version) setState(LauncherState.DOWNLOAD);
  }, [instances, selectedServer.id, selectedServer.version]);

  return (
    <Container>
      <Header leftButtonPath="/servers" rightButtonPath="/settings/java" />
      <article>
        <ServerStatus />
        <ServerInfo />
        <ActionButton state={state} changeState={setState} />
      </article>
      <ServerProgress state={state} />
    </Container>
  );
};
