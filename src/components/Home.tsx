import * as React from 'react';

import OntologyWS from './Ontology/OntologyWS';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    return <>
        <OntologyWS />
    </>
};

export default Home;

