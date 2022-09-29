import { LoginForm } from '@renderer/components/Login/Form';
import { LoginWelcome } from '@renderer/components/Login/Welcome';

import { Container } from './styles';

export const Login = () => (
  <Container>
    <LoginForm />
    <LoginWelcome />
  </Container>
);
