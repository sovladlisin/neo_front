import * as React from 'react';
import OntologyWS from '../Ontology/OntologyWS';

interface ITextOntologyProps {
    uri: string
}

const TextOntology: React.FunctionComponent<ITextOntologyProps> = (props) => {
    return <>
        <div className='domain-ontology-selected-container'>
            <OntologyWS domain={props.uri}></OntologyWS>
        </div>
    </>;
};

export default TextOntology;
