import { transparentize } from 'polished';
import styled, { css } from 'styled-components';

type ContainerProps = {
  isSelected: boolean;
};

export const Container = styled.p<ContainerProps>`
  cursor: pointer;
  color: ${({ isSelected, theme }) =>
    isSelected ? '#fff' : theme.colors.gray};
  font-size: ${({ isSelected }) => (isSelected ? '1.6rem' : '1.2rem')};
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : '400')};

  position: relative;
  transition: 0.5s all;

  ::after {
    position: absolute;
    bottom: -0.48rem;
    left: 0;
    content: '';
    width: ${({ isSelected }) => (isSelected ? '2.88rem' : '0')};
    height: 0.32rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.colors.primary.dark};
    box-shadow: 0 0.2rem 1rem
      ${({ theme }) => transparentize(0.5, theme.colors.primary.dark)};
    transition: 0.3s all;
  }

  ${({ isSelected }) =>
    !isSelected &&
    css`
      :hover {
        ::after {
          width: 1.2rem;
        }
      }
    `}
`;
