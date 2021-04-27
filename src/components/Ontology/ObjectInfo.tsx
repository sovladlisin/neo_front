import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassObject, updateClass } from '../../actions/ontology/classes/classes';
import { TClass } from '../../actions/ontology/classes/types';
import { RootStore } from '../../store';
import { useOnClickOutside } from '../HandleClickOutside';

interface IObjectInfoProps {
    object_id: number,
    onClose: () => void
}

const ObjectInfo: React.FunctionComponent<IObjectInfoProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)

    const [currentObject, setCurrentObject] = React.useState<TClass>(null)
    React.useEffect(() => { dispatch(getClassObject(props.object_id)) }, [, props.object_id])
    React.useEffect(() => {
        var new_obj = classState.selectedObject
        if (new_obj && props.object_id === new_obj.id) {
            new_obj.params = new_obj.params.concat(Object.keys(JSON.parse(new_obj.signature))).filter(onlyUnique)
            setCurrentObject(new_obj)
        }
    }, [classState.selectedObject])

    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    const onSave = () => {
        dispatch(updateClass(currentObject))
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }


    return <>
        {currentObject && <>
            <div className='main-background'></div>
            <div className='og-object-container' ref={ref}>
                <p className='og-object-container-title'>{currentObject['uri']}</p>
                <div className='og-object-container-params'>
                    {Object.keys(JSON.parse(currentObject.signature)).map(key => {
                        return <>
                            <label>{key}</label>
                            <input onChange={e => setCurrentObject({ ...currentObject, [key]: e.target.value })} value={currentObject[key]}></input>
                        </>
                    })}
                </div>
                <button className='og-object-container-save' onClick={onSave}>Сохранить</button>
            </div>
        </>}
    </>;
};

export default ObjectInfo;
