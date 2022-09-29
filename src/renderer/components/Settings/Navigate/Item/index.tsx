import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { SettingsNavigateItemProps } from '..';
import { Container } from './styles';

export const SettingsNavigateItem: React.FC<SettingsNavigateItemProps> = ({
  label,
  path,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container
      onClick={() => navigate(path)}
      isSelected={location.pathname === path}>
      {label}
    </Container>
  );
};
