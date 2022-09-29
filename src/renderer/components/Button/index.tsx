import React, { ButtonHTMLAttributes, MouseEvent } from 'react';

import { Container } from './styles';

export interface IButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: 'outlined' | 'filled';
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  children: React.ReactNode;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export const Button: React.FC<IButtonProps> = ({
  children,
  type = 'filled',
  ...rest
}) => (
  <Container $type={type} {...rest}>
    {children}
  </Container>
);
