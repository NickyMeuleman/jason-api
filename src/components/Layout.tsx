import React from "react";
import styled from "@emotion/styled";
import { css, Global } from "@emotion/core";
import Header from "./Header";

interface IProps {}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          :root {
            --primary: #e10600;
            --altprimary: #ff2822;
            --text: #15151e;
            --alttext: #89898e;
            --bg: #fff;
            --altbg: #f7f4f1;
          }
          html {
            box-sizing: border-box;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          body {
            margin: 0;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            color: var(--text);
            background-color: var(--bg);
          }
        `}
      />
      <Header />
      <main
        css={css`
          margin: 0 auto;
          padding: 0 1.4rem;
          max-width: 60rem;
        `}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
