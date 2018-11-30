import React from "react";
import { Query } from "react-apollo";

import scoringSeshQuery from "../graphql/queries/scoringSessionsQuery";
import ActiveScoringSession from "../components/ActiveScoringSession";
import Leaderboard from "../components/Leaderboard";
import Events from "../components/Events";

const Home = React.memo(_ => (
  <div className="wrapper">
    <section>
      <header className="header main">
        <h1>Tisdagsgolfen 2019</h1>
      </header>

      <Events />

      <Leaderboard />

      <Query query={scoringSeshQuery}>
        {({ data, error, loading }) => {
          if (loading) return null;
          if (error) return <div>{`Error! ${error.message}`}</div>;
          if (data.scoringSessions.length === 0) {
            return null;
          }

          return (
            <ActiveScoringSession scoringSessions={data.scoringSessions} />
          );
        }}
      </Query>
    </section>
  </div>
));

export default Home;
