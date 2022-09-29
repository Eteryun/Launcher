import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 1fr 26.7rem 1fr;
  padding: 4rem 5rem;

  > article {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
`;
