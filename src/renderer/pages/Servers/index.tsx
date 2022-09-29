import { Header } from '@renderer/components/Header';
import { ServerCard } from '@renderer/components/Servers/Card';
import { Heading } from '@renderer/components/Typography/Heading';
import { useServers } from '@renderer/hooks/useServers';

import { Container } from './styles';

export const Servers = () => {
  const { servers } = useServers();

  return (
    <Container>
      <Header leftButtonPath="/server" rightButtonPath="/settings/java" />
      <Heading as="h3" size="medium" uppercase>
        Servidores
      </Heading>
      <article>
        {servers.map((server) => (
          <ServerCard key={server.id} {...server} />
        ))}
      </article>
    </Container>
  );
};
