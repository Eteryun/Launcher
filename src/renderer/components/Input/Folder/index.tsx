import { Paragraph } from '@renderer/components/Typography/Paragraph';
import React from 'react';

import { InputStyled } from '../styles';
import { Container, ExploreText } from './styles';

type InputFolderProps = {
  title: string;
  value: string;
  placeHolder?: string;
  onChange: (value: string) => void;
};

export const InputFolder: React.FC<InputFolderProps> = ({
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
          readOnly
          onClick={async () => {
            const response = await window.api.invoke('dialog/open', {
              properties: ['openDirectory'],
              defaultPath: value,
            });
            if (!response.canceled) onChange(String(response.filePaths[0]));
          }}
        />
        <ExploreText>Buscar</ExploreText>
      </section>
    </Container>
  );
};
