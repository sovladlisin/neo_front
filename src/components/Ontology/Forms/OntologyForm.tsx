import * as React from 'react';
import { useDispatch } from 'react-redux';
import { createEntity } from '../../../actions/ontology/classes/classes';
import { DOMAIN_ONTOLOGY, LABEL } from '../../../utils';
import { useOnClickOutside } from '../../HandleClickOutside';
import ClassSelector from './ClassSelector';
import LangStringInput from './LangStringInput';

interface IOntologyFormProps {
    onClose: () => void
}

const OntologyForm: React.FunctionComponent<IOntologyFormProps> = (props) => {
    const dispatch = useDispatch()
    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    const [uri, setUri] = React.useState('http://erlangen-crm.org/current/domain-ontology/[ваш_uri]')
    const [label, setLabel] = React.useState(['Название онтологии@ru'])


    const onSave = () => {
        var node = {}
        node['uri'] = uri
        node[LABEL] = label
        dispatch(createEntity([DOMAIN_ONTOLOGY, 'Resource'], node))
        props.onClose()
    }

    return <>
        <div className='og-add-class-form' ref={ref}>
            <div className="og-add-class-inputs">
                <label>URI</label><input value={uri} onChange={e => setUri(e.target.value)}></input>
                <label>Именная метка</label><LangStringInput value={label} onChange={e => setLabel(e)}></LangStringInput>
            </div>
            <button onClick={onSave}>Добавить онтологию</button>
        </div>
    </>;
};

export default OntologyForm;
