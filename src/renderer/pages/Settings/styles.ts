import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 3.5rem 5.3rem;

  background-color: ${({ theme }) => theme.colors.secondary.dark};

  > article {
    display: flex;
    flex-direction: column;
    padding: 0 5.2rem;
    gap: 3.2rem;

    > section {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
  }
`;
