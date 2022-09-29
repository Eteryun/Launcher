import styled, { keyframes } from 'styled-components';

type LoadingProps = {
  show: boolean;
};

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div<LoadingProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary.dark};
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  pointer-events: ${({ show }) => (show ? 'all' : 'none')};
  z-index: 999;

  > div {
    display: inline-block;
    width: 8rem;
    height: 8rem;
    position: relative;
    animation: ${rotation} 1.2s infinite linear;

    ::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      padding: 0.8rem;
      background: linear-gradient(
        90deg,
        ${({ theme }) => theme.colors.primary.light} 40%,
        #0000 60%
      );
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: xor;
    }
  }
`;
