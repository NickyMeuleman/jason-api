import { useStaticQuery, graphql } from "gatsby";
import React from "react";

const useFakeQuery = (
  query
): { loading: boolean; error: null | Error; data: any } => {
  const [loading, setLoading] = React.useState(true);
  // useStaticQuery doesn't support variables yet, copying the query here manually instead of passing in the query arg.
  // The passed in query only has the purpose of making it seem similar to the @apollo/react-hooks api in the index route, this is what really happens

  // fake the data loading with a timeout
  React.useEffect(() => {
    // useEffect doesn't run during Gatsby build, methods on window like setTimeout are available here.
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const data = useStaticQuery(graphql`
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
  `);
  return { loading, error: null, data };
};

export default useFakeQuery;
