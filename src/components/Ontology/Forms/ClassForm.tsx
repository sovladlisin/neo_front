import * as React from 'react';
import { useDispatch } from 'react-redux';
import { createEntity } from '../../../actions/ontology/classes/classes';
import { TClass } from '../../../actions/ontology/classes/types';
import { CLASS, LABEL, SUB_CLASS_OF } from '../../../utils';
import { useOnClickOutside } from '../../HandleClickOutside';
import ClassSelector from './ClassSelector';
import LangStringInput from './LangStringInput';

interface IClassFormProps {
    parent?: TClass,
    domain: string,
    onClose: () => void
}

const ClassForm: React.FunctionComponent<IClassFormProps> = (props) => {
    const dispatch = useDispatch()
    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    const [uri, setUri] = React.useState(props.domain === 'Resource' ? 'http://erlangen-crm.org/current/[ваш_uri]' : props.domain + '/[ваш_uri]')
    const [label, setLabel] = React.useState(['идентификатор@ru'])

    const [selectedParent, setSelectedParent] = React.useState<TClass>(props.parent ? props.parent : null)

    const onSave = () => {
        var node = {}
        if (selectedParent) {
            node[SUB_CLASS_OF] = { object: selectedParent, direction: 1 }
        }
        node['uri'] = uri
        node[LABEL] = label
        dispatch(createEntity([props.domain, CLASS, 'Resource'], node))
        props.onClose()
    }

    return <>
        <div className='og-add-class-form' ref={ref}>
            <div className="og-add-class-inputs">
                <label>URI</label><input value={uri} onChange={e => setUri(e.target.value)}></input>
                <label>Именная метка</label><LangStringInput value={label} onChange={e => setLabel(e)}></LangStringInput>
                <label>Родитель</label><ClassSelector domain={props.domain} default={selectedParent} onSelect={cl => setSelectedParent(cl)}></ClassSelector>
            </div>
            <button onClick={onSave}>Добавить класс</button>
        </div>
    </>;
};

export default ClassForm;
