import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import About from './components/About';
import AlertContainer from './components/AlertContainer';
import AuthWindow from './components/Auth/AuthWindow';
import Cabinet from './components/Auth/Cabinet';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import DomainOntologyWS from './components/Ontology/DomainOntologyWS';
import ResourceOntologyWS from './components/Ontology/ResourceOntologyWS';
import Actors from './components/ResourceLibrary/Actors';
import { CorpusTree } from './components/ResourceLibrary/CorpusTree';
import CorpusView from './components/ResourceLibrary/CorpusView';
import ResourceLibrary from './components/ResourceLibrary/ResourceLibrary';
import Resources from './components/ResourceLibrary/Resources';
import Workspace from './components/Workspace/Workspace';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const [authWindow, setauthWindow] = React.useState(false)
  return <Router>
    <Header onAuthWindow={() => setauthWindow(true)} />
    <AlertContainer />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/resource-ontology" component={ResourceOntologyWS} />
      <Route exact path="/domain-ontology" component={DomainOntologyWS} />
      <Route exact path="/resource-library" component={ResourceLibrary} />
      <Route exact path="/corpuses" component={CorpusTree} />
      <Route exact path="/about" component={About} />
      <Route exact path="/actors" component={Actors} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/account" component={Cabinet} />
      <Route exact path="/workspace/:id" component={Workspace} />

      <Route exact path="/resources" component={Resources} />

      <Route exact path="/corpus/:id" component={CorpusView} />

    </Switch>
    <Footer />
    {authWindow && <AuthWindow onClose={() => setauthWindow(false)} />}
  </Router>
    ;
};

export default App;
