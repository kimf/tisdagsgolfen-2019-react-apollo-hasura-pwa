import gql from "graphql-tag";

const events = gql`
  query {
    events {
      id
      course {
        club
        name
      }
      scoringType: scoring_type
      startsAt: starts_at
      status
      teamEvent: team_event
    }
  }
`;

export default events;
