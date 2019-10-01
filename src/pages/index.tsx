import React from "react";
import JasonList from "../components/JasonList";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Layout from "../components/Layout";

const testJasons = [
  {
    id: "een",
    name: "Jason Voorhees",
    twitter: "@super",
    waves: 1
  },
  {
    id: "twee",
    name: "Jason Bourne",
    twitter: "@easy",
    waves: 0
  },
  {
    id: "drie",
    name: "Jason Statham",
    twitter: "@barely",
    waves: 3
  },
  {
    id: "vier",
    name: "Jason Momoa",
    twitter: "@an",
    waves: 42
  },
  {
    id: "hoedje",
    name: "Jason Bateman",
    twitter: "@inconvenience",
    waves: 7
  }
];

const IndexPage = () => {
  if (typeof window !== "undefined") {
    fetch("/.netlify/functions/hello")
      .then(res => res.json())
      .then(res => console.log(res));
  }

  return (
    <Layout>
      <h1>Look at all these Jasons!</h1>
      <JasonList jasons={testJasons} />
    </Layout>
  );
};

export default IndexPage;
