import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassesWithSignatures, createEntity, getClassFullSignature } from '../../../actions/ontology/classes/classes';
import { TClass, TClassFullSignature } from '../../../actions/ontology/classes/types';
import { uploadDocx } from '../../../actions/ontology/files/files';
import { TTextParams } from '../../../actions/ontology/files/types';
import { RootStore } from '../../../store';
import { DATA_TYPES, getName, getRandomInt, LABEL, LING_OBJECT_URI, NAMED_IND, NOTE_URI, ORIGINAL_TITLE_URI, RDF_TYPE, TEXT_COLLECTED_URI, TEXT_COMMENTED_URI, TEXT_COPRUS_URI, TEXT_DECRYPTED_URI, TEXT_DIALECT_URI, TEXT_D_URI, TEXT_IDK_URI, TEXT_I_URI, TEXT_LANGUAGE_URI, TEXT_NOTATED_URI, TEXT_PERFORMED_URI, TEXT_REDACTED_URI, TEXT_SPEECH_URI, TEXT_TYPE_URI, TITLE_URI } from '../../../utils';
import { useOnClickOutside } from '../../HandleClickOutside';
import Loading from '../../Loading';
import LangStringInput from './LangStringInput';
import ObjectSelector from './ObjectSelector';

interface ITextFormProps {
    in_params: TTextParams,
    file: File,
    corpus_id: number
}

export type TObjectRelationForm = {
    object: TClass,
    direction: 0 | 1
}

const TextForm: React.FunctionComponent<ITextFormProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)
    // windows
    const [formSelector, setFormSelector] = React.useState(false)
    //vars
    const [fullSignature, setFullSignature] = React.useState<TClassFullSignature>(null)
    React.useEffect(() => {
        dispatch(getClassFullSignature(LING_OBJECT_URI))
    }, [])
    React.useEffect(() => { classState.classFullSignature && classState.classFullSignature.uri == LING_OBJECT_URI && setFullSignature(classState.classFullSignature) }, [, classState.classFullSignature])


    const [selectedClass, setSelectedClass] = React.useState(LING_OBJECT_URI)

    const [object, setObject] = React.useState({})
    const [objectUri, setObjectUri] = React.useState('http://erlangen-crm.org/current/ваш_uri')
    const [objectRDFS, setObjectRDFS] = React.useState(['название_объекта@ru'])

    const getTextParamToUri = (uri: string) => {
        switch (uri) {
            case NOTE_URI:
                return props.in_params.note
            case TITLE_URI:
                return props.in_params.title
            case ORIGINAL_TITLE_URI:
                return props.in_params.lang_origin
            case TEXT_PERFORMED_URI:
                return props.in_params.permormed_by
            case TEXT_SPEECH_URI:
                return props.in_params.speech
            case TEXT_DECRYPTED_URI:
                return props.in_params.decrypted_by
            case TEXT_REDACTED_URI:
                return props.in_params.redactor
            case TEXT_COLLECTED_URI:
                return props.in_params.collected_by
            case TEXT_LANGUAGE_URI:
                return props.in_params.lang
            case TEXT_NOTATED_URI:
                return props.in_params.notation_by
            case TEXT_COMMENTED_URI:
                return props.in_params.commantator
            case TEXT_DIALECT_URI:
                return props.in_params.dialect
            default:
                return ''
        }
    }

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
            if (langString)
                obj[p.key] = []
            else {
                obj[p.key] = getTextParamToUri(p.key)
            }



        })
        var new_tooltip = {}
        object_props.map(p => {
            const blank_connection: TObjectRelationForm = { object: null, direction: p.type[1] }
            obj[p.key] = blank_connection
            const val = getTextParamToUri(p.key)
            new_tooltip[p.key] = val
        })
        setObject(obj)
        setParamTooltips(new_tooltip)
    }, [, selectedClass, fullSignature])

    const [paramTooltips, setParamTooltips] = React.useState<{}>({})

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
                <div className='text-upload-form-params-container'>
                    <label>{title}</label>
                    {langString ? <LangStringInput value={object[p.key]} onChange={val => setObject({ ...object, [p.key]: val })} /> :
                        <input value={object[p.key]} onChange={e => setObject({ ...object, [p.key]: e.target.value })}></input>
                    }
                </div>
            </>
        })

        const object_forms = object_props.map(p => {
            const uri = p.type[2]
            var prop_node = fullSignature.type_nodes.find(tn => tn['uri'] === p.key)
            const title = prop_node ? getName(prop_node) : p.key
            const tooltip_check = paramTooltips[p.key] && paramTooltips[p.key].length > 0
            return <>
                <div className={!tooltip_check ? 'text-upload-form-rel-container' : 'text-upload-form-rel-container-with-tooltip'}>
                    {paramTooltips[p.key] && paramTooltips[p.key].length > 0 && <div className='text-upload-form-tooltip-field'>
                        {paramTooltips[p.key]}
                    </div>}
                    <div>
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
                    </div>



                </div>
            </>
        })

        return <>
            <div className='text-upload-form-params-container'>
                <label>URI</label>
                <input value={objectUri} onChange={e => setObjectUri(e.target.value)}></input>
            </div>
            <div className='text-upload-form-params-container'>
                <label>Метка названия:</label>
                <LangStringInput
                    value={
                        objectRDFS.map(item => {

                            return { val: item.split('@')[0], type: '@' + item.split('@')[1], id: getRandomInt(0, 1000) }
                        })
                    }
                    onChange={val => setObjectRDFS(val.map(item => item.val + item.type))} />
            </div>

            {props_forms}
            {object_forms}
        </>
    }



    const onSave = () => {
        const uri = selectedClass
        const s_class = fullSignature.class_node

        var obj = { ...object }
        obj['uri'] = objectUri
        obj[LABEL] = objectRDFS
        obj[RDF_TYPE] = { object: s_class, direction: 1 }
        dispatch(uploadDocx(obj, props.file, props.corpus_id))
    }

    return <>
        <div className='og-form'>
            {classState.isFullSignatureLoading ?
                <>
                    <Loading height={400}></Loading>
                </> :
                <>
                    <p className='og-form-title'>{fullSignature && fullSignature.uri === LING_OBJECT_URI ? getName(fullSignature.class_node) : 'Сигнатура отсутствует'}</p>

                    <div className='og-text-upload-form-body'>
                        {selectedClass.length === 0 ? <div id='placeholder'></div> : <>
                            {renderForm()}
                        </>}
                    </div>
                    <button onClick={onSave}>СОХРАНИТЬ</button>

                </>}

        </div>

    </>;
};

export default TextForm;
