import gql from "graphql-tag";

const leaderboard = gql`
  query {
    leaderboard {
      rank
      name
      pointsArray: points_array
      totalPoints: total_points
      average
      eventsCount: events
      user {
        id
        photo
        firstName: first_name
        lastName: last_name
      }
    }
  }
`;

export default leaderboard;
