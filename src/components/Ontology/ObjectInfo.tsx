import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassObject, updateClass } from '../../actions/ontology/classes/classes';
import { TClass, TObjectExtended } from '../../actions/ontology/classes/types';
import { RootStore } from '../../store';
import { getName } from '../../utils';
import { useOnClickOutside } from '../HandleClickOutside';

interface IObjectInfoProps {
    object_id: number,
    onClose: () => void,
    onSelect: (id: number) => void
}

const ObjectInfo: React.FunctionComponent<IObjectInfoProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)

    const [currentObject, setCurrentObject] = React.useState<TObjectExtended>(null)


    React.useEffect(() => { dispatch(getClassObject(props.object_id)) }, [, props.object_id])
    React.useEffect(() => {
        var new_obj = classState.selectedObject
        if (new_obj && props.object_id === new_obj.id) {
            setCurrentObject(new_obj)
        }
    }, [classState.selectedObject])

    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    const onSave = () => {
        // dispatch(updateClass(currentObject))
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    const selectObject = (id: number) => {
        props.onSelect(id)
    }

    const renderParams = () => {

        const signature = JSON.parse(currentObject.class_signature)
        const check_prop = (x) => Object.keys(signature).includes(x)

        const props = currentObject.object.params.map(p => {
            if (!signature || check_prop(p)) {
                const attr = currentObject.class_attributes.find(a => p === a['uri'])
                const name = attr ? getName(attr) : p

                return <>
                    <label>{name}</label>
                    <input value={currentObject.object[p]}></input>
                </>
            }
        })

        const rel_start = currentObject.relations.filter(rel => rel.start_node.id === currentObject.id).map(rel => {

            const attr = currentObject.class_attributes.find(a => a['uri'] === rel.labels[0])
            const name = attr ? getName(attr) : rel.labels[0].split('/').pop()

            const obj_name = getName(rel.end_node)
            return <>
                <label>{name}</label>
                <p onClick={_ => selectObject(rel.end_node.id)}>{obj_name}</p>
            </>
        })

        const rel_end = currentObject.relations.filter(rel => rel.end_node.id === currentObject.id).map(rel => {

            const attr = currentObject.class_attributes.find(a => a['uri'] === rel.labels[0])
            const name = attr ? getName(attr) : rel.labels[0].split('/').pop()

            const obj_name = getName(rel.start_node)
            return <>
                <label>{name}</label>
                <p onClick={_ => selectObject(rel.start_node.id)}>{obj_name}</p>
            </>
        })

        return <>
            <p className='og-object-container-separator'>Параметры</p>
            <div className='og-object-container-params'>
                {props}
            </div>
            {rel_start.length > 0 && <>
                <p className='og-object-container-separator'> {'->'} </p>
                <div className='og-object-container-params'>
                    {rel_start}
                </div>
            </>}
            {rel_end.length > 0 && <>
                <p className='og-object-container-separator'>{'<-'}</p>
                <div className='og-object-container-params'>
                    {rel_end}
                </div>
            </>}

        </>
    }

    return <>
        {currentObject && <>
            <div className='main-background'></div>
            <div className='og-object-container' ref={ref}>
                <p className='og-object-container-title'>{getName(currentObject.object)}</p>

                {renderParams()}

                <button className='og-object-container-save' onClick={onSave}>Сохранить</button>
            </div>
        </>}
    </>;
};

export default ObjectInfo;
