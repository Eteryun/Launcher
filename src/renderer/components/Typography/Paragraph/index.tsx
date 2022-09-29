import React from 'react';

import { Text } from './styles';

export type ParagraphProps = {
  children: React.ReactNode;
  color?: string;
  size?: 'small' | 'medium';
  uppercase?: boolean;
  bold?: boolean;
};

export const Paragraph: React.FC<ParagraphProps> = ({
  children,
  color,
  size = 'medium',
  uppercase = false,
  bold = false,
}) => (
  <Text size={size} uppercase={uppercase} color={color} bold={bold}>
    {children}
  </Text>
);
