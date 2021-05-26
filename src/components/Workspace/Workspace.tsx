import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom'
import { getDomainOntologies } from '../../actions/ontology/classes/classes';
import { TClass } from '../../actions/ontology/classes/types';
import { TEntity, TMarkup, TTextRelation, TWorkspaceInfo } from '../../actions/workspace/types';
import { deleteTextEnitity, editMarkup, getMarkups, getTextEntities, getTextRelations, getWorkspace } from '../../actions/workspace/workspace';
import { RootStore } from '../../store';
import { getName, SERVER_DOMAIN, SERVER_URL, NOTE_URI, useKeyPress, NAMED_IND, CLASS } from '../../utils';
import EntityForm from './EntityForm';
import MarkupForm from './MarkupForm';
import RelationForm from './RelationForm';
import Xarrow from "react-xarrows";
import ClassInfo from '../Ontology/ClassInfo';
import ObjectForm from '../Ontology/Forms/ObjectForm';
import ObjectInfo from '../Ontology/ObjectInfo';
import CommentaryInfo from './CommentaryInfo';
import { changeComments } from '../../actions/ontology/files/files';

interface IWorkspaceProps {
    id: string
}
export type TComment = {
    position: number,
    text: string,
}

const REGEX = /(\s*[,\n.\s]+\s*)/

