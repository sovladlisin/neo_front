import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassesWithSignatures, createEntity, getClassFullSignature } from '../../../actions/ontology/classes/classes';
import { TClass, TClassFullSignature } from '../../../actions/ontology/classes/types';
import { RootStore } from '../../../store';
import { DATA_TYPES, getName, LABEL, NAMED_IND, RDF_TYPE } from '../../../utils';
import { useOnClickOutside } from '../../HandleClickOutside';
import Loading from '../../Loading';
import LangStringInput from './LangStringInput';
import ObjectSelector from './ObjectSelector';

interface IObjectFormProps {
    class_uri?: string,
    onClose: () => void,
    domain: string
}

export type TObjectRelationForm = {
    object: TClass,
    direction: 0 | 1
}

const ObjectForm: React.FunctionComponent<IObjectFormProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)
    // windows
    const [formSelector, setFormSelector] = React.useState(false)
    //vars
    const [fullSignature, setFullSignature] = React.useState<TClassFullSignature>(null)
    React.useEffect(() => {
        dispatch(getClassFullSignature(props.class_uri))
    }, [])
    React.useEffect(() => { classState.classFullSignature && classState.classFullSignature.uri == props.class_uri && setFullSignature(classState.classFullSignature) }, [, classState.classFullSignature])


    const [selectedClass, setSelectedClass] = React.useState(props.class_uri ? props.class_uri : '')
    React.useEffect(() => { setSelectedClass(props.class_uri) }, [props.class_uri])

    const [object, setObject] = React.useState({})
    const [objectUri, setObjectUri] = React.useState(props.domain === 'Resource' ? 'http://erlangen-crm.org/current/[ваш_uri]' : props.domain + '/[ваш_uri]')
    const [objectRDFS, setObjectRDFS] = React.useState(['название_объекта@ru'])

    React.useEffect(() => {
        setObject({})
        if (!fullSignature) return;

        var signature = fullSignature.class_signature
        fullSignature.parents_signature.map(ps => {
            signature = Object.assign({}, signature, ps);
        })

        const properties = Object.keys(signature).map(key => {
            if (signature[key].length === 1) return { key: key, type: signature[key][0] }
        }).filter(u => u != undefined)

        const object_props = Object.keys(signature).map(key => {
            if (signature[key].length > 1) return { key: key, type: signature[key] }
        }).filter(u => u != undefined)
        var obj = {}
        properties.map(p => {
            var i_type = DATA_TYPES.find(t => t.uri === p.type)
            var langString = i_type && i_type.type.includes('lang')
            obj[p.key] = langString ? [] : ''
        })
        object_props.map(p => {
            const blank_connection: TObjectRelationForm = { object: null, direction: p.type[1] }
            obj[p.key] = blank_connection
        })
        setObject(obj)
    }, [, selectedClass, fullSignature])


    const renderForm = () => {
        if (Object.keys(object).length === 0) return <></>


        var signature = fullSignature.class_signature
        fullSignature.parents_signature.map(ps => {
            signature = Object.assign({}, signature, ps);
        })

        const properties = Object.keys(signature).map(key => {
            if (signature[key].length === 1) return { key: key, type: signature[key][0] }
        }).filter(u => u != undefined)
        const object_props = Object.keys(signature).map(key => {
            if (signature[key].length > 1) return { key: key, type: signature[key] }
        }).filter(u => u != undefined)

        const props_forms = properties.map(p => {
            var i_type = DATA_TYPES.find(t => t.uri === p.type)
            var langString = i_type && i_type.type.includes('lang')
            var prop_node = fullSignature.type_nodes.find(tn => tn['uri'] === p.key)
            const title = prop_node ? getName(prop_node) : p.key
            return <>
                <label>{title}</label>
                {langString ? <LangStringInput value={object[p.key]} onChange={val => setObject({ ...object, [p.key]: val })} /> :
                    <input value={object[p.key]} onChange={e => setObject({ ...object, [p.key]: e.target.value })}></input>
                }
            </>
        })

        const object_forms = object_props.map(p => {
            const uri = p.type[2]
            var prop_node = fullSignature.type_nodes.find(tn => tn['uri'] === p.key)
            const title = prop_node ? getName(prop_node) : p.key
            return <>
                <label>{title}</label>
                <ObjectSelector
                    uri={uri}
                    default={object[p.key].object}
                    onSelect={obj => setObject(
                        {
                            ...object,
                            [p.key]:
                            {
                                ...object[p.key],
                                object: obj
                            }
                        })
                    } />
            </>
        })

        return <>
            <label>URI</label>
            <input value={objectUri} onChange={e => setObjectUri(e.target.value)}></input>
            <label>Метка названия:</label>
            <LangStringInput value={objectRDFS} onChange={val => setObjectRDFS(val)} />
            {props_forms}
            {object_forms}
        </>
    }


    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    const onSave = () => {
        const uri = selectedClass
        const s_class = fullSignature.class_node

        var obj = { ...object }
        obj['uri'] = objectUri
        obj[LABEL] = objectRDFS
        obj[RDF_TYPE] = { object: s_class, direction: 1 }
        dispatch(createEntity([props.domain, uri, NAMED_IND, 'Resource'], obj))
        props.onClose()
    }

    return <>
        <div className='og-form' ref={ref}>
            {classState.isFullSignatureLoading ?
                <>
                    <Loading height={400}></Loading>
                </> :
                <>
                    <p className='og-form-title'>{fullSignature && fullSignature.uri === props.class_uri ? getName(fullSignature.class_node) : 'Сигнатура отсутствует'}</p>

                    <div className='og-form-body'>
                        {selectedClass.length === 0 ? <div id='placeholder'></div> : <>
                            {renderForm()}
                        </>}
                    </div>
                    <button onClick={onSave}>Сохранить</button>

                </>}

        </div>
        <div id='background'></div>
    </>;
};

export default ObjectForm;
