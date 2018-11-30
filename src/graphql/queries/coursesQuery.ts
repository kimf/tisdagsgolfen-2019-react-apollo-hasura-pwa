import gql from "graphql-tag";

const coursesQuery = gql`
  query {
    courses(limit: 10) {
      id
      club
      name
    }
  }
`;

export default coursesQuery;
