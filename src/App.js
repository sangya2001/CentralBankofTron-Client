import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// components
import Loading from "./Components/Loading";
// packages
import { AnimatePresence } from "framer-motion";
const Dashboard = React.lazy(() => import("./Pages/Dashboard"));
const Home = React.lazy(() => import("./Pages/Home"));

function App() {
  return (
    <AnimatePresence>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            )}
          />
          <Route
            // exact
            path="/dashboard/:refer?/:refralID?"
            render={() => (
              <Suspense fallback={<Loading />}>
                <Dashboard  />
              </Suspense>
            )}
          />
        </Switch>
      </BrowserRouter>
    </AnimatePresence>
  );
}
export default App;
