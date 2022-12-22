import LoadingIcon from '@renderer/assets/icons/loading.svg';
import { useInstances } from '@renderer/hooks/useInstances';
import { useNotification } from '@renderer/hooks/useNotification';
import { useServers } from '@renderer/hooks/useServers';
import { useSession } from '@renderer/hooks/useSession';
import { LauncherState } from '@renderer/types/launcher';
import React, { Fragment, useCallback, useEffect, useMemo } from 'react';
import { BiBlock } from 'react-icons/bi';
import { BsDownload } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';

import { Container } from './styles';

type ActionButtonProps = {
  state: LauncherState;
  changeState: (state: LauncherState) => void;
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  state,
  changeState,
}) => {
  const { selectedServer } = useServers();
  const { session } = useSession();
  const { addInstance } = useInstances();
  const notification = useNotification();

  const renderState = useMemo(() => {
    switch (state) {
      case LauncherState.CHECKING:
      case LauncherState.DOWNLOADING:
        return (
          <Fragment>
            <BiBlock /> Cancelar
          </Fragment>
        );
      case LauncherState.PLAY:
        return (
          <Fragment>
            <FaPlay /> Jogar
          </Fragment>
        );
      case LauncherState.UPDATE:
        return (
          <Fragment>
            <BsDownload /> Atualizar
          </Fragment>
        );
      case LauncherState.STARTING:
        return (
          <Fragment>
            <LoadingIcon /> Iniciando
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <BsDownload /> Baixar
          </Fragment>
        );
    }
  }, [state]);

  const startGame = useCallback(async () => {
    changeState(LauncherState.STARTING);
    const data = await window.api.invoke('game/start', {
      server: selectedServer,
      session,
    });
    if (data.error)
      notification.error(
        `Não foi possível iniciar o jogo. Verifique os logs.`,
        15,
      );
    else notification.success(`Jogo iniciado com sucesso.`);

    changeState(LauncherState.PLAY);
  }, [changeState, notification, selectedServer, session]);

  const startDownload = useCallback(async () => {
    const data = await window.api.invoke('download/start', selectedServer);
    if (data.error) {
      notification.error('Não foi possível realizar o download.');
      return;
    }
    changeState(LauncherState.DOWNLOADING);
  }, [changeState, notification, selectedServer]);

  const startChecking = async () => {
    window.api.send('check/start', selectedServer);
    changeState(LauncherState.CHECKING);
  };

  const abortDownload = async () => {
    window.api.send(`download/abort`);
    changeState(LauncherState.DOWNLOAD);
  };

  const abortChecking = async () => {
    window.api.send(`checking/abort`);
    changeState(LauncherState.PLAY);
  };

  const handleClick = async () => {
    switch (state) {
      case LauncherState.CHECKING:
        abortChecking();
        break;
      case LauncherState.DOWNLOADING:
        abortDownload();
        break;
      case LauncherState.UPDATE:
      case LauncherState.DOWNLOAD:
        startDownload();
        break;
      case LauncherState.PLAY:
        startChecking();
        break;
    }
  };

  useEffect(() => {
    window.api.on('download/error', () => {
      notification.error('Erro ao realizar download.');
      changeState(LauncherState.DOWNLOAD);
    });
    window.api.on('download/finished', () => {
      if (selectedServer.id && selectedServer.version)
        addInstance({ id: selectedServer.id, version: selectedServer.version });
      changeState(LauncherState.PLAY);
    });
    window.api.on('check/aborted', () => changeState(LauncherState.PLAY));
    window.api.on('check/finished', (data) => {
      if (data.length > 0) startDownload();
      else startGame();
    });

    return () => {
      window.api.removeAllListener('download/error');
      window.api.removeAllListener('download/finished');
      window.api.removeAllListener('check/aborted');
      window.api.removeAllListener('check/finished');
    };
  }, [
    addInstance,
    changeState,
    notification,
    selectedServer.id,
    selectedServer.version,
    startDownload,
    startGame,
  ]);

  return <Container onClick={handleClick}>{renderState}</Container>;
};
