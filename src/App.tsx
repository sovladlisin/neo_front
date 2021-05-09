import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home';
import OntologyWS from './components/Ontology/OntologyWS';
import { CorpusTree } from './components/ResourceLibrary/CorpusTree';
import ResourceLibrary from './components/ResourceLibrary/ResourceLibrary';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/resource-ontology" component={OntologyWS} />
      <Route exact path="/resource-library" component={ResourceLibrary} />
    </Switch>
  </Router>
    ;
};

export default App;
