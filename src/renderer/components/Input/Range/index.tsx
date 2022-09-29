import { Paragraph } from '@renderer/components/Typography/Paragraph';
import React from 'react';

import { Container, Input, Suffix } from './styles';

type InputRangeProps = {
  title: string;
  suffix: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
};

export const InputRange: React.FC<InputRangeProps> = ({
  title,
  suffix,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
}) => {
  return (
    <Container>
      <Paragraph size="small">{title}</Paragraph>
      <section>
        <Input
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={({ target }) => onChange(Number(target.value))}
        />
        <Suffix>
          {value.toFixed(1)} {suffix}
        </Suffix>
      </section>
    </Container>
  );
};
