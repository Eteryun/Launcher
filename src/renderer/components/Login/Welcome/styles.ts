import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;

  flex: 2.5;

  > h1,
  p {
    white-space: pre-line;
  }
`;

export const Social = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.3rem 0;
`;
