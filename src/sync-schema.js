#!/usr/bin/env node
require("dotenv").config();

/* sync GraphQL schema to your FaunaDB account - use with `netlify dev:exec <path-to-this-file>` */
function createFaunaGraphQL() {
  if (!process.env.FAUNADB_SERVER_SECRET) {
    console.log("No FAUNADB_SERVER_SECRET in environment, skipping DB setup");
    return
  }
  console.log("Uploading GraphQL Schema");

  const fetch = require("node-fetch");
  const fs = require("fs");
  const path = require("path");
  var dataString = fs
    .readFileSync(path.join(__dirname, "fauna-schema.graphql"))
    .toString(); // name of your schema file

  // encoded authorization header similar to https://www.npmjs.com/package/request#http-authentication
  const token = Buffer.from(process.env.FAUNADB_SERVER_SECRET + ":").toString(
    "base64"
  );

  var options = {
    method: "POST",
    body: dataString,
    headers: { Authorization: `Basic ${token}` }
  };

  fetch("https://graphql.fauna.com/import?mode=override", options)
    .then(res => res.text())
    .then(body => {
      console.log(
        "Netlify Functions:Create - `fauna-graphql/sync-schema.js` success!"
      );
      console.log(body);
    })
    .catch(err => console.error("something wrong happened: ", { err }));
}

createFaunaGraphQL();
