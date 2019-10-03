const proxy = require("http-proxy-middleware");

module.exports = {
  siteMetadata: {
    title: "JaSON API",
    description: "There's a Jason in this JSON",
    siteUrl: "https://jason-api.netlify.com",
    twitter: "@NMeuleman"
  },
  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      proxy({
        target: "http://localhost:9000"
      })
    );
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `JaSON API`,
        short_name: `JaSON API`,
        start_url: `/`,
        background_color: `#f7f4f1`,
        theme_color: `#e10600`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`
      }
    },
    `gatsby-plugin-netlify`
  ]
};
