import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClass, getClassObjects, updateClass, updateEntity } from '../../actions/ontology/classes/classes';
import { TAttributeType, TClass, TClassExtended } from '../../actions/ontology/classes/types';
import { RootStore } from '../../store';
import { DATA_TYPES, getName, LABEL, OBJECT_PROPERTY } from '../../utils';
import Loading from '../Loading';
import AttributeForm from './Forms/AttributeForm';
import TypeSelect from './TypeSelect'
import { Link } from 'react-router-dom'

interface IClassInfoProps {
    class_id: number,
    onObjectSelect: (co: number) => void,
    onObjectAdd: (class_uri: string) => void,
    domain: string
}

const ClassInfo: React.FunctionComponent<IClassInfoProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)

    const [currentClass, setCurrentClass] = React.useState<TClass>(null)
    const [currentClassExtended, setCurrentClassExtended] = React.useState<TClassExtended>(null)

    const [attributes, setAttributes] = React.useState<TClass[]>([])
    const [types, setTypes] = React.useState<TAttributeType>(null)

    const [attributesObj, setAttributesObj] = React.useState<TClass[]>([])
    const [typesObj, setTypesObj] = React.useState<TAttributeType>(null)

    const [newAttributeWindow, setNewAttributeWindow] = React.useState(false)



    const [classObjects, setClassObjects] = React.useState<TClass[]>([])

    React.useEffect(() => { setCurrentClass(null); dispatch(getClass(props.class_id)) }, [, props.class_id, classState.createdEntity])
    React.useEffect(() => {
        const data = classState.selectedClass
        if (!data || (data.id != props.class_id)) return;

        setClassObjects(data.objects)

        var temp_class = { ...data.class }
        temp_class.signature = temp_class.signature ? temp_class.signature : "{}"

        setAttributes(data.attributes)
        setTypes(data.types)
        setTypesObj(data.attribute_types)
        setAttributesObj(data.attributes_obj)
        setCurrentClass(temp_class)
        setCurrentClassExtended(data)

    }, [classState.selectedClass])


    // React.useEffect(() => {
    //     if (classObjects.find(co => co.id === classState.updatedClass.id)) {
    //         setClassObjects(classObjects.map(co => co.id === classState.updatedClass.id ? classState.updatedClass : co))
    //     }
    // }, [classState.updatedClass])


    const onSave = () => {
        var node = {}
        currentClass.params.map(p => {
            node[p] = currentClass[p]
        })
        node['id'] = currentClass.id

        if (currentClass.signature && Object.keys(JSON.parse(currentClass.signature) > 0))
            node['signature'] = currentClass.signature
        dispatch(updateEntity(node))
    }

    const onSignatureChange = (key: string, value) => {
        if (!value) return;
        var sig = JSON.parse(currentClass.signature)
        if (Object.keys(sig).includes(key)) {
            delete sig[key]
        }
        else {
            if (Array.isArray(value))
                sig[key] = value
            else sig[key] = [value]
        }
        setCurrentClass({ ...currentClass, signature: JSON.stringify(sig) })
    }

    const onSignatureDirectionChange = (key: string, value) => {
        var sig = JSON.parse(currentClass.signature)
        sig[key] = value
        setCurrentClass({ ...currentClass, signature: JSON.stringify(sig) })
    }

    const [selectedTexts, setSelectedTexts] = React.useState<number[]>([])
    const renderEntities = () => {
        if (!currentClassExtended) return <></>
        if (currentClassExtended.texts.length === 0) return <></>
        return <>
            <div className='class-info-entities-container'>
                <p className='og-object-info-text-title'>Размечен в текстах:</p>
                {currentClassExtended.texts.map(text => {
                    const is_selected = selectedTexts.includes(text.id)
                    const entities = currentClassExtended.entities.filter(e => e.text_uri === text['uri'])
                    return <>
                        <div className='og-object-info-text' onClick={_ => setSelectedTexts(is_selected ? selectedTexts.filter(t => t != text.id) : [...selectedTexts, text.id])}>
                            <p>{is_selected && <div className='opened-indicator'><i className="fas fa-arrow-down"></i></div>} {getName(text)}</p>
                            {is_selected && <div className='og-object-info-text-entities'>
                                {entities.map(entity => {
                                    return <div className='og-object-info-text-entity'>
                                        <p>{entity.pos_start} : {entity.pos_end}</p>
                                        <p>{entity.markup_object.name}</p>
                                        <Link to={'/workspace/' + text.id} target='_blank'><i className="fas fa-file-alt"></i></Link>
                                    </div>
                                })}
                            </div>}
                        </div>
                    </>
                })}
            </div>
        </>
    }

    return <>
        {(!currentClass || classState.classLoadingId === props.class_id) && <>
            <div className='og-class-info'>
                <Loading height={500} />
            </div>
        </>}
        {currentClass && classState.classLoadingId != props.class_id && <>
            <div className='og-class-info'>
                <p className='og-class-name'>{getName(currentClass)}</p>
                <p className='og-class-info-title'>Параметры</p>
                <div className='og-class-info-params-short'>
                    {currentClass.params.map(param => {
                        if (param.includes('signature')) return <></>
                        var p_name = param.includes('#') ? param.split('#').pop() : param
                        return <>
                            <label>{p_name}</label>
                            <input onChange={e => { setCurrentClass({ ...currentClass, [param]: e.target.value }) }} value={currentClass[param]}></input>
                        </>
                    })}
                </div>
                <p className='og-class-info-title'>Атрибуты <button id='add' onClick={_ => setNewAttributeWindow(true)}><i className='fas fa-plus'></i></button></p>
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
                                        Object.keys(JSON.parse(currentClass.signature)).includes(attr['uri']) ? <i className="fas fa-clipboard-check"></i> : <i className="fas fa-clipboard"></i>}

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
                                    {included ? <i className="fas fa-clipboard-check"></i> : <i className="fas fa-clipboard"></i>}

                                </button>
                                {included ? <button
                                    onClick={_ => onSignatureDirectionChange(attr['uri'], typesObj[attr.id] &&
                                        [OBJECT_PROPERTY, sig[attr['uri']][1] === 1 ? 0 : 1, typesObj[attr.id]['uri']])}
                                >
                                    {
                                        sig[attr['uri']][1] === 1 ? <i className="fas fa-arrow-right"></i> : <i className="fas fa-arrow-left"></i>
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

                <button className='og-class-info-title' style={{ background: '#3ed29b', color: 'white' }} onClick={onSave}>Сохранить</button>
                <p className='og-class-info-title'>Объекты<button id='add' onClick={_ => props.onObjectAdd(currentClass['uri'])}><i className='fas fa-plus'></i></button></p>
                <div className='og-class-objects-container'>
                    {classObjects.length != 0 && classObjects.map(co => {
                        return <div className='og-class-object' onClick={_ => props.onObjectSelect(co.id)}>
                            <p>{getName(co)}</p>
                        </div>
                    })}
                    {classObjects.length === 0 && <p>Объектов нет</p>}
                </div>
                {renderEntities()}
            </div>

        </>}
        {newAttributeWindow && <AttributeForm domain={props.domain} class_id={props.class_id} onClose={() => setNewAttributeWindow(false)}></AttributeForm>}
    </>
}

export default ClassInfo;
