import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TClass } from '../../actions/ontology/classes/types';
import { TEntity } from '../../actions/workspace/types';
import { createTextEnitity } from '../../actions/workspace/workspace';
import { RootStore } from '../../store';
import { useOnClickOutside } from '../HandleClickOutside';
import AttributeSelector from '../Ontology/Forms/AttributeSelector';
import ClassSelector from '../Ontology/Forms/ClassSelector';
import ObjectSelector from '../Ontology/Forms/ObjectSelector';

interface IEntityFormProps {
    entity: TEntity,
    domain: string,
    markup_id: number,
    onClose: () => void
}

const EntityForm: React.FunctionComponent<IEntityFormProps> = (props) => {

    const dispatch = useDispatch()
    const classState = useSelector((store: RootStore) => store.classes)

    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    const [selectedType, setSelectedType] = React.useState(1)

    const [selectedEntityClass, setSelectedEntityClass] = React.useState<TClass>(null)
    const [selectedEntityObject, setSelectedEntityObject] = React.useState<TClass>(null)
    const [selectedEntityAttribute, setSelectedEntityAttribute] = React.useState<TClass>(null)

    const [selectedObjectClass, setSelectedObjectClass] = React.useState<TClass>(null)
    const [selectedAtrClass, setSelectedAtrClass] = React.useState<TClass>(null)

    const onSave = () => {
        var new_entity = { ...props.entity }
        new_entity.markup = props.markup_id
        if (selectedType === 1) {
            new_entity.node_uri = selectedEntityClass['uri']
            new_entity.node = selectedEntityClass
        }
        if (selectedType === 2) {
            new_entity.node_uri = selectedEntityObject['uri']
            new_entity.node = selectedEntityObject
        }
        if (selectedType === 3) {
            new_entity.node_uri = selectedEntityAttribute['uri']
            new_entity.node = selectedEntityAttribute
        }

        dispatch(createTextEnitity(new_entity))
        props.onClose()
    }

    return <>
        <div className='ws-entity-form' ref={ref}>
            <div className='ws-entity-form-types'>
                <button style={selectedType === 1 ? { background: 'grey' } : {}} onClick={_ => setSelectedType(1)}>Класс</button>
                <button style={selectedType === 2 ? { background: 'grey' } : {}} onClick={_ => setSelectedType(2)}>Объект</button>
                <button style={selectedType === 3 ? { background: 'grey' } : {}} onClick={_ => setSelectedType(3)}>Связь</button>

            </div>
            <div className='ws-entity-form-params'>
                {selectedType === 1 && <>
                    <label>Сущность:</label><ClassSelector default={selectedEntityClass} onSelect={cl => setSelectedEntityClass(cl)} domain={props.domain}></ClassSelector>
                </>}
                {selectedType === 2 && <>
                    <label>Сущность:</label><ClassSelector default={selectedObjectClass} onSelect={cl => setSelectedObjectClass(cl)} domain={props.domain}></ClassSelector>
                    {selectedObjectClass && <>
                        <label>Экземпляр:</label><ObjectSelector default={selectedEntityObject} onSelect={cl => setSelectedEntityObject(cl)} uri={selectedObjectClass['uri']}></ObjectSelector>
                    </>}
                </>}
                {selectedType === 3 && <>
                    <label>Сущность:</label><ClassSelector default={selectedAtrClass} onSelect={cl => setSelectedAtrClass(cl)} domain={props.domain}></ClassSelector>
                    {selectedAtrClass && <>
                        <label>Связь:</label><AttributeSelector obj={true} uri={selectedAtrClass['uri']} onSelect={cl => setSelectedEntityAttribute(cl)} default={selectedEntityAttribute} />
                    </>}
                </>}
            </div>
            <button id='ws-entity-form-add' onClick={onSave}>Сохранить</button>
        </div>
    </>;
};

export default EntityForm;
