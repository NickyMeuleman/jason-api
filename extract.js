// This file was ran once to get the data to a .json file

const fs = require(`fs`);

const path = require(`path`);

require(`isomorphic-fetch`);

// started up the app and went to the graphql endpoint (not localhost because I'm on WSL2)
fetch(`http://172.24.16.127:8000/.netlify/functions/graphql`, {
  method: `POST`,
  headers: {
    "Content-Type": `application/json`
  },
  body: JSON.stringify({
    query: `
        query {
            allJasons {
            __typename
            id
            name
            twitter
            likes
            }
        }`
  })
})
  .then(res => res.json())
  .then(jsonres => {
    const snapshotLocation = path.resolve(
      process.cwd(),
      `jasons-2020-03-09.json`
    );
    fs.writeFileSync(snapshotLocation, JSON.stringify(jsonres.data));
  })
  .catch(error => {
    throw new Error(`oh-oh`, error);
  });
