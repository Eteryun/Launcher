import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > h1 {
    line-height: 4.6rem;
  }

  > h4 {
    line-height: 2.3rem;
    font-weight: 500;
  }

  > h1,
  h4 {
    white-space: pre-wrap;
  }
`;
