import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 3.5rem 5.3rem;

  background-color: ${({ theme }) => theme.colors.secondary.dark};

  > h3 {
    margin: 0 5.2rem 2.7rem;
  }

  > article {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 0 5.2rem;
    gap: 1.3rem 4.5rem;
  }
`;
