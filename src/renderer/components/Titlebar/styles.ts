import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 1.6rem;
  padding: 0.64rem 1.28rem;
  top: 0;
  position: absolute;
  user-select: none;
  -webkit-app-region: drag;
  z-index: 999;

  > svg {
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
    -webkit-app-region: no-drag;
  }
`;
