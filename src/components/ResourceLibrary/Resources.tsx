import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { node } from 'webpack';
import { TClass, TConnectedVisualItem } from '../../actions/ontology/classes/types';
import { getAllResources, getCorpusResources } from '../../actions/ontology/resources/resources';
import { RootStore } from '../../store';
import { EVENT_URI, GENRE_URI, getActorName, getName, LANGUAGE_URI, LING_OBJECT_URI, PLACE_URI, removeDuplFromStringList, TEXT_TYPE, VISUAL_ITEM_URI } from '../../utils';
import Keyboard from '../Keyboard';
import { Link } from 'react-router-dom'
import { TextItem } from './ResourceItems/TextItem';
import { VisualItem } from './ResourceItems/VisualItem';
import Loading from '../Loading';
import { getCorpuses } from '../../actions/ontology/corpuses/corpuses';
import { TCorpus } from '../../actions/ontology/corpuses/types';
import ObjectForm from '../Ontology/Forms/ObjectForm';
import FileUploadToObject from './FileUploadToObject';
import TextUpload from './TextUpload';
import ObjectInfo from '../Ontology/ObjectInfo';
import EventForm from './EventForm';



interface IResourcesProps {
}

const Resources: React.FunctionComponent<IResourcesProps> = (props) => {
    const dispatch = useDispatch()
    const resourceState = useSelector((state: RootStore) => state.resources)

    const corpusState = useSelector((state: RootStore) => state.corpuses)
    React.useEffect(() => {
        dispatch(getCorpuses())
    }, [])

    const authState = useSelector((state: RootStore) => state.auth)


    const [corpuses, setCorpuses] = React.useState<TCorpus[]>([])
    React.useEffect(() => { setCorpuses(corpusState.parentCorpuses) }, [corpusState.parentCorpuses])

    const [selectedCorpus, setSelectedCorpus] = React.useState<TCorpus>(null)

    const [mainSearch, setMainSearch] = React.useState('')
    const [keyboard, setKeyboard] = React.useState(false)

    const [openedPanels, setOpenedPanels] = React.useState<number[]>([])
    const [selectedResourceTypes, setSelectedResourceTypes] = React.useState([])
    const [selectedExtraResourceTypes, setSelectedExtraResourceTypes] = React.useState<string[]>([])

    const flipPanel = (n: number) => {
        openedPanels.includes(n) ? setOpenedPanels(openedPanels.filter(i => i != n)) : setOpenedPanels([...openedPanels, n])
    }
    const flipRT = (s: string) => {
        selectedResourceTypes.includes(s) ? setSelectedResourceTypes(selectedResourceTypes.filter(i => i != s)) : setSelectedResourceTypes([...selectedResourceTypes, s])
    }
    const resetFilter = () => {
        setSelectedResourceTypes([])
    }

    React.useEffect(() => {
        selectedCorpus && dispatch(getCorpusResources(selectedCorpus['uri']))
        !selectedCorpus && dispatch(getCorpusResources(''))
    }, [, selectedCorpus])
    React.useEffect(() => {
        resourceState.corpus_resources && prepareFilters()
    }, [resourceState.corpus_resources])

    const [filterCount, setFilterCount] = React.useState<{
        images: number,
        video: number,
        notes: number,
        articles: number,
        audio: number,
        texts: number,
        actors: string[],
        genres: string[],
        langs: string[]
    }>(null)

    const scrollRef1 = React.useRef(null)
    const scroll1 = () => scrollRef1.current.scrollIntoView({ behavior: 'smooth' })

    const prepareFilters = () => {
        const data = resourceState.corpus_resources
        var f = {
            images: 0,
            video: 0,
            audio: 0,
            texts: 0,
            notes: 0,
            articles: 0,
            actors: [],
            genres: [],
            langs: []
        }
        data.map(item => {
            if (item.media_carrier && item.media_carrier.length === 1) {
                var r: TConnectedVisualItem = item.media_carrier[0]

                f.articles = item.resource['res_type'] && item.resource['res_type'] === 'article' ? f.articles + 1 : f.articles
                f.images = item.resource['res_type'] && item.resource['res_type'] === 'image' ? f.images + 1 : f.images
                f.video = item.resource['res_type'] && item.resource['res_type'] === 'video' ? f.video + 1 : f.video
                f.audio = item.resource['res_type'] && item.resource['res_type'] === 'audio' ? f.audio + 1 : f.audio
                f.notes = item.resource['res_type'] && item.resource['res_type'] === 'note' ? f.notes + 1 : f.notes

            }
            if (item.resource.labels.includes(LING_OBJECT_URI)) {
                f.texts += 1
            }
            if (item.lang) {
                f.langs.push(getName(item.lang))
            }
            if (item.events && item.events.length > 0) {
                item.events.map(e => {
                    f.actors.push(getActorName(e.actor, true))
                })
            }
            if (item.genres && item.genres.length > 0) {
                item.genres.map(g => {
                    f.genres.push(getName(g))
                })
            }
            f.actors = removeDuplFromStringList(f.actors)
            f.langs = removeDuplFromStringList(f.langs)
            f.genres = removeDuplFromStringList(f.genres)
        })
        // types
        setFilterCount(f)

    }

    const renderResources = () => {
        const data = resourceState.corpus_resources

        return data
            .filter(i => JSON.stringify(i).toLocaleLowerCase().includes(mainSearch.toLocaleLowerCase()))
            .filter(i => {
                if (selectedExtraResourceTypes.length === 0) return true
                var check = true
                selectedExtraResourceTypes.map(t => {
                    var type: string = t
                    if (!JSON.stringify(i).toLocaleLowerCase().includes(type.toLocaleLowerCase()))
                        check = false
                })
                return check
            })
            .filter(i => {
                if (selectedResourceTypes.length === 0) return true
                if (i.media_carrier && i.media_carrier.length === 1) {
                    var r: TConnectedVisualItem = i.media_carrier[0]
                    if (i.resource['res_type'] && i.resource['res_type'] === 'article' && selectedResourceTypes.includes('articles')) return true
                    if (i.resource['res_type'] && i.resource['res_type'] === 'image' && selectedResourceTypes.includes('images')) return true
                    if (i.resource['res_type'] && i.resource['res_type'] === 'video' && selectedResourceTypes.includes('video')) return true
                    if (i.resource['res_type'] && i.resource['res_type'] === 'audio' && selectedResourceTypes.includes('audio')) return true
                    if (i.resource['res_type'] && i.resource['res_type'] === 'note' && selectedResourceTypes.includes('notes')) return true
                    // if (['png', 'jpg', 'jpeg', 'pdf'].includes(r.file.type) && selectedResourceTypes.includes('images')) return true
                    // if (['mp4', 'avi', 'mkv'].includes(r.file.type) && selectedResourceTypes.includes('video')) return true
                    // if (['wav', 'mp4', 'mp3'].includes(r.file.type) && selectedResourceTypes.includes('audio')) return true
                }
                if (i.resource.labels.includes(LING_OBJECT_URI) && selectedResourceTypes.includes('texts')) return true

                return false
            })
            .filter(i => {
                if (placesInput.length === 0) return true
                if (i.events.length === 0) return false
                if (i.events.find(e => JSON.stringify(e.place).toLocaleLowerCase().includes(placesInput.toLocaleLowerCase()))) return true
                return false
            })
            .map(item => {
                if (item.resource.labels.includes(VISUAL_ITEM_URI)) {
                    return <div className='resource-item-outer-container'>
                        <VisualItem node={item.resource} file={item.media_carrier && item.media_carrier.length > 0 ? { file: item.media_carrier[0].file, node: item.resource } : null} />
                        {authState.user.is_editor && <button onClick={_ => setSelectedResourceEdit(item.resource.id)} id='selected-for-edit-item-resource-list-button'><i className='fas fa-cog'></i></button>}
                    </div>
                }
                if (item.resource.labels.includes(LING_OBJECT_URI)) {
                    var images = 0
                    var audio = 0
                    var video = 0
                    var notes = 0

                    item.media.map(m => {

                        images = m['res_type'] && m['res_type'] === 'image' ? images + 1 : images
                        video = m['res_type'] && m['res_type'] === 'video' ? video + 1 : video
                        audio = m['res_type'] && m['res_type'] === 'audio' ? audio + 1 : audio
                        notes = m['res_type'] && m['res_type'] === 'note' ? notes + 1 : notes
                        // m.resources.map(r => {


                        //     // images = ['png', 'jpg', 'jpeg', 'pdf'].includes(r.file.type) ? images + 1 : images
                        //     // video = ['mp4', 'avi', 'mkv'].includes(r.file.type) ? video + 1 : video
                        //     // audio = ['wav', 'mp4', 'mp3'].includes(r.file.type) ? audio + 1 : audio
                        // })

                    })
                    return <div className='resource-item-outer-container'>
                        <TextItem node={item.resource} notations={notes} audio={audio} video={video} images={images} />
                        {authState.user.is_editor && <button onClick={_ => setSelectedResourceEdit(item.resource.id)} id='selected-for-edit-item-resource-list-button'><i className='fas fa-cog'></i></button>}
                    </div>

                }

            })
    }
    const toggleResourceTypes = (s) => {
        selectedExtraResourceTypes.includes(s) ?
            setSelectedExtraResourceTypes(selectedExtraResourceTypes.filter(i => i != s))
            :
            setSelectedExtraResourceTypes([...selectedExtraResourceTypes, s])
    }

    const [selectedItemUriAdd, setSelectedItemUriAdd] = React.useState('')
    const [placesInput, setPlacesInput] = React.useState('')

    const [uploadMediaWindow, setUploadMediaWindow] = React.useState(false)
    const [uploadTextWindow, setUploadTextWindow] = React.useState(false)
    const [eventFormWindow, setEventFormWindow] = React.useState(false)

    const [selectedResourceEdit, setSelectedResourceEdit] = React.useState(-1)
    return <>
        {resourceState.is_loading && <Loading height={700} />}
        {!resourceState.is_loading && filterCount && resourceState.corpus_resources && <>
            <div className='resource-corpus-list-outer'>
                <div>
                    <button className={!selectedCorpus ? 'resource-corpus-list-selected' : ''} onClick={_ => setSelectedCorpus(null)}>Все корпусы</button>
                    {corpuses.map(c => {
                        return <button className={selectedCorpus && selectedCorpus['uri'] === c['uri'] ? 'resource-corpus-list-selected' : ''} onClick={_ => setSelectedCorpus(c)}>{getName(c)}</button>
                    })}
                </div>
            </div>
            <div className='sub-page-container' ref={scrollRef1}>

                <div className='resource-search-container'>
                    <span><i className='fas fa-search'></i></span>
                    <input placeholder={'Поиск по ресурсам'} value={mainSearch} onChange={e => setMainSearch(e.target.value)}></input>
                    <button onClick={_ => setKeyboard(!keyboard)}>Клавиатура спецсимволов</button>
                    <label>Для поиска можно использовать национальные знаки, например, ӑ, ӱ, ү</label>
                </div>

                {!resourceState.is_loading && filterCount && <>
                    <div className='resource-content-container'>
                        <div className='resource-nav-panel'>
                            <div className='resource-nav-panel-collapse-list'>
                                <button onClick={_ => flipPanel(1)}>Тип ресурса <i className={openedPanels.includes(1) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                {openedPanels.includes(1) && <>
                                    <div className='resource-nav-panel-collapse-list-content'>
                                        <button onClick={_ => flipRT('texts')}><i className={selectedResourceTypes.includes('texts') ? 'far fa-dot-circle' : 'far fa-circle'}></i> Тексты ({filterCount.texts}) </button>
                                        <button onClick={_ => flipRT('audio')}><i className={selectedResourceTypes.includes('audio') ? 'far fa-dot-circle' : 'far fa-circle'}></i> Аудио ({filterCount.audio}) </button>
                                        <button onClick={_ => flipRT('video')}><i className={selectedResourceTypes.includes('video') ? 'far fa-dot-circle' : 'far fa-circle'}></i> Видео ({filterCount.video}) </button>
                                        <button onClick={_ => flipRT('images')}><i className={selectedResourceTypes.includes('images') ? 'far fa-dot-circle' : 'far fa-circle'}></i> Фото ({filterCount.images}) </button>
                                        <button onClick={_ => flipRT('notes')}><i className={selectedResourceTypes.includes('notes') ? 'far fa-dot-circle' : 'far fa-circle'}></i> Ноты ({filterCount.notes}) </button>
                                        <button onClick={_ => flipRT('glossary')}><i className={selectedResourceTypes.includes('glossary') ? 'far fa-dot-circle' : 'far fa-circle'}></i> Глоссы ({0}) </button>
                                        <button onClick={_ => flipRT('articles')}><i className={selectedResourceTypes.includes('articles') ? 'far fa-dot-circle' : 'far fa-circle'}></i> Публикации ({filterCount.articles}) </button>
                                    </div>
                                </>}
                            </div>


                            <div className='resource-nav-panel-collapse-list'>
                                <button onClick={_ => flipPanel(2)}>Языки <i className={openedPanels.includes(2) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i>

                                    {authState.user.is_editor && <button onClick={_ => setSelectedItemUriAdd(LANGUAGE_URI)} className='add-object-to-resource-button'><i className='fas fa-plus'></i></button>}
                                </button>
                                {openedPanels.includes(2) && <>

                                    <div className='resource-nav-panel-collapse-list-content'>
                                        {filterCount.langs.map(l => {
                                            return <button onClick={_ => toggleResourceTypes(l)}><i className={selectedExtraResourceTypes.includes(l) ? 'far fa-dot-circle' : 'far fa-circle'}></i> {l} </button>
                                        })}


                                    </div>

                                    {/* <div className='resource-nav-panel-collapse-list-second'>
                                    <button onClick={_ => flipPanel(21)}>Диалекты ({0}) <i className={openedPanels.includes(21) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                    {openedPanels.includes(21) && <>
                                        <div className='resource-nav-panel-collapse-list-content'>
                                            <button><i className={selectedResourceTypes.includes('???') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ??? { } </button>

                                        </div>
                                    </>}
                                </div>

                                <div className='resource-nav-panel-collapse-list-second'>
                                    <button onClick={_ => flipPanel(22)}>Говоры ({0})<i className={openedPanels.includes(22) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                    {openedPanels.includes(22) && <>
                                        <div className='resource-nav-panel-collapse-list-content'>
                                            <button><i className={selectedResourceTypes.includes('???') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ??? { } </button>

                                        </div>
                                    </>}
                                </div> */}

                                </>}
                            </div>

                            <div className='resource-nav-panel-collapse-list'>
                                <button onClick={_ => flipPanel(3)}>Жанры <i className={openedPanels.includes(3) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i>
                                    {authState.user.is_editor && <button onClick={_ => setSelectedItemUriAdd(GENRE_URI)} className='add-object-to-resource-button'><i className='fas fa-plus'></i></button>}


                                </button>
                                {openedPanels.includes(3) && <>
                                    <div className='resource-nav-panel-collapse-list-content'>
                                        {filterCount.genres.map(g => {
                                            return <button onClick={_ => toggleResourceTypes(g)}><i className={selectedExtraResourceTypes.includes(g) ? 'far fa-dot-circle' : 'far fa-circle'}></i> {g} </button>
                                        })}


                                    </div>
                                    {/* <div className='resource-nav-panel-collapse-list-second'>
                                    <button onClick={_ => flipPanel(31)}>Национальные ({0}) <i className={openedPanels.includes(31) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                    {openedPanels.includes(31) && <>
                                        <div className='resource-nav-panel-collapse-list-content'>
                                            <button><i className={selectedResourceTypes.includes('???') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ??? { } </button>

                                        </div>
                                    </>}
                                </div>

                                <div className='resource-nav-panel-collapse-list-second'>
                                    <button onClick={_ => flipPanel(32)}>Общепринятые ({0})<i className={openedPanels.includes(32) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                    {openedPanels.includes(32) && <>
                                        <div className='resource-nav-panel-collapse-list-content'>
                                            <button><i className={selectedResourceTypes.includes('???') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ??? { } </button>

                                        </div>
                                    </>}
                                </div>

                                <div className='resource-nav-panel-collapse-list-second'>
                                    <button onClick={_ => flipPanel(33)}>Жанровые параметры ({0})<i className={openedPanels.includes(33) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                    {openedPanels.includes(33) && <>
                                        <div className='resource-nav-panel-collapse-list-content'>
                                            <button><i className={selectedResourceTypes.includes('???') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ??? { } </button>

                                        </div>
                                    </>}
                                </div> */}

                                </>}
                            </div>

                            <div className='resource-nav-panel-collapse-list'>
                                <button onClick={_ => flipPanel(4)}>Персоны <i className={openedPanels.includes(4) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                {openedPanels.includes(4) && <>
                                    <div className='resource-nav-panel-collapse-list-content'>
                                        {filterCount.actors.map(a => {
                                            return <button onClick={_ => toggleResourceTypes(a)}><i className={selectedExtraResourceTypes.includes(a) ? 'far fa-dot-circle' : 'far fa-circle'}></i> {a} </button>
                                        })}


                                    </div>
                                    {/* <div className='resource-nav-panel-collapse-list-second'>
                                    <button onClick={_ => flipPanel(41)}>Исполнители ({0}) <i className={openedPanels.includes(41) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                    {openedPanels.includes(41) && <>
                                        <div className='resource-nav-panel-collapse-list-content'>
                                            <button><i className={selectedResourceTypes.includes('???') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ??? { } </button>

                                        </div>
                                    </>}
                                </div>

                                <div className='resource-nav-panel-collapse-list-second'>
                                    <button onClick={_ => flipPanel(42)}>Исследователи ({0})<i className={openedPanels.includes(42) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                    {openedPanels.includes(42) && <>
                                        <div className='resource-nav-panel-collapse-list-content'>
                                            <button><i className={selectedResourceTypes.includes('???') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ??? { } </button>

                                        </div>
                                    </>}
                                </div> */}

                                </>}
                            </div>

                            <div className='resource-nav-panel-collapse-list'>
                                <button onClick={_ => flipPanel(5)}>Место записи <i className={openedPanels.includes(5) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i>
                                    {authState.user.is_editor && <button onClick={_ => setSelectedItemUriAdd(PLACE_URI)} className='add-object-to-resource-button'><i className='fas fa-plus'></i></button>}
                                </button>
                                {openedPanels.includes(5) && <>
                                    <input value={placesInput} onChange={e => setPlacesInput(e.target.value)}></input>
                                </>}
                            </div>

                            <div className='resource-nav-panel-collapse-list'>
                                <button onClick={_ => flipPanel(6)}>Время записи <i className={openedPanels.includes(6) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                {openedPanels.includes(6) && <>
                                    <input></input>
                                </>}
                            </div>

                            <div className='resource-nav-panel-collapse-list'>
                                <button onClick={_ => flipPanel(7)}>Поиск по контексту <i className={openedPanels.includes(7) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                {openedPanels.includes(7) && <>
                                    <input></input>
                                </>}
                            </div>


                            <button className='resource-nav-panel-reset' onClick={resetFilter}>
                                СБРОСИТЬ ФИЛЬТР
                            </button>

                            {authState.user.is_editor && selectedCorpus && <>
                                <div className='admin-resource-filter-add-button-container'>
                                    <button onClick={_ => setUploadMediaWindow(true)}>ЗАГРУЗИТЬ МЕДИА</button>
                                    <button onClick={_ => setUploadTextWindow(true)}>ЗАГРУЗИТЬ ТЕКСТ</button>
                                    <button onClick={_ => setEventFormWindow(true)}>СОЗДАТЬ СОБЫТИЕ</button>

                                </div>
                            </>}

                        </div>

                        <div className='resource-list'>
                            {renderResources()}
                        </div>
                    </div>
                </>}

            </div>
        </>}

        {keyboard && <Keyboard onClick={l => setMainSearch(mainSearch + l)} onClose={() => setKeyboard(false)} />}
        {selectedItemUriAdd.length > 0 && <ObjectForm class_uri={selectedItemUriAdd} onClose={() => setSelectedItemUriAdd('')} domain='Resource' />}
        {selectedResourceEdit != -1 && <ObjectInfo object_id={selectedResourceEdit} onClose={() => setSelectedResourceEdit(-1)} onSelect={(id) => setSelectedResourceEdit(id)} />}
        {uploadMediaWindow && <FileUploadToObject onClose={() => setUploadMediaWindow(false)} object_id={selectedCorpus.id} />}
        {uploadTextWindow && <TextUpload onClose={() => setUploadTextWindow(false)} object_id={selectedCorpus.id} corpus_id={selectedCorpus.id} />}
        {eventFormWindow && <EventForm onClose={() => setEventFormWindow(false)} />}
        <button className='resource-list-to-the-top' onClick={scroll1}>Наверх</button>
    </>;
};

export default Resources;
