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

        <div className='sub-page-container'>
            <p className='sub-page-title'>Онтологии</p>


            <div className='domain-ontology-select-container'>

                {ontologies.map(o => {
                    const selected = selectedOntology && selectedOntology.id === o.id
                    return <button onClick={_ => setSelectedOntology(o)} className={selected ? 'domain-ontology-select-container-selected' : ''}>{getName(o)}</button>
                })}
                <button className='domain-ontology-select-container-inner-add-ontology' onClick={_ => setAddOntologyWindow(true)}>Добавить онтологию<i className='fas fa-plus'></i></button>

            </div>


            {selectedOntology && <>
                <div className='domain-ontology-selected-container'>
                    <OntologyWS domain={selectedOntology['uri']}></OntologyWS>
                </div>

            </>}

            {addOntologyWindow && <OntologyForm onClose={() => setAddOntologyWindow(false)}></OntologyForm>}
        </div>

    </>;
};

export default DomainOntologyWS;
