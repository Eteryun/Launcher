import { transparentize } from 'polished';
import styled from 'styled-components';

type ContainerProps = {
  isSelected: boolean;
};

export const Container = styled.section<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  cursor: pointer;

  filter: ${({ isSelected }) => (isSelected ? 'grayscale(0)' : 'grayscale(1)')};
  transition: 0.3s all;

  :hover {
    filter: grayscale(0.3);
  }
`;

type IconProps = {
  image: string;
};

export const Icon = styled.div<IconProps>`
  position: relative;
  background-image: ${({ image }) => `url(${image})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  border-radius: 1.5rem;
  width: 100%;
  aspect-ratio: 345/194;
`;

export const InstalledText = styled.div`
  > p {
    position: absolute;
    top: 1rem;
    right: 1.28rem;
    background-color: ${transparentize(0.5, '#000000')};
    padding: 0.32rem 1.4rem;
    border-radius: 1.5rem;
    font-weight: bold;
  }
`;

export const Name = styled.div`
  > h4 {
    color: #fff;
    line-height: 2.3rem;
    padding: 0 1rem;
  }
`;
