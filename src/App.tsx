import { Router } from "@reach/router";
import React, { lazy, Suspense } from "react";
import { ApolloProvider } from "react-apollo";

import Spinner from "./components/Shared/Spinner";
import client from "./lib/apollo-client";
import * as HistoryStack from "./lib/HistoryStack";

// TODO: Only use in DEV!
import { whyDidYouUpdate } from "why-did-you-update";

const Home = lazy(() => import("./pages/Home"));
const ScoringSetup = lazy(() => import("./pages/ScoringSetup"));

whyDidYouUpdate(React);

const App = React.memo((_) => (
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