const Workspace: React.FunctionComponent<IWorkspaceProps> = ({ match }: RouteComponentProps<IWorkspaceProps>) => {
    const ctrlPress = useKeyPress('Control');
    const shiftPress = useKeyPress('Shift');

    const dispatch = useDispatch()
    const workState = useSelector((state: RootStore) => state.workspace)

    const current_id: number = parseInt(match.params.id)

    const [addEntityWindow, setAddEntityWindow] = React.useState(false)

    const [originalText, setOriginalText] = React.useState<string[]>([])
    const [translatedText, setTranslatedText] = React.useState<string[]>([])
    const [commentaryText, setCommentaryText] = React.useState<TComment[]>([])

    const [selectedView, setSelectedView] = React.useState(3)

    const [relationAddWindow, setRelationAddWindow] = React.useState(false)

    const [selectedObject, setSelectedObject] = React.useState(-1)
    const [selectedClass, setSelectedClass] = React.useState(-1)
    const [selectedClassForObjectAdd, setSelectedClassForObjectAdd] = React.useState('')
    const [objectAddWindow, setObjectAddWindow] = React.useState(false)

    // markup
    const [newEntity, setNewEntity] = React.useState<TEntity>({ pos_end: -1, pos_start: -1, node_uri: '', node: null })
    const apllyToSelectedWords = (key: number) => {
        var n = { ...newEntity }
        if (n.pos_start === -1 && n.pos_end === -1) {
            n.pos_start = key
            n.pos_end = key
        }
        else if (n.pos_start < key && n.pos_end > key || n.pos_start > key && n.pos_end > key)
            n.pos_start = key
        else if (n.pos_start === key && n.pos_end === key) {
            n.pos_start = -1
            n.pos_end = -1
        }
        else if (n.pos_start === key || n.pos_end === key) {
            n.pos_start = key
            n.pos_end = key
        }
        else if (n.pos_start < key && n.pos_end < key)
            n.pos_end = key
        setNewEntity(n)
    }


    React.useEffect(() => {
        dispatch(getWorkspace(current_id))
    }, [])

    const [workInfo, setWorkInfo] = React.useState<TWorkspaceInfo>(null)
    React.useEffect(() => {
        if (!workState.info || workState.info.id != current_id) return;
        setWorkInfo(workState.info)
    }, [, workState.info])


    const classState = useSelector((state: RootStore) => state.classes)

    const [ontologies, setOntologies] = React.useState<TClass[]>([])
    React.useEffect(() => { dispatch(getDomainOntologies()) }, [, classState.createdEntity])
    React.useEffect(() => { setOntologies(classState.domainOntologies) }, [, classState.domainOntologies])
    const [selectedOntology, setSelectedOntology] = React.useState<TClass>(null)


    React.useEffect(() => {
        if (workInfo === null) return;
        dispatch(getMarkups(workInfo.origin_node['uri']))
        const dom = SERVER_DOMAIN.slice(0, -1)
        fetch(dom + workInfo.origin_url).then((r) => r.text()).then(text => {
            setOriginalText(text.split('\n'))
        })
        fetch(dom + workInfo.translation_url).then((r) => r.text()).then(text => {
            setTranslatedText(text.split('\n'))
        })
        fetch(dom + workInfo.commentary_url).then((r) => r.text()).then(text => {
            var i = -1
            setCommentaryText(text.split('\n').map(c => {
                i = i + 1
                return { position: i, text: c }
            }))
        })
    }, [workInfo])

    const [markups, setMarkups] = React.useState<TMarkup[]>([])
    const [selectedMarkup, setSelectedMarkup] = React.useState<TMarkup>(null)
    const [onEditMarkup, setOnEditMarkup] = React.useState<TMarkup>(null)
    React.useEffect(() => {
        if (workInfo && workState.textMarkups && workState.textMarkups.text_uri === workInfo.origin_node['uri']) {
            setMarkups(workState.textMarkups.markups)
            console.log('1', markups)
        }
    }, [, workState.textMarkups, workInfo, workState.newMarkup])

    const [numberOfLines, setNumberOfLines] = React.useState(50)
    const [pageNumber, setPageNumber] = React.useState(1)
    const renderNavBar = () => {
        return <>
            <div className='nav-bar'>
                <p>Страница: </p>
                <input type="number" min="1" step="1" value={pageNumber} onChange={(e) => setPageNumber(parseInt(e.target.value))} />
                <p>Число строк на странице: </p>
                <input type="number" min="1" step="1" value={numberOfLines} onChange={(e) => setNumberOfLines(parseInt(e.target.value))} />
                <p>Всего строк: </p>
                <p>{originalText.length}</p>
            </div>
        </>
    }

    const [entities, setEntities] = React.useState<TEntity[]>([])
    const [textRelations, setTextRelations] = React.useState<TTextRelation[]>([])
    React.useEffect(() => {
        if (selectedMarkup != null) {
            dispatch(getTextEntities(selectedMarkup.id))
            dispatch(getTextRelations(selectedMarkup.id))
        }
    }, [selectedMarkup])
    React.useEffect(() => {
        if (workState && selectedMarkup && workState.markupEntities && workState.markupEntities.markup_id === selectedMarkup.id)
            setEntities(workState.markupEntities.entities)

    }, [, workState.markupEntities])
    React.useEffect(() => {
        if (workState && selectedMarkup && workState.textRelations && workState.textRelations.markup_id === selectedMarkup.id)
            setTextRelations(workState.textRelations.relations)
    }, [, workState.textRelations])

    const getType = (labels: string[]) => {
        if (labels.includes(NAMED_IND)) return 0
        if (labels.includes(CLASS)) return 1
        return 2
    }

    const [zoomedEntities, setZoomedEntities] = React.useState<number[]>([])
    const [showRelations, setShowRelations] = React.useState<TTextRelation[]>([])
    const onEntityZoom = (entity_id: number) => {
        var ids = []
        var new_rel: TTextRelation[] = []
        textRelations.map(r => {
            const local_ids = [r.connection, r.start, r.end]
            if (local_ids.includes(entity_id)) {
                ids = ids.concat(local_ids)
                new_rel.push(r)
            }
        })
        setShowRelations(new_rel)
        setZoomedEntities(ids)
    }

    const onEntityTransfer = (e, entity: TEntity) => {
        e.dataTransfer.setData('entity', JSON.stringify(entity))
    }

    const [selectedComment, setSelectedComment] = React.useState<TComment>(null)
    const [commentsChanged, setCommentsChanged] = React.useState(false)

    const renderText = () => {
        var start = (pageNumber - 1) * numberOfLines
        const end = start + numberOfLines

        const original_text = originalText.slice(start, end);
        const translated_text = translatedText.slice(start, end);
        // const commentary_text = commentary.slice(start, end);

        var i = -1
        start -= 1

        return original_text.map(_ => {
            i += 1
            start += 1
            // const comment: TComment = commentary_text[i]

            var p_relations = null
            var c_relations = null

            var og_index = -1
            const original_line = original_text[i].split(REGEX).filter(word => word != " ").map(word => {


                og_index += 1
                const key = start * 1000 + og_index
                const is_selected = newEntity.pos_start <= key && newEntity.pos_end >= key

                const node_found = entities.find(en => key <= en.pos_end && key >= en.pos_start)
                var node_info = {
                    title: '',
                    node_id: -1,
                    type: 3,
                    id: -1
                }
                const word_background = {
                    0: '#16d06854',
                    1: '#168ad054',
                    2: '#a716d054',
                    3: 'white'
                }
                const label_background = {
                    0: '#25ca75',
                    1: '#25c2ca',
                    2: '#e670ce',
                }
                if (node_found) {
                    node_info.id = node_found.id
                    node_info.node_id = node_found.node.id
                    node_info.type = getType(node_found.node.labels)
                    node_info.title = getName(node_found.node)
                }

                var label_style = {}
                label_style['background'] = label_background[node_info.type]
                var word_style = {}
                word_style['background'] = word_background[node_info.type]
                word_style['background'] = is_selected ? "grey" : word_style['background']

                if (zoomedEntities.length > 0) {
                    if (node_found && zoomedEntities.includes(node_found.id)) {

                    }
                    else {
                        label_style = { background: 'white', opacity: '1' }
                        word_style = { background: 'white', color: '#dcdcdc' }
                    }
                }

                return <span
                    key={key}
                    className='ws-word'
                    onClick={_ => {
                        ctrlPress && apllyToSelectedWords(key)
                    }}
                    style={word_style}
                >
                    {node_found && key === node_found.pos_start && <>
                        <span
                            onMouseEnter={_ => onEntityZoom(node_found.id)}
                            onMouseLeave={_ => setZoomedEntities([])}
                            onDragStart={(e) => onEntityTransfer(e, node_found)}
                            draggable
                            id={'label-' + node_found.id}
                            style={label_style}
                            onClick={_ => {
                                shiftPress && dispatch(deleteTextEnitity(node_info.id))
                                if (!shiftPress) {
                                    switch (getType(node_found.node.labels)) {
                                        case 0:
                                            setSelectedObject(node_found.node.id)
                                            break;
                                        case 1:
                                            setSelectedClass(node_found.node.id)
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }}
                            className='ws-node-label'>
                            {node_info.title}
                        </span>
                    </>}
                    {word}
                </span>
            })

            const is_populated = entities.find(en => Math.floor(en.pos_start / 1000) === start)
            const line_style = is_populated ? { marginTop: '25px' } : {}

            const comment: TComment = commentaryText[i]


            return <div className='text-line'>
                <div className='main-line' style={line_style}>
                    <p className='line-index'>{start}</p>
                    <p>{original_line}</p>
                    <p>{translated_text[i]}</p>
                </div>
                <button style={comment && comment.text.length > 1 ? { color: '#252854' } : {}} onClick={() => setSelectedComment(comment)}><i className='fas fa-comment'></i></button>
                <p className='link-line-info'>{p_relations} {c_relations}</p>
            </div>
        })

    }

    const renderResources = () => {

    }

    const renderInfo = () => {
        return <div className='ws-text-info'>
            <p className='ws-text-note'>
                {workInfo.origin_node[NOTE_URI]}
            </p>
            <div className='ws-text-attr'>


            </div>
        </div>
    }

    const markEntity = () => { }

    return <>
        {workInfo === null ? <>LOADING</> : <>
            <div className='ws-container'>
                <p className='ws-title'>{getName(workInfo.origin_node) + ' - ' + getName(workInfo.translation_node)}</p>
                <div className='ws-control-panel'>
                    <button style={selectedView === 1 ? { background: '#252854', color: 'white' } : {}} onClick={_ => setSelectedView(1)}>Текст</button>
                    <button style={selectedView === 2 ? { background: '#252854', color: 'white' } : {}} onClick={_ => setSelectedView(2)}>Ресурсы</button>
                    <button style={selectedView === 3 ? { background: '#252854', color: 'white' } : {}} onClick={_ => setSelectedView(3)}>Описание</button>
                </div>
                <div className='ws-content'>
                    {selectedView === 1 && <>
                        <div className='ws-ontology-list'>
                            {ontologies.map(o => {
                                const selected = selectedOntology && selectedOntology.id === o.id
                                return <button style={selected ? { background: '#252854', color: 'white' } : {}} onClick={_ => setSelectedOntology(o)}>
                                    {getName(o)}
                                </button>
                            })}
                        </div>
                        {ontologies.length > 0 && selectedOntology && <>
                            <div className='ws-markup-list'>
                                {markups.map(m => {
                                    const selected = selectedMarkup && selectedMarkup.id === m.id
                                    return <p style={selected ? { background: '#252854', color: 'white' } : {}} onClick={_ => setSelectedMarkup(m)}>
                                        {m.name}
                                        <button onClick={_ => setOnEditMarkup(m)}><i className="fas fa-edit"></i></button>
                                    </p>
                                })}
                                <button
                                    style={{ background: '#3ed29b', color: 'white' }}
                                    onClick={_ => {
                                        var new_markup: TMarkup = {
                                            id: -1,
                                            name: 'Не указано',
                                            user: { id: -1, username: '' },
                                            original_object_uri: workState.info.origin_node['uri'],
                                            ontology_uri: selectedOntology['uri'],
                                            ontology: selectedOntology
                                        }
                                        setOnEditMarkup(new_markup)
                                    }}
                                >Добавить разметку</button>
                            </div>
                        </>}

                        {renderNavBar()}
                        {renderText()}
                        {renderNavBar()}
                    </>}
                    {selectedView === 2 && <>
                        {renderResources()}
                    </>}
                    {selectedView === 3 && <>
                        {renderInfo()}
                    </>}
                </div>
            </div>
        </>}
        {!addEntityWindow &&
            newEntity.pos_start != -1 &&
            newEntity.pos_end != -1 &&
            selectedMarkup &&
            <button id='ws-add-entity' onClick={_ => setAddEntityWindow(true)}><i className="fas fa-paperclip"></i></button>}
        {selectedMarkup && <button id='ws-add-relation' onClick={_ => setRelationAddWindow(!relationAddWindow)}><i className="fas fa-link"></i></button>}

        {addEntityWindow && <EntityForm onClose={() => { setAddEntityWindow(false); setNewEntity({ ...newEntity, pos_start: -1, pos_end: -1 }) }} markup_id={selectedMarkup.id} domain={selectedMarkup.ontology_uri} entity={newEntity} />}
        {onEditMarkup && <MarkupForm markup={onEditMarkup} onClose={() => setOnEditMarkup(null)} />}
        {selectedMarkup && relationAddWindow && <RelationForm markup_id={selectedMarkup.id} onClose={() => setRelationAddWindow(false)} />}

        {zoomedEntities.length > 0 && <>
            <div className='ws-arrows'>
                {showRelations.map(r => {
                    return <>
                        <Xarrow
                            start={'label-' + r.start}
                            end={'label-' + r.connection}
                            // startAnchor='right'
                            // endAnchor='left'
                            color='#e53667'
                            headSize={4}
                            strokeWidth={2}
                            animateDrawing={0.2}

                        />
                        <Xarrow
                            start={'label-' + r.connection}
                            end={'label-' + r.end}
                            // startAnchor='right'
                            // endAnchor='left'
                            headSize={4}
                            strokeWidth={2}
                            color='#e53667'
                            animateDrawing={0.2}



                        />
                    </>
                })}
            </div>

        </>}
        {selectedObject != -1 && <ObjectInfo onSelect={id => setSelectedObject(id)} object_id={selectedObject} onClose={() => setSelectedObject(-1)} />}

        {selectedClass != -1 && <>
            <div className='ws-class-container'>
                <button className='ws-class-container-exit' onClick={_ => setSelectedClass(-1)}><i className='fas fa-times'></i></button>
                <ClassInfo domain={selectedMarkup.ontology_uri} onObjectAdd={(class_uri: string) => { setObjectAddWindow(true); setSelectedClassForObjectAdd(class_uri) }} onObjectSelect={co => setSelectedObject(co)} class_id={selectedClass} />
            </div>
        </>}

        {objectAddWindow && <ObjectForm domain={selectedMarkup.ontology_uri} class_uri={selectedClassForObjectAdd} onClose={() => setObjectAddWindow(false)} />}
        {selectedComment && <CommentaryInfo onSave={(comm: TComment) => { setCommentsChanged(true); setCommentaryText(commentaryText.map(c => c.position === comm.position ? comm : c)) }} comment={selectedComment} onClose={() => setSelectedComment(null)}></CommentaryInfo>}
        {commentsChanged && <button id='save-comments' onClick={() => { dispatch(changeComments(commentaryText, workInfo.commentary_node['uri'])); setCommentsChanged(false) }}>Сохранить комментарии</button>}

    </>;
};

export default Workspace;
