import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > section {
    display: flex;
    gap: 0.6rem;
    position: relative;
    width: fit-content;
  }
`;

export const InputStyled = styled.input.attrs({ type: 'text' })`
  appearance: none;
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.colors.secondary.light};
  padding: 0.4rem 0.7rem;
  width: 40rem;
  border-radius: 0.3rem;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 1.2rem;
`;
