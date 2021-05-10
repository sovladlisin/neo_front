import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Cabinet from './components/Auth/Cabinet';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Header from './components/Header';
import Home from './components/Home';
import OntologyWS from './components/Ontology/OntologyWS';
import { CorpusTree } from './components/ResourceLibrary/CorpusTree';
import ResourceLibrary from './components/ResourceLibrary/ResourceLibrary';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/resource-ontology" component={OntologyWS} />
      <Route exact path="/resource-library" component={ResourceLibrary} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/account" component={Cabinet} />
    </Switch>
  </Router>
    ;
};

export default App;
