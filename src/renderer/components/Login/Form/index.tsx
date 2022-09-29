import { parserError } from '@common/utils/errors';
import LogoImage from '@renderer/assets/images/logo.png';
import { Button } from '@renderer/components//Button';
import { Heading } from '@renderer/components//Typography/Heading';
import { useNotification } from '@renderer/hooks/useNotification';
import { useSession } from '@renderer/hooks/useSession';
import { useState } from 'react';

import { Container, Logo, Title } from './styles';

export const LoginForm = () => {
  const { setSession } = useSession();
  const notification = useNotification();
  const [isLoading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      const data = await window.api.invoke('microsoft/login');

      if (!data.code && data.error) throw Error(parserError(data.error));

      const session = await window.api.invoke('microsoft/auth', data.code);

      if (session.error) throw Error(parserError(session.error));

      setSession(session as Auth.Session);
      notification.success('Autenticado com sucesso.');
    } catch (error) {
      setSession(null);
      notification.error(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Logo src={LogoImage} />
      <Title>
        <Heading>Eteryun</Heading>
      </Title>
      <Heading as="h4" size="small" color="#000">
        Realize o login para continuar.
      </Heading>
      <Button width="100%" onClick={login} disabled={isLoading}>
        Conta Microsoft
      </Button>
    </Container>
  );
};
