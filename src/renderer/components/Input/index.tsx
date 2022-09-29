import { Paragraph } from '@renderer/components/Typography/Paragraph';
import React from 'react';

import { Container, InputStyled } from './styles';

type InputProps = {
  title: string;
  value: string;
  placeHolder?: string;
  onChange: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({
  title,
  value,
  placeHolder = '',
  onChange,
}) => {
  return (
    <Container>
      <Paragraph size="small">{title}</Paragraph>
      <section>
        <InputStyled
          placeholder={placeHolder}
          value={value}
          onChange={({ target }) => onChange(target.value)}
        />
      </section>
    </Container>
  );
};
