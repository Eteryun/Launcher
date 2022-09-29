import { transparentize } from 'polished';
import { FaTimes } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

type Props = {
  type: 'success' | 'error' | 'warning' | 'info';
  show: boolean;
  time: number;
};

export const Icon = styled.aside`
  display: flex;
  > svg {
    width: 2.4rem;
    height: auto;
  }
`;

export const Description = styled.p`
  font-size: 1.36rem;
  color: ${({ theme }) => theme.colors.secondary.light};
`;

export const Close = styled(FaTimes)`
  cursor: pointer;
  width: 1.28rem;
  height: auto;
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  color: ${({ theme }) => theme.colors.secondary.dark};
`;

export const Container = styled.div<Props>`
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: fixed;
  top: 0;
  right: 0;
  padding: 0.8rem 2rem 0.8rem 0.8rem;
  margin: 3.2rem 0.8rem;
  max-width: 32rem;
  min-width: 32rem;
  min-height: 6rem;
  background-color: ${({ theme }) => transparentize(0.2, theme.colors.white)};
  backdrop-filter: blur(0.8rem);
  border-radius: 0.4rem;
  animation: ${({ show }) => (show ? showAnim : hideAnim)} 0.3s linear;
  opacity: ${({ show }) => (show ? 1 : 0)};
  pointer-events: ${({ show }) => (show ? 'all' : 'none')};
  transition: opacity 0.2s linear;
  z-index: 98;

  ${Icon} {
    color: ${({ theme, type }) => theme.colors[type]};
  }
`;

export const showAnim = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
`;

export const hideAnim = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
`;
