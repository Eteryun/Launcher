import styled from 'styled-components';

export const Container = styled.section`
  width: fit-content;
  height: 3rem;
  border-radius: 7.65rem;

  display: flex;
  align-items: center;
  gap: 0.48rem;
  padding: 0 1.3rem;

  background-color: ${({ theme }) => theme.colors.white};
`;

type StatusProps = {
  status: string;
};

export const CircleIndicator = styled.span<StatusProps>`
  width: 0.9rem;
  height: 0.9rem;
  background-color: ${({ status }) =>
    status === 'online' ? '#57fa3c' : '#DD3439'};
  border-radius: 50%;
`;
