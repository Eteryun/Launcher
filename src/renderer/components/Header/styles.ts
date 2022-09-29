import CategoryIcon from '@renderer/assets/icons/category.svg';
import { darken, transparentize } from 'polished';
import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: fit-content;

  > aside {
    display: flex;
    gap: 1.2rem;
    align-items: center;
    > p {
      font-weight: bold;
    }
  }
`;

export const ServersButton = styled(CategoryIcon)`
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  transition: 0.5s all;
  :hover {
    transform: scale(1.05);
  }
`;

export const Avatar = styled.img`
  min-width: 5rem;
  max-width: 5rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: ${({ theme }) =>
    transparentize(0.4, theme.colors.secondary.light)};
  overflow: hidden;
  box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
`;

export const MenuIcon = styled.i`
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  font-size: 2rem;

  :hover {
    color: ${({ theme }) => darken(0.1, theme.colors.white)};
  }
`;
