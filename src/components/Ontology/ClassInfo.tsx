import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassObjects } from '../../actions/ontology/classes/classes';
import { TClass } from '../../actions/ontology/classes/types';
import { RootStore } from '../../store';

interface IClassInfoProps {
    class: TClass,
    onObjectSelect: (co: TClass) => void
}

const ClassInfo: React.FunctionComponent<IClassInfoProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)

    const [currentClass, setCurrentClass] = React.useState<TClass>(props.class)
    React.useEffect(() => setCurrentClass(props.class), [props.class])

    const [classObjects, setClassObjects] = React.useState<TClass[]>([])
    React.useEffect(() => { dispatch(getClassObjects(currentClass.id)) }, [currentClass])
    React.useEffect(() => {
        const data = classState.selectedClassObjects
        data.id === currentClass.id && setClassObjects(data.objects)
    }, [classState.selectedClassObjects])

    return <>
        <div className='og-class-info'>
            <p className='og-class-name'>{currentClass['uri']}</p>
            <p className='og-class-info-title'>Параметры:</p>
            <div className='og-class-info-params'>
                {currentClass.params.map(param => {

                    return <>
                        <label>{param}</label>
                        <p>{currentClass[param]}</p>
                    </>
                })}
            </div>

            <p className='og-class-info-title'>Объекты:</p>
            <div className='og-class-objects-container'>
                {classObjects.length != 0 && classObjects.map(co => {
                    return <div className='og-class-object' onClick={_ => props.onObjectSelect(co)}>
                        <p>{co['uri']}</p>
                    </div>
                })}
                {classObjects.length === 0 && <p>Объектов нет</p>}
            </div>
        </div>
    </>;
};

export default ClassInfo;
