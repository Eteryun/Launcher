import { Text } from '@renderer/components/Typography/Paragraph/styles';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > section {
    display: flex;
    gap: 0.6rem;
  }
`;

export const Input = styled.input.attrs({ type: 'range' })`
  appearance: none;
  background-color: ${({ theme }) => theme.colors.secondary.light};
  width: 40rem;
  height: 1.8rem;
  border-radius: 0.3rem;
  position: relative;

  ::-webkit-slider-thumb {
    cursor: ew-resize;
    appearance: none;
    width: 0.8rem;
    height: 2.2rem;
    border-radius: 0.2rem;
    background: ${({ theme }) => theme.colors.white};
    position: relative;
  }

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ value, min, max }) =>
      `${
        ((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100
      }%`};
    height: 100%;
    background: ${(props) => props.theme.colors.gray};
    border-radius: 0.3rem;
  }
`;

export const Suffix = styled(Text).attrs({ size: 'small' })`
  > p {
    width: 8.4rem;
    padding: 0.16rem 1.6rem;
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.secondary.light};
    border-radius: 0.3rem;
  }
`;
