import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassesWithSignatures, createEntity } from '../../../actions/ontology/classes/classes';
import { TClass } from '../../../actions/ontology/classes/types';
import { RootStore } from '../../../store';
import { DATA_TYPES, getName, NAMED_IND } from '../../../utils';
import { useOnClickOutside } from '../../HandleClickOutside';
import LangStringInput from './LangStringInput';
import ObjectSelector from './ObjectSelector';

interface IObjectFormProps {
    class_id?: number,
    onClose: () => void
}

type TObjectRelationForm = {
    object: TClass,
    direction: 0 | 1
}

const ObjectForm: React.FunctionComponent<IObjectFormProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)
    // windows
    const [formSelector, setFormSelector] = React.useState(false)
    //vars
    const [classes, setClasses] = React.useState<TClass[]>([])
    React.useEffect(() => {
        dispatch(getClassesWithSignatures())
    }, [])
    React.useEffect(() => { setClasses(classState.classesWithSignature) }, [, classState.classesWithSignature])

    const [selectedClass, setSelectedClass] = React.useState(props.class_id ? props.class_id : -1)
    React.useEffect(() => { setSelectedClass(props.class_id) }, [props.class_id])

    const [object, setObject] = React.useState({})
    const [objectUri, setObjectUri] = React.useState('http://erlangen-crm.org/current/[ваш_uri]')

    React.useEffect(() => {
        setObject({})
        if (selectedClass === -1) return;
        const s_class = classes.find(c => c.id === selectedClass)
        if (!s_class) return;

        const signature = JSON.parse(s_class.signature)
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
    }, [, selectedClass, classes])


    const renderForm = () => {
        if (Object.keys(object).length === 0) return <></>
        const s_class = classes.find(c => c.id === selectedClass)
        if (!s_class) return;

        const signature = JSON.parse(s_class.signature)
        const properties = Object.keys(signature).map(key => {
            if (signature[key].length === 1) return { key: key, type: signature[key][0] }
        }).filter(u => u != undefined)
        const object_props = Object.keys(signature).map(key => {
            if (signature[key].length > 1) return { key: key, type: signature[key] }
        }).filter(u => u != undefined)

        const props_forms = properties.map(p => {
            var i_type = DATA_TYPES.find(t => t.uri === p.type)
            var langString = i_type && i_type.type.includes('lang')
            return <>
                <label>{p.key}</label>
                {langString ? <LangStringInput value={object[p.key]} onChange={val => setObject({ ...object, [p.key]: val })} /> :
                    <input value={object[p.key]} onChange={e => setObject({ ...object, [p.key]: e.target.value })}></input>
                }
            </>
        })

        const object_forms = object_props.map(p => {
            const uri = p.type[2]
            const name = p.key
            return <>
                <label>{name}</label>
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
            {props_forms}
            {object_forms}
        </>
    }

    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    const onSave = () => {
        const s_class = classes.find(c => c.id === selectedClass)
        const uri = s_class['uri']
        var obj = { ...object }
        obj['uri'] = objectUri
        dispatch(createEntity(['Resource', uri, NAMED_IND], obj))
    }

    return <>
        <div className='og-form' ref={ref}>
            <p className='og-form-title'>{classes.length > 0 && getName(classes.find(c => c.id === selectedClass))}</p>
            {!props.class_id && <div className='og-form-settings-buttons'>
                <button onClick={_ => setFormSelector(!formSelector)}>Выбрать класс</button>
            </div>}

            <div className='og-form-body'>
                {selectedClass === -1 ? <div id='placeholder'></div> : <>
                    {renderForm()}
                </>}
            </div>
            {formSelector && <div className='og-form-selector'>
                {classes.map(cl => {
                    return <>
                        <button onClick={_ => { setSelectedClass(cl.id); setObject({}); }}>
                            {getName(cl)}
                        </button>
                    </>
                })}
            </div>}
            <button onClick={onSave}>Сохранить</button>

        </div>
        <div id='background'></div>
    </>;
};

export default ObjectForm;
