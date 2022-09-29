import { Paragraph } from '@renderer/components/Typography/Paragraph';
import React from 'react';
import { useTheme } from 'styled-components';

import { Container, StyledCheckbox } from './styles';

type CheckboxProps = {
  label: string;
  color?: string;
  size?: 'regular' | 'small';
  isChecked: boolean;
  onChange: (checked: boolean) => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  color,
  size = 'regular',
  isChecked,
  onChange,
}) => {
  const theme = useTheme();

  return (
    <Container>
      <StyledCheckbox
        $isChecked={isChecked}
        onClick={() => onChange(!isChecked)}
      />
      {size === 'regular' && (
        <Paragraph color={color || theme.colors.secondary.dark}>
          {label}
        </Paragraph>
      )}
      {size === 'small' && (
        <Paragraph size="small" color={color || theme.colors.secondary.dark}>
          {label}
        </Paragraph>
      )}
    </Container>
  );
};
