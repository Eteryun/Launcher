import { transparentize } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40rem;
  height: 41.6rem;
  background-color: ${transparentize(0.1, '#fff')};
  mix-blend-mode: normal;
  backdrop-filter: blur(0.18rem);
  border-radius: 1.5rem;
  padding: 3.2rem 5.3rem;
  gap: 1.6rem;
`;

export const Logo = styled.img`
  width: 6.4rem;
  height: auto;
`;

export const Title = styled.div`
  > h1 {
    color: #000;
    position: relative;
    margin-bottom: 2.88rem;

    ::after {
      content: '';
      position: absolute;
      bottom: -0.4rem;
      left: 50%;
      width: 5.4rem;
      height: 0.6rem;
      border-radius: 0.5rem;
      background: ${({ theme }) => theme.gradients.red};
      box-shadow: 0 0.2rem 1.1rem
        ${({ theme }) => transparentize(0.5, theme.colors.primary.light)};
      transform: translate(-50%, 100%);
    }
  }
`;
