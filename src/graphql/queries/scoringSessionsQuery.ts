import gql from "graphql-tag";

// (where: { status_not: "finished" })

const scoringSessionsQuery = gql`
  query {
    scoringSessions: scoring_sessions {
      id
      starts_at
      team_event
      course {
        id
        club
        name
      }
      user {
        id
        name
      }
      scoring_items
    }
  }
`;

export default scoringSessionsQuery;
