import React from 'react';

import { SettingsNavigateItem } from './Item';
import { Container } from './styles';

export type SettingsNavigateItemProps = {
  label: string;
  path: string;
};

type SettingsNavigateProps = {
  items: SettingsNavigateItemProps[];
};

export const SettingsNavigate: React.FC<SettingsNavigateProps> = ({
  items,
}) => {
  return (
    <Container>
      {items.map((item) => (
        <SettingsNavigateItem key={item.path} {...item} />
      ))}
    </Container>
  );
};
