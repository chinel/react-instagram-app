import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FeedPage from "./pages/feed";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={FeedPage} />
      </Switch>
    </Router>
  );
}

export default App;
