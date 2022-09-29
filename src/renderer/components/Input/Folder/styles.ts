import { Text } from '@renderer/components/Typography/Paragraph/styles';
import styled from 'styled-components';

import { Container as InputContainer } from '../styles';

export const Container = styled(InputContainer)`
  > section > input {
    cursor: pointer;
  }
`;

export const ExploreText = styled(Text).attrs({ size: 'small' })`
  position: absolute;
  display: flex;
  align-items: center;
  right: 0.8rem;
  top: 0;
  bottom: 0;
  pointer-events: none;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
`;
