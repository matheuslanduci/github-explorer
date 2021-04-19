import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header } from "../components/Header";

import { Home } from "../pages/Home";
import { Repository } from "../pages/Repository";

export function Routes() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:owner/:repo" component={Repository} />
      </Switch>
    </Router>
  );
}
