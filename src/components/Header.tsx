import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

interface IProps {}

const Head = styled.header`
  color: var(--bg);
  background: var(--primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
`;

const Brand = styled.div`
  line-height: 24px;
  font-weight: 600;
  font-size: 2rem;
`;

const GraphQL = styled.a`
  text-decoration: none;
  border-radius: 6px;
  display: inline-block;
  line-height: 24px;
  min-width: 168px;
  padding: 7px 15px;
  position: relative;
  text-align: center;
  transition: 0.2s ease;
  transition-property: background-color, border, box-shadow;
  vertical-align: middle;
  width: auto;
  background-color: var(--bg);
  color: var(--primary);
  &:hover {
    background-color: var(--altprimary);
    color: var(--bg);
  }
`;

const Header: React.FC<IProps> = () => (
  <Head>
    <Brand>
      <span>{`{ `}</span>J
      <span
        css={css`
          color: var(--altprimary);
        `}
      >
        a
      </span>
      SON API
      <span>{` }`}</span>
    </Brand>
    <GraphQL href="/.netlify/functions/graphql">
      GraphQL Playground
      <span role="img" aria-label="hand pointing to right">
        👉
      </span>
    </GraphQL>
  </Head>
);

export default Header;
