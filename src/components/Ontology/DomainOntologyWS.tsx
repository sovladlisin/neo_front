import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDomainOntologies } from '../../actions/ontology/classes/classes';
import { TClass } from '../../actions/ontology/classes/types';
import { RootStore } from '../../store';
import { getName } from '../../utils';
import OntologyForm from './Forms/OntologyForm';
import OntologyWS from './OntologyWS';

interface IDomainOntologyWSProps {
}

const DomainOntologyWS: React.FunctionComponent<IDomainOntologyWSProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)

    const [addOntologyWindow, setAddOntologyWindow] = React.useState(false)

    const [ontologies, setOntologies] = React.useState<TClass[]>([])
    React.useEffect(() => { dispatch(getDomainOntologies()) }, [, classState.createdEntity])
    React.useEffect(() => { setOntologies(classState.domainOntologies) }, [, classState.domainOntologies])
    const [selectedOntology, setSelectedOntology] = React.useState<TClass>(null)

    return <>
        <div className='og-domain-ontology-workspace'>
            <div className='og-domain-ontology-select'>
                {ontologies.map(o => {
                    const selected = selectedOntology && selectedOntology.id === o.id
                    return <button onClick={_ => setSelectedOntology(o)} style={selected ? { background: '#252854', color: 'white' } : {}}>{getName(o)}</button>
                })}
                <p style={{ background: '#3ed29b', color: 'white' }} className='og-domain-ontology-add' onClick={_ => setAddOntologyWindow(true)}>Добавить онтологию<i className='fas fa-plus'></i></p>
            </div>
            {selectedOntology && <>
                <OntologyWS domain={selectedOntology['uri']}></OntologyWS>
            </>}
        </div>
        {addOntologyWindow && <OntologyForm onClose={() => setAddOntologyWindow(false)}></OntologyForm>}
    </>;
};

export default DomainOntologyWS;
