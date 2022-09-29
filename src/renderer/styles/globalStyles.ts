import BackgroundImg from '@renderer/assets/images/background.png';
import { transparentize } from 'polished';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    user-select: none;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  html {
    font-size: 62.5%; //1rem = 10px
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  #root {
    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;
    border-radius: 1.12rem;

    background-color: ${({ theme }) => theme.colors.secondary.dark};
    background-image: url(${BackgroundImg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    position: relative;
    z-index: 1;

    ::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${({ theme }) =>
        transparentize(0.3, theme.colors.secondary.dark)};
      z-index: -1;
    }
  }
`;
