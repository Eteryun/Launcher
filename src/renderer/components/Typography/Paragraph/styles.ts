import styled, { css } from 'styled-components';

import { ParagraphProps } from '.';

type Props = Pick<ParagraphProps, 'color' | 'uppercase' | 'bold'> &
  Required<Pick<ParagraphProps, 'size'>>;

const textSize = {
  small: css`
    font-size: 1.2rem;
  `,
  medium: css`
    font-size: 1.6rem;
  `,
};

export const Text = styled.p<Props>`
  color: ${({ color, theme }) => color ?? theme.colors.white};
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};
  font-weight: ${({ bold }) => (bold ? 'bold' : '400')};
  ${({ size }) => textSize[size]};
`;
