import { useSession } from '@renderer/hooks/useSession';
import React, { Fragment, useMemo } from 'react';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Dropdown } from '../Dropdown';
import { Paragraph } from '../Typography/Paragraph';
import { Avatar, Container, MenuIcon, ServersButton } from './styles';

type IHeaderProps = {
  leftButtonPath: string;
  rightButtonPath: string;
};

export const Header: React.FC<IHeaderProps> = ({
  leftButtonPath,
  rightButtonPath,
}) => {
  const navigate = useNavigate();
  const { session, setSession } = useSession();

  const dropdownContent = useMemo<JSX.Element>(
    () => (
      <Fragment>
        <MenuIcon>
          <FaCog onClick={() => navigate(rightButtonPath)} />
        </MenuIcon>
        <MenuIcon>
          <FaSignOutAlt
            onClick={() => {
              navigate('/');
              setSession(null);
            }}
          />
        </MenuIcon>
      </Fragment>
    ),
    [navigate, rightButtonPath, setSession],
  );

  return (
    <Container>
      <ServersButton onClick={() => navigate(leftButtonPath)} />
      <aside>
        <Paragraph>{session?.name}</Paragraph>
        <Dropdown content={dropdownContent}>
          <Avatar src={`https://minotar.net/armor/bust/${session?.id}`} />
        </Dropdown>
      </aside>
    </Container>
  );
};
