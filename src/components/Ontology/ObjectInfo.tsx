import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TClass } from '../../actions/ontology/classes/types';
import { RootStore } from '../../store';
import { useOnClickOutside } from '../HandleClickOutside';

interface IObjectInfoProps {
    object: TClass,
    onClose: () => void
}

const ObjectInfo: React.FunctionComponent<IObjectInfoProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)

    const [currentObject, setCurrentObject] = React.useState<TClass>(props.object)
    React.useEffect(() => { setCurrentObject(props.object) }, [props.object])

    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    const onSave = () => {
        console.log(currentObject)
    }

    return <>
        <div className='main-background'></div>
        <div className='og-object-container' ref={ref}>
            <p className='og-object-container-title'>{currentObject['uri']}</p>
            <div className='og-object-container-params'>
                {currentObject.params.map(param => {
                    return <>
                        <label>{param}</label>
                        <input onChange={e => setCurrentObject({ ...currentObject, [param]: e.target.value })} value={currentObject[param]}></input>
                    </>
                })}
            </div>
            <div className='og-object-container-save' onClick={onSave}>Сохранить</div>
        </div>
    </>;
};

export default ObjectInfo;
