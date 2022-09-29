import { FaMinus, FaTimes } from 'react-icons/fa';

import { Container } from './styles';

export const TitleBar = () => (
  <Container>
    <FaMinus role="button" onClick={() => window.api.send('window/minimize')} />
    <FaTimes role="button" onClick={() => window.api.send('window/close')} />
  </Container>
);
