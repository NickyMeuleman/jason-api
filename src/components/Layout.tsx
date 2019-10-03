import React from "react";
import styled from "@emotion/styled";
import { css, Global } from "@emotion/core";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import Header from "./Header";

interface IProps {}

const Layout: React.FC<IProps> = ({ children }) => {
  const {
    site: { siteMetadata },
    file
  } = useStaticQuery(graphql`
    query GetSiteMetadata {
      site {
        siteMetadata {
          title
          description
          siteUrl
          twitter
        }
      }
      file(name: { eq: "social-logo" }) {
        publicURL
      }
    }
  `);
  const imageUrl = `${siteMetadata.siteUrl}${file.publicURL}`;
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
            font-family: -apple-system, system-ui, BlinkMacSystemFont,
              "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, Arial, sans-serif;
            color: var(--text);
            background-color: var(--bg);
          }
        `}
      />
      <Helmet>
        <html lang="en" />
        <title>{siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />
        <meta name="image" content={imageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteMetadata.siteUrl} />
        <meta property="og:title" content={siteMetadata.title} />
        <meta property="og:description" content={siteMetadata.description} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={siteMetadata.twitter} />
        <meta name="twitter:title" content={siteMetadata.title} />
        <meta name="twitter:description" content={siteMetadata.description} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>
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
