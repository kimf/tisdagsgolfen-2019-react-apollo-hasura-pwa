import React, { Suspense, lazy } from "react";
import { Router, Link } from "@reach/router";
import { ApolloProvider } from "react-apollo";

import client from "./lib/apollo-client";
import * as HistoryStack from "./lib/HistoryStack";
import Spinner from "./components/Shared/Spinner";
import useLocalstorage from "./hooks/useLocalstorage";

const Home = lazy(() => import("./pages/Home"));
const ScoringSetup = lazy(() => import("./pages/ScoringSetup"));

// TODO: Only use in DEV!
const { whyDidYouUpdate } = require("why-did-you-update");
whyDidYouUpdate(React);

const App = React.memo(_ => (
  <ApolloProvider client={client}>
    <HistoryStack.Provider>
      <Suspense fallback={<Spinner />}>
        <Router>
          <ScoringSetup path="/play" />
          <Home path="/" />
        </Router>
      </Suspense>
    </HistoryStack.Provider>
  </ApolloProvider>
));

export default App;
