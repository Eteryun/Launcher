import { Button } from '@renderer/components/Button';
import styled from 'styled-components';

export const Container = styled(Button)`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 1.3rem 1.52rem;
  text-transform: capitalize;
  font-size: 2.24rem;
  background: ${({ theme }) => theme.radial.red};

  box-shadow: 0 0 1.4rem rgba(255, 77, 77, 0.57);

  :hover:enabled {
    box-shadow: 0 0.2rem 2.3rem rgba(255, 75, 41, 0.57);
  }
`;
