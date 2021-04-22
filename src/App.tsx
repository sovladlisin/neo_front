import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return <Router>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Router>
    ;
};

export default App;
