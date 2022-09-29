import { Header } from '@renderer/components/Header';
import { SettingsNavigate } from '@renderer/components/Settings/Navigate';
import { Heading } from '@renderer/components/Typography/Heading';
import { Outlet } from 'react-router-dom';

import { Container } from './styles';

export const Settings = () => {
  return (
    <Container>
      <Header leftButtonPath="/server" rightButtonPath="/server" />
      <article>
        <Heading uppercase size="medium">
          Configurações
        </Heading>
        <SettingsNavigate
          items={[
            { label: 'Java', path: '/settings/java' },
            { label: 'Launcher', path: '/settings/launcher' },
            { label: 'Minecraft', path: '/settings/minecraft' },
          ]}
        />
        <Outlet />
      </article>
    </Container>
  );
};
