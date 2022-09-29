import { transparentize } from 'polished';
import styled, { css } from 'styled-components';

type Props = {
  $type: 'outlined' | 'filled';
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
};

const types = {
  outlined: css`
    background: transparent;
    border: 0.1rem solid ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.primary.dark};
  `,
  filled: css`
    background: ${({ theme }) => theme.gradients.red};
    color: ${({ theme }) => theme.colors.white};
  `,
};

export const Container = styled.button<Props>`
  all: unset;
  border-radius: 1rem;
  cursor: pointer;
  ${({ $type }) => types[$type]};

  padding: ${({ padding }) => padding ?? '1.8rem 0'};
  margin: ${({ margin }) => margin ?? '0'};
  width: ${({ width }) => width ?? 'auto'};
  height: ${({ height }) => height ?? 'auto'};

  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  font-size: 1.8rem;
  white-space: pre-line;

  transition: 0.5s all;

  :hover:enabled {
    box-shadow: 0 0.2rem 2.3rem
      ${({ theme }) => transparentize(0.1, theme.colors.primary.light)};
  }

  :disabled {
    filter: grayscale(0.9);
    box-shadow: none;
    cursor: not-allowed;
  }
`;
