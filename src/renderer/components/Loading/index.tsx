import { useLoading } from '@renderer/hooks/useLoading';

import { Container } from './styles';

export const Loading = () => {
  const { isLoading } = useLoading();

  return (
    <Container show={isLoading}>
      <div />
    </Container>
  );
};
