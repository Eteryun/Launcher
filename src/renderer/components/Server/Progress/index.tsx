import { bytesFormatter } from '@common/utils/strings';
import { Paragraph } from '@renderer/components/Typography/Paragraph';
import { LauncherState } from '@renderer/types/launcher';
import React, { useEffect, useMemo, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';

import { Button, Container, ProgressBar } from './styles';

type ServerProgressProps = {
  state: LauncherState;
};

type Progress = {
  totalBytes: number;
  progressBytes: number;
  percentage: number;
};

export const ServerProgress: React.FC<ServerProgressProps> = ({ state }) => {
  const [isPaused, setPause] = useState(false);
  const [progress, setProgress] = useState<Progress>({
    totalBytes: 0,
    progressBytes: 0,
    percentage: 0,
  });

  useEffect(() => {
    window.api.on('download/progress', setProgress);
    window.api.on('check/progress', setProgress);

    return () => {
      window.api.removeAllListener('download/progress');
      window.api.removeAllListener('check/progress');
    };
  }, []);

  const renderMessage = useMemo(() => {
    if (state === LauncherState.DOWNLOADING)
      return `Realizando download dos arquivos...`;
    else if (state === LauncherState.CHECKING)
      return `Realizando a verificação dos arquivos...`;
  }, [state]);

  const renderInfo = useMemo(() => {
    if (state === LauncherState.DOWNLOADING)
      return `${bytesFormatter(progress.progressBytes)} / ${bytesFormatter(
        progress.totalBytes,
      )}`;
    else if (state === LauncherState.CHECKING)
      return `${progress.progressBytes} / ${progress.totalBytes}`;
  }, [progress.progressBytes, progress.totalBytes, state]);

  return (
    <Container
      show={
        state === LauncherState.DOWNLOADING || state === LauncherState.CHECKING
      }>
      {state === LauncherState.DOWNLOADING && (
        <Button
          onClick={() => {
            if (isPaused) window.api.send(`download/resume`);
            else window.api.send(`download/pause`);
            setPause((prev) => !prev);
          }}>
          {isPaused ? <FaPlay /> : <FaPause />}
        </Button>
      )}
      <aside>
        <section>
          <Paragraph>{renderMessage}</Paragraph>
          <Paragraph>{renderInfo}</Paragraph>
        </section>
        <ProgressBar>
          <div style={{ width: `${progress.percentage}%` }} />
        </ProgressBar>
      </aside>
    </Container>
  );
};
