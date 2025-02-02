import { createGlobalStyle } from "styled-components";

const Base = createGlobalStyle`
  :root {
    font-size: 10px;
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-weight: lighter;
    color: var(--color-white);
    min-width: 320px;
    background-color: var(--color-black-first);
  }
`;

export default Base;
