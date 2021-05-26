import * as React from 'react';
import OntologyWS from './OntologyWS';

interface IResourceOntologyWSProps {
}

const ResourceOntologyWS: React.FunctionComponent<IResourceOntologyWSProps> = (props) => {
    return <>
        <div className='og-resource-ontology-container'>
            <OntologyWS domain={'Resource'}></OntologyWS>
        </div>
    </>;
};

export default ResourceOntologyWS;
