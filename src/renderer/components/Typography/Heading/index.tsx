import React from 'react';

import { Text } from './styles';

export type HeadingProps = {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  color?: string;
  size?: 'small' | 'medium' | 'big' | 'huge';
  uppercase?: boolean;
};

export const Heading: React.FC<HeadingProps> = ({
  children,
  as = 'h1',
  color,
  size = 'huge',
  uppercase = false,
}) => (
  <Text as={as} size={size} uppercase={uppercase} color={color}>
    {children}
  </Text>
);
