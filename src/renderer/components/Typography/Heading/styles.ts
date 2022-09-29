import styled, { css } from 'styled-components';

import { HeadingProps } from '.';

type Props = Pick<HeadingProps, 'color' | 'uppercase'> &
  Required<Pick<HeadingProps, 'size'>>;

const textSize = {
  small: css`
    font-size: 2rem;
  `,
  medium: css`
    font-size: 2.5rem;
  `,
  big: css`
    font-size: 3.13rem;
  `,
  huge: css`
    font-size: 3.9rem;
  `,
};

export const Text = styled.h1<Props>`
  color: ${({ color, theme }) => color ?? theme.colors.white};
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};
  ${({ size }) => textSize[size]};
`;
