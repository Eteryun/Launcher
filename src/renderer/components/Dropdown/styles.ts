import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  cursor: pointer;
`;

export const DropContent = styled.div`
  z-index: 97;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.secondary.light};
  padding: 1rem 0.5rem;
  border-radius: 0.938rem;
  top: calc(100% + 0.9rem);
  left: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;

  transform: translate(-50%, 0);

  ::before {
    content: '';
    position: absolute;
    top: -0.6rem;
    left: 50%;
    transform: translate(-50%, 0);
    border-left: 0.45rem solid transparent;
    border-right: 0.45rem solid transparent;

    border-bottom: 0.6rem solid ${({ theme }) => theme.colors.secondary.light};
  }
`;
