import * as React from 'react';
import { useDispatch } from 'react-redux';
import { addClassAttribute, addClassAttributeObject } from '../../../actions/ontology/classes/classes';
import { TClass } from '../../../actions/ontology/classes/types';
import { useOnClickOutside } from '../../HandleClickOutside';
import ClassSelector from './ClassSelector';
import LangStringInput from './LangStringInput';

interface IAttributeFormProps {
    onClose: () => void,
    class_id: number,
    domain: string,
}

const AttributeForm: React.FunctionComponent<IAttributeFormProps> = (props) => {
    const dispatch = useDispatch()
    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    const [selectedFormType, setSelectedFormType] = React.useState(1)

    const [uri, setUri] = React.useState(props.domain === 'Resource' ? 'http://erlangen-crm.org/current/[ваш_uri]' : props.domain + '/[ваш_uri]')
    const [label, setLabel] = React.useState(['идентификатор@ru'])

    const [selectedClass, setSelectedClass] = React.useState<TClass>(null)

    const onSave = () => {
        if (selectedFormType === 1) {
            dispatch(addClassAttribute(props.domain, props.class_id, label, uri))
        }
        else {
            dispatch(addClassAttributeObject(props.domain, props.class_id, selectedClass.id, label, uri))
        }
        props.onClose()
    }

    return <>
        <div className='og-attribute-form' ref={ref}>
            <div className='og-attribute-form-select-type-buttons'>
                <button style={selectedFormType === 1 ? { background: '#252854', color: 'white' } : {}} onClick={_ => setSelectedFormType(1)}>Строка</button>
                <button style={selectedFormType === 2 ? { background: '#252854', color: 'white' } : {}} onClick={_ => setSelectedFormType(2)}>Объект</button>
            </div>
            <div className='og-attribute-form-inputs'>
                <label>URI</label><input value={uri} onChange={e => setUri(e.target.value)}></input>
                <label>Именная метка</label><LangStringInput value={label} onChange={e => setLabel(e)}></LangStringInput>

                {selectedFormType === 2 && <>
                    <label>Класс атрибута</label><ClassSelector domain={props.domain} default={selectedClass} onSelect={cl => setSelectedClass(cl)}></ClassSelector>
                </>}

            </div>



            <button onClick={onSave}>Добавить</button>
        </div>

    </>;
};

export default AttributeForm;
