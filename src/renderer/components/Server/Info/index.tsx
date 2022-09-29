import { Heading } from '@renderer/components/Typography/Heading';
import { useServers } from '@renderer/hooks/useServers';

import { Container } from './styles';

export const ServerInfo = () => {
  const { selectedServer } = useServers();

  return (
    <Container>
      <Heading uppercase>{selectedServer.title}</Heading>
      <Heading size="small" as="h4">
        {selectedServer.description}
      </Heading>
    </Container>
  );
};
