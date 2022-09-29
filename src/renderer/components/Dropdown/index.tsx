import { useState } from 'react';

import { Container, DropContent } from './styles';

type IDropdownProps = {
  content: React.ReactNode;
  children: React.ReactNode;
};

export const Dropdown: React.FC<IDropdownProps> = ({ children, content }) => {
  const [show, setShow] = useState(false);

  return (
    <Container
      onClick={() => setShow(!show)}
      tabIndex={0}
      onBlur={() => setShow(false)}>
      {children}
      {show && <DropContent>{content}</DropContent>}
    </Container>
  );
};
