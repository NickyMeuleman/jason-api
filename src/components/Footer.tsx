import React from "react";
import styled from "@emotion/styled";

interface IProps {}

const Foot = styled.footer`
  color: var(--bg);
  background: var(--primary);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  a {
    color: inherit;
    padding: 0.5rem;
  }
  @media (min-width: 700px) {
    flex-direction: row;
  }
`;

const Footer: React.FC<IProps> = () => (
  <Foot>
    <a href="https://github.com/NickyMeuleman/jason-api">Source code</a>
    <a href="https://twitter.com/nmeuleman">Created by Nicky Meuleman</a>
  </Foot>
);

export default Footer;
