exports.createPages = ({ actions }) => {
  const { createRedirect } = actions;

  createRedirect({
    fromPath: `/graphql`,
    toPath: `/.netlify/functions/graphql`,
    statusCode: 200
  });
  createRedirect({
    fromPath: `/hello`,
    toPath: `/.netlify/functions/hello`,
    statusCode: 200
  });
  createRedirect({
    fromPath: `/fauna`,
    toPath: `/.netlify/functions/fauna`,
    statusCode: 200
  });
};
