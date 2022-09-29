import React, { Fragment, useEffect, useState } from 'react';

import { Heading } from '../Typography/Heading';
import { Container } from './styles';

export const Updater = () => {
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleUpdate = (action: string) => {
    if (action === 'checking') setLoading(true);
    else if (action === 'available') {
      setLoading(false);
      setAvailable(true);
    } else if (action === 'not-available') {
      setLoading(false);
      setAvailable(false);
    } else if (action === 'downloaded') {
      setDownloaded(true);
    }
  };

  useEffect(() => {
    window.api.send('update/check');
    window.api.on('update', handleUpdate);

    return () => {
      window.api.removeListener('update', handleUpdate);
    };
  }, []);

  return (
    <Container show={!(!available && !loading && !downloaded)}>
      {loading && (
        <Fragment>
          <Heading size="medium">Procurando atualização...</Heading>
          <div className="loading" />
        </Fragment>
      )}
      {available && !loading && (
        <Fragment>
          <Heading size="medium">
            Atualização disponível, realizando o download...
          </Heading>
          <div className="loading" />
        </Fragment>
      )}
      {downloaded && (
        <Fragment>
          <Heading size="medium">
            Iniciando instalação da atualização...
          </Heading>
          <div className="loading" />
        </Fragment>
      )}
    </Container>
  );
};
