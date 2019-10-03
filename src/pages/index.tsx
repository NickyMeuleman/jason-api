import React from "react";
import JasonList from "../components/JasonList";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Layout from "../components/Layout";

const APOLLO_QUERY = gql`
  {
    allJasons {
      id
      name
      twitter
      likes
    }
  }
`;

const IndexPage = () => {
  const { loading, error, data } = useQuery(APOLLO_QUERY);

  return (
    <Layout>
      <h1>Look at all these Jasons!</h1>
      {loading && <JasonList jasons={[]} />}
      {error && (
        <JasonList
          jasons={[
            { id: error.name, name: error.message, twitter: "ERROR", likes: 0 }
          ]}
        />
      )}
      {data && data.allJasons && <JasonList jasons={data.allJasons} />}
    </Layout>
  );
};

export default IndexPage;
