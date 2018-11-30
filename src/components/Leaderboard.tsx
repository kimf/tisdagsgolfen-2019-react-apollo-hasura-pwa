import React from "react";
import { Query } from "react-apollo";

import leaderboardQuery from "../graphql/queries/leaderboardQuery";

interface LeaderboardPlayer {
  rank: number;
  name: string;
  pointsArray: number[];
  totalPoints: number;
  average: number;
  eventsCount: number;
  user: {
    id: number;
    photo: string;
    firstName: string;
    lastName: string;
  };
}

const Leaderboard = React.memo(_ => (
  <Query query={leaderboardQuery}>
    {({ data, error, loading }) => {
      if (loading) return null;
      if (error) return <div>{`Error! ${error.message}`}</div>;
      if (data.leaderboard.length === 0) {
        return null;
      }
      return (
        <ul className="leaderboard">
          {data.leaderboard.map((playa: LeaderboardPlayer) => (
            <li>
              <strong>{playa.rank}</strong>
              <span>{playa.name}</span>
              <strong>{playa.totalPoints} p</strong>
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
));

export default Leaderboard;
