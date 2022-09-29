import CheckboxSvg from '@renderer/assets/icons/check.svg';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

type CheckboxProps = {
  $isChecked: boolean;
};

export const StyledCheckbox = styled(CheckboxSvg)<CheckboxProps>`
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
  color: ${({ $isChecked, theme }) =>
    $isChecked ? theme.colors.primary.dark : theme.colors.gray};
  transition: 0.5s all;

  > path:nth-child(1) {
    opacity: ${({ $isChecked }) => ($isChecked ? '1' : '0')};
    transition: 0.3s all;
  }
`;
