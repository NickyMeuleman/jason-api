import React from "react";
import { graphql } from "gatsby";
// import { useQuery } from "@apollo/react-hooks";
// import gql from "graphql-tag";
import JasonList from "../components/JasonList";
import Layout from "../components/Layout";
import useFakeQuery from "../useFakeQuery";

// const APOLLO_QUERY = gql`
//   {
//     allJasons {
//       id
//       name
//       twitter
//       likes
//     }
//   }
// `;

// export const GATSBY_QUERY = graphql`
//   {
//     JasonAPI {
//       allJasons {
//         likes
//         name
//         twitter
//         id
//       }
//     }
//   }
// `;

const SIMULATED_APOLLO_QUERY = graphql`
  query SIMULATED_APOLLO_QUERY {
    allFile(filter: { name: { eq: "jasons-2020-03-09" } }) {
      nodes {
        childDataJson {
          allJasons {
            id
            likes
            twitter
            name
          }
        }
      }
    }
  }
`;

export const GATSBY_QUERY = graphql`
  query GATSBY_QUERY {
    allFile(filter: { name: { eq: "jasons-2019-12-28" } }) {
      nodes {
        childDataJson {
          allJasons {
            id
            likes
            twitter
            name
          }
        }
      }
    }
  }
`;

const IndexPage: React.FC<any> = props => {
  const allBuildTimeJasons =
    props.data.allFile.nodes[0].childDataJson.allJasons;

  // const { loading, error, data: apolloData } = useQuery(APOLLO_QUERY);
  // const allClientTimeJasons = apolloData.allJasons;
  const { loading, error, data: apolloData } = useFakeQuery(
    SIMULATED_APOLLO_QUERY
  );
  const allClientTimeJasons =
    apolloData.allFile.nodes[0].childDataJson.allJasons;

  return (
    <Layout>
      <h1>Look at all these Jasons!</h1>
      {loading && <JasonList loading jasons={allBuildTimeJasons} />}
      {error && (
        <JasonList
          jasons={[
            { id: error.name, name: error.message, twitter: `ERROR`, likes: 0 }
          ]}
        />
      )}
      {!loading && apolloData && allClientTimeJasons && (
        <JasonList jasons={allClientTimeJasons} />
      )}
      <div id="functions-offline" style={{ padding: `3rem 0` }}>
        <p>
          On <time dateTime="2020-03-09">9 March</time> I disabled the
          serverless functions from running in production.
        </p>
        <p>
          The site&apos;s loading and waving mechanisms have been adjusted to
          be&nbsp;
          <strong>visually identical</strong> to when the serverless functions
          were online. As a result, waves are no longer sent to the database and
          will not be counted.
        </p>
        <p>
          To view the code of this site when serverless functions were enabled,
          check out&nbsp;
          <a
            href="https://github.com/NickyMeuleman/jason-api/tree/dfb0a7f2469fef55aa4f616b9e181d09bf40007b"
            style={{ color: `inherit`, fontWeight: `bold` }}
          >
            the repository at the last state with serverless functions enabled
          </a>
        </p>
        <p>
          Only a few lines of code are different. The different lines were
          commented out and replaced immediately below.
        </p>
        <p>
          To view the code that moved away from serverless functions, check
          out&nbsp;
          <a
            href="https://github.com/NickyMeuleman/jason-api/pull/6"
            style={{ color: `inherit`, fontWeight: `bold` }}
          >
            the pull request that removes serverless functions
          </a>
        </p>
      </div>
    </Layout>
  );
};

export default IndexPage;
