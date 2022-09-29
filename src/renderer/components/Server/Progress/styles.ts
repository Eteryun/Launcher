import { transparentize } from 'polished';
import styled from 'styled-components';

type ContainerProps = {
  show: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  gap: 0.9rem;
  width: 100%;
  padding: 2rem 4.1rem 2rem 1.8rem;
  border-radius: 1.25rem;
  background: ${({ theme }) =>
    transparentize(0.5, theme.colors.secondary.light)};
  align-self: flex-end;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: all 0.3s ease-in;

  > aside {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;

    > section {
      display: flex;
      justify-content: space-between;
    }
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 0.563rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => transparentize(0.5, theme.colors.gray)};
  position: relative;
  overflow: hidden;

  > div {
    content: '';
    position: absolute;
    border-radius: 1rem;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary.light};
    transition: 0.5s all;
  }
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.2rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s transform;
  background: ${({ theme }) => theme.colors.primary.light};

  :hover {
    transform: scale(1.05);
  }

  > svg {
    color: #fff;
    width: 1.8rem;
    height: auto;
  }
`;
