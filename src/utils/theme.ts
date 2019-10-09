import { createGlobalStyle } from 'styled-components';

export default {
  global: {
    font: {
      family: 'Roboto',
    },
  },
};

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root,
  #root > div {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;
