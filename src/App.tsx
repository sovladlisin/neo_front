import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AlertContainer from './components/AlertContainer';
import Cabinet from './components/Auth/Cabinet';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Header from './components/Header';
import Home from './components/Home';
import DomainOntologyWS from './components/Ontology/DomainOntologyWS';
import ResourceOntologyWS from './components/Ontology/ResourceOntologyWS';
import ResourceLibrary from './components/ResourceLibrary/ResourceLibrary';
import Workspace from './components/Workspace/Workspace';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return <Router>
    <Header />
    <AlertContainer />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/resource-ontology" component={ResourceOntologyWS} />
      <Route exact path="/domain-ontology" component={DomainOntologyWS} />
      <Route exact path="/resource-library" component={ResourceLibrary} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/account" component={Cabinet} />
      <Route exact path="/workspace/:id" component={Workspace} />
    </Switch>
  </Router>
    ;
};

export default App;
