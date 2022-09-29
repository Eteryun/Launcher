import { Heading } from '@renderer/components/Typography/Heading';
import { Paragraph } from '@renderer/components/Typography/Paragraph';
import { useServers } from '@renderer/hooks/useServers';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Icon, InstalledText, Name } from './styles';

export const ServerCard: React.FC<Distro.Server> = (props) => {
  const navigate = useNavigate();
  const { setSelectedServer, selectedServer } = useServers();

  return (
    <Container
      isSelected={selectedServer.id === props.id}
      onClick={() => {
        setSelectedServer(props);
        navigate('/server');
      }}>
      <Icon image={props.icon}>
        {false && (
          <InstalledText>
            <Paragraph>Instalado</Paragraph>
          </InstalledText>
        )}
      </Icon>
      <Name>
        <Heading as="h4" size="small">
          {props.name}
        </Heading>
      </Name>
    </Container>
  );
};
