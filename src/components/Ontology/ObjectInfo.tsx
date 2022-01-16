import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEntity, getClassObject, updateClass, updateEntity } from '../../actions/ontology/classes/classes';
import { TClass, TObjectExtended } from '../../actions/ontology/classes/types';
import { RootStore } from '../../store';
import { DATA_TYPES, getName, getRandomInt, LABEL, LING_OBJECT_URI, SERVER_DOMAIN, useKeyPress } from '../../utils';
import { useOnClickOutside } from '../HandleClickOutside';
import ObjectSelector from './Forms/ObjectSelector'
import { Link } from 'react-router-dom'
import Loading from '../Loading';
import { useEffect } from 'react';
import LangStringInput from './Forms/LangStringInput';

interface IObjectInfoProps {
    object_id: number,
    onClose: () => void,
    onSelect: (id: number) => void
}
type TObjectRelationForm = {
    object: TClass,
    direction: 0 | 1,
    object_uri: string
}


const ObjectInfo: React.FunctionComponent<IObjectInfoProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)

    const [currentObject, setCurrentObject] = React.useState<TObjectExtended>(null)
    const [newCurrentObject, setNewCurrentObject] = React.useState<TObjectExtended>(null)
    const [updatedObject, setUpdatedObject] = React.useState({})

    const [fileLink, setFileLink] = React.useState('')

    const ctrlPress = useKeyPress('Control')

    React.useEffect(() => { dispatch(getClassObject(props.object_id)) }, [, props.object_id])
    React.useEffect(() => {
        var new_obj = classState.selectedObject
        if (new_obj && props.object_id === new_obj.id) {
            setCurrentObject(new_obj)
        }
    }, [classState.selectedObject])

    React.useEffect(() => {
        setNewCurrentObject(null)


        if (currentObject === null) return;

        const newNewCurrentObject = { ...currentObject }

        const signature = newNewCurrentObject.class_signature

        const properties = Object.keys(signature).map(key => {
            if (signature[key].length === 1) return { key: key, type: signature[key][0] }
        }).filter(u => u != undefined)

        const object_props = Object.keys(signature).map(key => {
            if (signature[key].length > 1) return { key: key, type: signature[key] }
        }).filter(u => u != undefined)

        // const type_names = {}
        // newNewCurrentObject.class_attributes.map(at => {
        //     type_names[at.labels[0]] = at
        // })

        var local_params = {}

        properties.map(p => {
            // console.log(p)
            var i_type = DATA_TYPES.find(t => t.uri === p.type)
            var langString = i_type && i_type.type.includes('lang')
            if (!currentObject.object[p.key]) {
                newNewCurrentObject.object[p.key] = langString ? [] : ''
                !newNewCurrentObject.object.params.includes(p.key) && newNewCurrentObject.object.params.push(p.key)
            }

        })

        // file
        if (currentObject.fileLink && currentObject.fileLink.length > 0) setFileLink(currentObject.fileLink)


        object_props.map(p => {
            const d = currentObject.relations.find(r =>
                r.labels[0] === p.key
            )
            if (d) {

            }
            else {
                // const blank_connection: TObjectRelationForm = { object: null, direction: p.type[1], object_uri: p.type[2] }

                newNewCurrentObject.relations.push({
                    id: getRandomId(-1000000, -1),
                    labels: [p.key],
                    start_node: p.type[1] === 0 ? null : currentObject.object,
                    end_node: p.type[1] === 1 ? null : currentObject.object,
                    params: []
                })

            }
        })
        setNewCurrentObject(newNewCurrentObject)
    }, [, currentObject])

    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    const onSave = () => {
        var obj = {}
        obj['id'] = newCurrentObject.object.id
        obj['uri'] = newCurrentObject.object['uri']
        newCurrentObject.object.params.map(p => {
            obj[p] = newCurrentObject.object[p]
        })
        newCurrentObject.relations.map(r => {
            var new_r: { direction: number, object: TClass, id: number, label: string } = { direction: 1, object: null, id: -1, label: r.labels[0] }
            new_r.id = r.id
            if (r.start_node && r.start_node.id === newCurrentObject.object.id) {
                new_r.direction = 1
                new_r.object = r.end_node
            }
            else {
                new_r.direction = 0
                new_r.object = r.start_node
            }
            obj[r.labels[0] + '' + new_r.id] = new_r
        })
        dispatch(updateEntity(obj))
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    const selectObject = (id: number) => {
        props.onSelect(id)
    }

    const getRandomId = (min, max) => {
        return Math.random() * (max - min) + min;
    }


    const addNewRelation = (rel_key: string, start: TClass, end: TClass,) => {
        var new_obj = { ...newCurrentObject }

        new_obj.relations.push({
            id: getRandomId(-1000000, -1),
            labels: [rel_key],
            start_node: start,
            end_node: end,
            params: [],
        })
        setNewCurrentObject(new_obj)
    }

    const renderParams = () => {
        if (newCurrentObject === null) return <></>
        const signature = newCurrentObject.class_signature
        // const check_prop = (x) => Object.keys(signature).includes(x)

        const l_props = newCurrentObject.object.params.map(p => {
            // console.log(p)
            const attr = newCurrentObject.class_attributes.find(a => p === a['uri'])
            var name = attr ? getName(attr) : p
            name = name.includes('#') ? name.split('#').pop() : name
            name = name.includes('/') ? name.split('/').pop() : name

            const value = updatedObject[p] ? updatedObject[p] : newCurrentObject.object[p]
            if (p === 'uri') return <></>
            if (p === LABEL) {
                return <>
                    <label>Короткое название</label>

                    <LangStringInput
                        value={
                            value.map(item => {

                                return { val: item.split('@')[0], type: '@' + item.split('@')[1], id: getRandomInt(0, 1000) }
                            })
                        }
                        onChange={val => {
                            setNewCurrentObject(
                                {
                                    ...newCurrentObject,
                                    // @ts-ignore
                                    object: { ...newCurrentObject.object, [p]: val.map(item => item.val + item.type) }
                                })
                        }}

                    />
                </>
            }
            return <>
                <label>{name}</label>
                <input value={value} onChange={e => {
                    setNewCurrentObject(
                        {
                            ...newCurrentObject,
                            object: { ...newCurrentObject.object, [p]: e.target.value }
                        })

                }}></input>
            </>

        })

        const pre_rel_start = newCurrentObject.relations.filter(rel => rel.start_node && rel.start_node.id === newCurrentObject.id)
        var relations_start = {}
        pre_rel_start.map(r => {
            if (!relations_start[r.labels[0]]) relations_start[r.labels[0]] = []
            relations_start[r.labels[0]] = [...relations_start[r.labels[0]], r]
        })

        const pre_rel_end = newCurrentObject.relations.filter(rel => rel.end_node && rel.end_node.id === newCurrentObject.id)
        var relations_end = {}
        pre_rel_end.map(r => {
            if (!relations_end[r.labels[0]]) relations_end[r.labels[0]] = []
            relations_end[r.labels[0]] = [...relations_end[r.labels[0]], r]
        })


        const rel_start = Object.keys(relations_start).map(rel_key => {
            const local_relations = relations_start[rel_key]
            const attribute = newCurrentObject.class_attributes.find(a => a['uri'] === rel_key)
            var name = attribute ? getName(attribute) : rel_key
            name = name.includes('#') ? name.split('#').pop() : name
            name = name.includes('/') ? name.split('/').pop() : name

            const object_uri = signature[rel_key] ? signature[rel_key][2] : ''

            return <>
                <p className='object-info-relation-name'>
                    {name}
                    {object_uri.length > 0 && <button className='obj-add-rel' onClick={_ => addNewRelation(rel_key, newCurrentObject.object, null)}><i className='fas fa-plus'></i></button>}
                </p>
                <div className='object-info-relation-items'>
                    {local_relations.map(rel => {

                        const default_obj = rel.end_node

                        return <>
                            <ObjectSelector
                                uri={object_uri}
                                default={default_obj}
                                relation={rel}
                                onClick={() => default_obj && props.onSelect(default_obj['id'])}
                                onSelect={(obj, rel) => setNewCurrentObject(
                                    {
                                        ...newCurrentObject,
                                        relations: newCurrentObject.relations.map(r => {
                                            if (r.id === rel.id) {
                                                return { ...rel, end_node: obj }
                                            }
                                            return r
                                        })
                                    })}

                            />
                        </>
                    })}
                </div>
            </>
        })

        const rel_end = Object.keys(relations_end).map(rel_key => {

            const local_relations = relations_end[rel_key]
            const attribute = newCurrentObject.class_attributes.find(a => a['uri'] === rel_key)
            var end_name = attribute ? getName(attribute) : rel_key
            end_name = end_name.includes('#') ? end_name.split('#').pop() : end_name
            end_name = end_name.includes('/') ? end_name.split('/').pop() : end_name
            const object_uri = signature[rel_key] ? signature[rel_key][2] : ''

            return <>
                <p className='object-info-relation-name'>
                    {end_name}
                    {object_uri.length > 0 && <button className='obj-add-rel' onClick={_ => addNewRelation(rel_key, null, newCurrentObject.object)}><i className='fas fa-plus'></i></button>}
                </p>
                <div className='object-info-relation-items'>
                    {local_relations.map(rel => {
                        const selectedObjectField = rel.start_node
                        return <>
                            <ObjectSelector
                                uri={object_uri}
                                relation={rel}
                                default={selectedObjectField}
                                onClick={() => selectedObjectField && props.onSelect(selectedObjectField['id'])}
                                onSelect={(obj, rel) => setNewCurrentObject(
                                    {
                                        ...newCurrentObject,
                                        relations: newCurrentObject.relations.map(r => {
                                            if (r.id === rel.id) {
                                                return { ...rel, start_node: obj }
                                            }
                                            return r
                                        })
                                    })}
                            />
                        </>
                    })}

                </div>
            </>
        })

        return <>
            <p className='og-object-container-separator'>Параметры</p>
            <div className='og-object-container-params'>
                {l_props}
            </div>
            {rel_start.length > 0 && <>
                <p className='og-object-container-separator'> {'->'} </p>
                <div className='og-object-container-relations'>
                    {rel_start}
                </div>
            </>}
            {rel_end.length > 0 && <>
                <p className='og-object-container-separator'>{'<-'}</p>
                <div className='og-object-container-relations'>
                    {rel_end}
                </div>
            </>}

        </>
    }


    const onDelete = () => {
        dispatch(deleteEntity(currentObject.id))
        props.onClose()
    }

    const authState = useSelector((state: RootStore) => state.auth)

    const renderControlPanel = () => {
        const obj = newCurrentObject
        if (obj === null) return;

        return <>
            {obj.object.labels.includes(LING_OBJECT_URI) && obj.object.id != 544 && <>
                <Link to={'/workspace/' + newCurrentObject.id} target='_blank'><i className="fas fa-file-alt"></i></Link>
            </>}
            {authState.user.is_editor && <>
                <button onClick={onDelete}><i className="fas fa-trash"></i></button>
                <button onClick={_ => onSave()}><i className="fas fa-save"></i></button>
            </>}

            <button onClick={_ => props.onClose()}><i className="fas fa-times"></i></button>
        </>
    }

    const [selectedTexts, setSelectedTexts] = React.useState<number[]>([])
    const renderEntities = () => {
        if (!currentObject) return <></>
        if (currentObject.texts.length === 0) return <></>
        return <>
            <p className='og-object-info-text-title'>Размечен в текстах:</p>
            {currentObject.texts.map(text => {
                const is_selected = selectedTexts.includes(text.id)
                const entities = currentObject.entities.filter(e => e.text_uri === text['uri'])
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
        </>
    }

    return <>
        {classState.isObjectLoading && <> <div className='og-object-container' ref={ref}><Loading height={300} /></div></>}
        {!classState.isObjectLoading && !newCurrentObject && <> <div className='og-object-container' ref={ref}><div id='empty'><i className='fas fa-times'></i></div></div></>}
        {!classState.isObjectLoading && newCurrentObject && <>
            <div className='main-background'></div>
            <div className='og-object-container' ref={ref}>
                <div className='og-object-control-pannel'>
                    {renderControlPanel()}
                </div>
                <p className='og-object-container-title'>{getName(currentObject.object)}</p>
                {/* {fileLink.length > 0 && <>
                    <div className='og-object-file'>
                        <img src={SERVER_DOMAIN.slice(0, -1) + fileLink}></img>
                    </div>
                </>} */}
                {renderParams()}
                {renderEntities()}
            </div>
        </>}
    </>;
};

export default ObjectInfo;
