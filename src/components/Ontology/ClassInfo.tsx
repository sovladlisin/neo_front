import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClass, getClassObjects, updateClass } from '../../actions/ontology/classes/classes';
import { TAttributeType, TClass } from '../../actions/ontology/classes/types';
import { RootStore } from '../../store';
import { DATA_TYPES, getName, LABEL, OBJECT_PROPERTY } from '../../utils';
import TypeSelect from './TypeSelect'
interface IClassInfoProps {
    class_id: number,
    onObjectSelect: (co: number) => void,
    onObjectAdd: (class_id: number) => void
}

const ClassInfo: React.FunctionComponent<IClassInfoProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)

    const [currentClass, setCurrentClass] = React.useState<TClass>(null)

    const [attributes, setAttributes] = React.useState<TClass[]>([])
    const [types, setTypes] = React.useState<TAttributeType>(null)

    const [attributesObj, setAttributesObj] = React.useState<TClass[]>([])
    const [typesObj, setTypesObj] = React.useState<TAttributeType>(null)

    const [newAttributeName, setNewAttributeName] = React.useState('')
    const [newAttributeValue, setNewAttributeValue] = React.useState('')

    const [localSignature, setLocalSignature] = React.useState('')


    const [classObjects, setClassObjects] = React.useState<TClass[]>([])

    React.useEffect(() => { dispatch(getClass(props.class_id)) }, [, props.class_id])
    React.useEffect(() => {
        const data = classState.selectedClass
        data.id === props.class_id && setClassObjects(data.objects)
        data.id === props.class_id && setCurrentClass(data.class)
        data.id === props.class_id && setAttributes(data.attributes)
        data.id === props.class_id && setTypes(data.types)
        data.id === props.class_id && setTypesObj(data.attribute_types)
        data.id === props.class_id && setAttributesObj(data.attributes_obj)
    }, [classState.selectedClass])


    // React.useEffect(() => {
    //     if (classObjects.find(co => co.id === classState.updatedClass.id)) {
    //         setClassObjects(classObjects.map(co => co.id === classState.updatedClass.id ? classState.updatedClass : co))
    //     }
    // }, [classState.updatedClass])


    const onSave = () => {
        dispatch(updateClass(currentClass))
    }

    const onSignatureChange = (key: string, value) => {
        if (!value) return;
        var sig = JSON.parse(currentClass.signature)
        if (Object.keys(sig).includes(key)) {
            delete sig[key]
        }
        else {
            sig[key] = value
        }
        setCurrentClass({ ...currentClass, signature: JSON.stringify(sig) })
    }

    const onSignatureDirectionChange = (key: string, value) => {
        var sig = JSON.parse(currentClass.signature)
        sig[key] = value
        setCurrentClass({ ...currentClass, signature: JSON.stringify(sig) })
    }

    const addAttributeToClass = () => {

    }



    return <>
        {currentClass && <>
            <div className='og-class-info'>
                <p className='og-class-name'>{getName(currentClass)}</p>
                <p className='og-class-info-title'>Параметры:</p>
                <div className='og-class-info-params'>
                    {currentClass.params.map(param => {
                        if (param.includes('signature')) return <></>
                        return <>
                            <span></span>
                            <span></span>
                            <label>{param}</label>
                            <input onChange={e => { setCurrentClass({ ...currentClass, [param]: e.target.value }) }} value={currentClass[param]}></input>
                        </>
                    })}
                </div>
                <p className='og-class-info-title'>Атрибуты</p>
                {/* <div className='og-class-add-field'>
                    <input onChange={(e) => setNewAttributeName(e.target.value)} placeholder='Имя аттрибута' value={newAttributeName} />
                    <input onChange={(e) => setNewAttributeValue(e.target.value)} placeholder='Тип аттрибута' value={newAttributeValue} />
                    <button onClick={addAttributeToClass}>Добавить атрибут</button>
                </div> */}
                <div className='og-class-info-params'>
                    {
                        attributes.length != 0 && attributes.map(attr => {
                            return <>
                                <button id='signature-button'
                                    onClick={_ => onSignatureChange(attr['uri'], types[attr.id] && types[attr.id]['uri'])}
                                >
                                    {currentClass.signature &&
                                        currentClass.signature.length > 0 &&
                                        types[attr.id] &&
                                        Object.keys(JSON.parse(currentClass.signature)).includes(attr['uri']) ? 'Y' : 'N'}

                                </button>
                                <span />
                                <label className='og-class-signature'>{getName(attr)}</label>
                                {types[attr.id] ?
                                    <TypeSelect default={DATA_TYPES.find(d => d.uri === types[attr.id]['uri'])} onSelect={_ => { }} />
                                    :
                                    <><span></span></>}
                            </>


                        })
                    }
                    {
                        attributesObj.length != 0 && attributesObj.map(attr => {
                            const sig = currentClass.signature && JSON.parse(currentClass.signature)
                            const included = currentClass.signature &&
                                currentClass.signature.length > 0 &&
                                typesObj[attr.id] &&
                                Object.keys(sig).includes(attr['uri'])
                            return <>

                                <button id='signature-button'
                                    onClick={_ => onSignatureChange(attr['uri'], typesObj[attr.id] &&
                                        [OBJECT_PROPERTY, 0, typesObj[attr.id]['uri']])}
                                >
                                    {included ? 'Y' : 'N'}

                                </button>
                                {included ? <button
                                    onClick={_ => onSignatureDirectionChange(attr['uri'], typesObj[attr.id] &&
                                        [OBJECT_PROPERTY, sig[attr['uri']][1] === 1 ? 0 : 1, typesObj[attr.id]['uri']])}
                                >
                                    {
                                        sig[attr['uri']][1] === 1 ? '->' : '<-'
                                    }
                                </button> : <span />}


                                <label className='og-class-signature'>{getName(attr)}</label>
                                {typesObj[attr.id] ?
                                    <span>{getName(typesObj[attr.id])}</span>
                                    :
                                    <><span></span></>}
                            </>


                        })
                    }
                </div>

                <button className='og-class-info-title' onClick={onSave}>Сохранить</button>
                <p className='og-class-info-title'>Объекты:<button id='add' onClick={_ => props.onObjectAdd(props.class_id)}>+</button></p>
                <div className='og-class-objects-container'>
                    {classObjects.length != 0 && classObjects.map(co => {
                        return <div className='og-class-object' onClick={_ => props.onObjectSelect(co.id)}>
                            <p>{getName(co)}</p>
                        </div>
                    })}
                    {classObjects.length === 0 && <p>Объектов нет</p>}
                </div>
            </div>

        </>}

    </>;
};

export default ClassInfo;
