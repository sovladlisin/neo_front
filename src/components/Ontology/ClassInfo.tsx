import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassObjects, updateClass } from '../../actions/ontology/classes/classes';
import { TClass } from '../../actions/ontology/classes/types';
import { RootStore } from '../../store';

interface IClassInfoProps {
    class: TClass,
    onObjectSelect: (co: number) => void
}

const ClassInfo: React.FunctionComponent<IClassInfoProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)

    const [currentClass, setCurrentClass] = React.useState<TClass>(props.class)
    React.useEffect(() => setCurrentClass(props.class), [props.class])

    const [newAttributeName, setNewAttributeName] = React.useState('')
    const [newAttributeValue, setNewAttributeValue] = React.useState('')

    const [classObjects, setClassObjects] = React.useState<TClass[]>([])
    React.useEffect(() => { dispatch(getClassObjects(currentClass.id)) }, [currentClass])
    React.useEffect(() => {
        const data = classState.selectedClassObjects
        data.id === currentClass.id && setClassObjects(data.objects)
    }, [classState.selectedClassObjects])
    React.useEffect(() => {
        if (classObjects.find(co => co.id === classState.updatedClass.id)) {
            setClassObjects(classObjects.map(co => co.id === classState.updatedClass.id ? classState.updatedClass : co))
        }
    }, [classState.updatedClass])


    const onSave = () => {
        dispatch(updateClass(currentClass))
    }

    const onSignatureChange = (key, value: string) => {
        var newCurrentClass = { ...currentClass }
        var newSignature = JSON.parse(newCurrentClass.signature)
        newSignature[key] = value
        newCurrentClass.signature = JSON.stringify(newSignature)
        setCurrentClass(newCurrentClass)
    }

    const addAttributeToClass = () => {
        var newCurrentClass = { ...currentClass }
        var newSignature = newCurrentClass.signature && newCurrentClass.signature.length ? JSON.parse(newCurrentClass.signature) : {}
        newSignature[newAttributeName] = newAttributeValue
        newCurrentClass.signature = JSON.stringify(newSignature)
        setCurrentClass(newCurrentClass)
    }
    return <>
        <div className='og-class-info'>
            <p className='og-class-name'>{currentClass['uri']}</p>
            <p className='og-class-info-title'>Параметры:</p>
            <div className='og-class-info-params'>
                {currentClass.params.map(param => {
                    if (param.includes('signature')) return <></>
                    return <>
                        <label>{param}</label>
                        <input onChange={e => { setCurrentClass({ ...currentClass, [param]: e.target.value }) }} value={currentClass[param]}></input>
                    </>
                })}
            </div>
            <p className='og-class-info-title'>Атрибуты</p>
            <div className='og-class-add-field'>
                <input onChange={(e) => setNewAttributeName(e.target.value)} placeholder='Имя аттрибута' value={newAttributeName} />
                <input onChange={(e) => setNewAttributeValue(e.target.value)} placeholder='Тип аттрибута' value={newAttributeValue} />
                <button onClick={addAttributeToClass}>Добавить атрибут</button>
            </div>
            <div className='og-class-info-params'>

                {
                    currentClass.signature && currentClass.signature.length != 0 && Object.keys(JSON.parse(currentClass.signature)).map(key => {
                        return <>
                            <label className='og-class-signature'>{key}</label>
                            <input
                                onChange={e => { onSignatureChange(key, e.target.value) }}
                                value={JSON.parse(currentClass.signature)[key]}>
                            </input>
                        </>
                    })
                }
            </div>
            <button className='og-class-info-title' onClick={onSave}>Сохранить</button>
            <p className='og-class-info-title'>Объекты:</p>
            <div className='og-class-objects-container'>
                {classObjects.length != 0 && classObjects.map(co => {
                    return <div className='og-class-object' onClick={_ => props.onObjectSelect(co.id)}>
                        <p>{co['uri']}</p>
                    </div>
                })}
                {classObjects.length === 0 && <p>Объектов нет</p>}
            </div>
        </div>
    </>;
};

export default ClassInfo;
