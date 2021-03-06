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
import { RouteComponentProps, useLocation } from 'react-router-dom'



interface IResourcesProps {
    corpus_uri: string,
    res_type: string
}

const Resources: React.FunctionComponent<IResourcesProps> = ({ match }: RouteComponentProps<IResourcesProps>) => {
    const location = useLocation();

    const corpus_uri_props: string = location.corpusUri
    const res_type_props: string = location.resType

    console.log(corpus_uri_props, res_type_props)


    const dispatch = useDispatch()
    const resourceState = useSelector((state: RootStore) => state.resources)
    const filterCount = useSelector((state: RootStore) => state.resources.corpus_resources.counters)

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
    const [selectedResourceTypes, setSelectedResourceTypes] = React.useState<string[]>(res_type_props ? [res_type_props] : [])
    const [selectedExtraResourceTypes, setSelectedExtraResourceTypes] = React.useState<string[]>([])

    const flipPanel = (n: number) => {
        openedPanels.includes(n) ? setOpenedPanels(openedPanels.filter(i => i != n)) : setOpenedPanels([...openedPanels, n])
    }
    const flipRT = (s: string) => {
        selectedResourceTypes.includes(s) ? setSelectedResourceTypes(selectedResourceTypes.filter(i => i != s)) : setSelectedResourceTypes([...selectedResourceTypes, s])
    }
    const resetFilter = () => {
        setSelectedResourceTypes([])
        setSearchPlace(-1)
        setSearchLang(-1)
        setSearchGenre(-1)
        setSearchActor(-1)
        setSearchTime('')
        setChunkNumber(1)
        setMainSearch('')
        setChunkNumber(1)
        requestResources(1, 50, true)
    }

    const [searchLang, setSearchLang] = React.useState(-1)
    const [searchPlace, setSearchPlace] = React.useState(-1)
    const [searchGenre, setSearchGenre] = React.useState(-1)
    const [searchActor, setSearchActor] = React.useState(-1)
    const [searchTime, setSearchTime] = React.useState('')
    const [chunkNumber, setChunkNumber] = React.useState(1)
    const [chunkSize, setChunkSize] = React.useState(50)

    React.useEffect(() => {
        setChunkNumber(1)
        !resourceState.is_loading && requestResources(1, 50)
    }, [searchLang, searchPlace, searchTime, searchGenre, searchActor, selectedResourceTypes])

    const requestResources = (chunkNumberLocal, chunkSizeLocal, clean = false) => {
        const c_uri = selectedCorpus ? selectedCorpus['uri'] : ''
        dispatch(getCorpusResources(c_uri, selectedResourceTypes, clean ? '' : mainSearch, searchLang, searchActor, searchPlace, searchGenre, searchTime, chunkNumberLocal, chunkSizeLocal))
    }

    React.useEffect(() => {
        requestResources(1, 50)
    }, [, selectedCorpus])
    React.useEffect(() => {
        // resourceState.corpus_resources && prepareFilters()
    }, [resourceState.corpus_resources])

    // const [filterCount, setFilterCount] = React.useState<{
    //     images: number,
    //     video: number,
    //     notes: number,
    //     articles: number,
    //     audio: number,
    //     texts: number,
    //     actors: string[],
    //     genres: string[],
    //     langs: string[]
    // }>(null)

    const scrollRef1 = React.useRef(null)
    const scroll1 = () => scrollRef1.current.scrollIntoView({ behavior: 'smooth' })

    // const prepareFilters = () => {
    //     const data = resourceState.corpus_resources
    //     var f = {
    //         images: 0,
    //         video: 0,
    //         audio: 0,
    //         texts: 0,
    //         notes: 0,
    //         articles: 0,
    //         actors: [],
    //         genres: [],
    //         langs: []
    //     }
    //     data.map(item => {
    //         if (item.media_carrier && item.media_carrier.length === 1) {
    //             var r: TConnectedVisualItem = item.media_carrier[0]

    //             f.articles = item.resource['res_type'] && item.resource['res_type'] === 'article' ? f.articles + 1 : f.articles
    //             f.images = item.resource['res_type'] && item.resource['res_type'] === 'image' ? f.images + 1 : f.images
    //             f.video = item.resource['res_type'] && item.resource['res_type'] === 'video' ? f.video + 1 : f.video
    //             f.audio = item.resource['res_type'] && item.resource['res_type'] === 'audio' ? f.audio + 1 : f.audio
    //             f.notes = item.resource['res_type'] && item.resource['res_type'] === 'note' ? f.notes + 1 : f.notes

    //         }
    //         if (item.resource.labels.includes(LING_OBJECT_URI)) {
    //             f.texts += 1
    //         }
    //         if (item.lang) {
    //             f.langs.push(getName(item.lang))
    //         }
    //         if (item.events && item.events.length > 0) {
    //             item.events.map(e => {
    //                 f.actors.push(getActorName(e.actor, true))
    //             })
    //         }
    //         if (item.genres && item.genres.length > 0) {
    //             item.genres.map(g => {
    //                 f.genres.push(getName(g))
    //             })
    //         }
    //         f.actors = removeDuplFromStringList(f.actors)
    //         f.langs = removeDuplFromStringList(f.langs)
    //         f.genres = removeDuplFromStringList(f.genres)
    //     })
    //     // types
    //     setFilterCount(f)

    // }

    const renderResources = () => {
        if (!resourceState.corpus_resources) return <></>
        const data = resourceState.corpus_resources.data

        // return data
        //     .filter(i => JSON.stringify(i).toLocaleLowerCase().includes(mainSearch.toLocaleLowerCase()))
        //     .filter(i => {
        //         if (selectedExtraResourceTypes.length === 0) return true
        //         var check = true
        //         selectedExtraResourceTypes.map(t => {
        //             var type: string = t
        //             if (!JSON.stringify(i).toLocaleLowerCase().includes(type.toLocaleLowerCase()))
        //                 check = false
        //         })
        //         return check
        //     })
        //     .filter(i => {
        //         if (selectedResourceTypes.length === 0) return true
        //         if (i.media_carrier && i.media_carrier.length === 1) {
        //             var r: TConnectedVisualItem = i.media_carrier[0]
        //             if (i.resource['res_type'] && i.resource['res_type'] === 'article' && selectedResourceTypes.includes('articles')) return true
        //             if (i.resource['res_type'] && i.resource['res_type'] === 'image' && selectedResourceTypes.includes('images')) return true
        //             if (i.resource['res_type'] && i.resource['res_type'] === 'video' && selectedResourceTypes.includes('video')) return true
        //             if (i.resource['res_type'] && i.resource['res_type'] === 'audio' && selectedResourceTypes.includes('audio')) return true
        //             if (i.resource['res_type'] && i.resource['res_type'] === 'note' && selectedResourceTypes.includes('notes')) return true
        //             // if (['png', 'jpg', 'jpeg', 'pdf'].includes(r.file.type) && selectedResourceTypes.includes('images')) return true
        //             // if (['mp4', 'avi', 'mkv'].includes(r.file.type) && selectedResourceTypes.includes('video')) return true
        //             // if (['wav', 'mp4', 'mp3'].includes(r.file.type) && selectedResourceTypes.includes('audio')) return true
        //         }
        //         if (i.resource.labels.includes(LING_OBJECT_URI) && selectedResourceTypes.includes('texts')) return true

        //         return false
        //     })
        //     .filter(i => {
        //         if (placesInput.length === 0) return true
        //         if (i.events.length === 0) return false
        //         if (i.events.find(e => JSON.stringify(e.place).toLocaleLowerCase().includes(placesInput.toLocaleLowerCase()))) return true
        //         return false
        //     })
        return data.map(item => {
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
                    <TextItem corpus_uri={selectedCorpus ? selectedCorpus['uri'] : ''} node={item.resource} notations={notes} audio={audio} video={video} images={images} />
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


    React.useEffect(() => {
        requestResources(chunkNumber, 50)
    }, [chunkNumber])


    const renderNav = () => {
        const counter = resourceState.corpus_resources.data_size

        const number_of_pages = Math.ceil(counter / chunkSize)


        var numbers = []
        for (let index = 1; index <= number_of_pages; index++) {
            numbers.push(index)

        }

        return <div className='resource-nav-panel-pages'>
            <div className='resource-nav-panel-pages-left'>
                <label>???????????????? ???? ????????????????: 50</label>
            </div>
            <div className='resource-nav-panel-pages-page-numbers'>
                {chunkNumber - 1 > 0 && <button onClick={_ => {
                    chunkNumber - 1 > 0 && setChunkNumber(chunkNumber - 1)
                }} className='resource-nav-panel-pages-page-numbers-left'>{'<'}</button>}
                <div className='resource-nav-panel-pages-page-numbers-numbers'>
                    {numbers.map(number => {
                        if (Math.abs(number - chunkNumber) < 5) return <button className={number === chunkNumber ? 'resource-nav-panel-pages-page-numbers-numbers-selected' : ''} onClick={_ => setChunkNumber(number)}>{number}</button>
                        return <></>
                    })}
                </div>

                {chunkNumber + 1 <= number_of_pages && <button onClick={_ => {
                    chunkNumber + 1 <= number_of_pages && setChunkNumber(chunkNumber + 1)
                }} className='resource-nav-panel-pages-page-numbers-right'>{'>'}</button>}
            </div>

        </div>
    }

    return <>

        {<>
            <div className='resource-corpus-list-outer'>
                <div>
                    <button className={!selectedCorpus ? 'resource-corpus-list-selected' : ''} onClick={_ => setSelectedCorpus(null)}>?????? ??????????????</button>
                    {corpuses.map(c => {
                        corpus_uri_props && corpus_uri_props === c['uri'] && !selectedCorpus && setSelectedCorpus(c)
                        return <button className={selectedCorpus && selectedCorpus['uri'] === c['uri'] ? 'resource-corpus-list-selected' : ''} onClick={_ => setSelectedCorpus(c)}>{getName(c)}</button>
                    })}
                </div>
            </div>
            <div className='sub-page-container' ref={scrollRef1}>

                <div className='resource-search-container'>
                    <span><i className='fas fa-search'></i></span>
                    <input
                        placeholder={'?????????? ???? ????????????????'}
                        value={mainSearch}
                        onKeyUp={e => {
                            if (e.key === 'Enter' || e.keyCode === 13) {
                                setChunkNumber(1)
                                !resourceState.is_loading && requestResources(1, 50)


                            }
                        }}
                        onChange={e => {
                            setMainSearch(e.target.value)
                        }}>


                    </input>
                    <div className='main-search-button' onClick={_ => requestResources(1, 50)}>
                        <p>??????????</p>
                    </div>
                    <button onClick={_ => setKeyboard(!keyboard)}>???????????????????? ????????????????????????</button>
                    <label>?????? ???????????? ?????????? ???????????????????????? ???????????????????????? ??????????, ????????????????, ??, ??, ??</label>
                </div>

                {renderNav()}

                {filterCount && <>
                    <div className='resource-content-container'>
                        <div className='resource-nav-panel'>
                            <div className='resource-nav-panel-collapse-list'>
                                <button onClick={_ => flipPanel(1)}>?????? ?????????????? <i className={openedPanels.includes(1) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                {openedPanels.includes(1) && <>
                                    <div className='resource-nav-panel-collapse-list-content'>
                                        <button onClick={_ => flipRT('text')}><i className={selectedResourceTypes.includes('text') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ???????????? ({filterCount.texts}) </button>
                                        <button onClick={_ => flipRT('audio')}><i className={selectedResourceTypes.includes('audio') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ?????????? ({filterCount.audio}) </button>
                                        <button onClick={_ => flipRT('video')}><i className={selectedResourceTypes.includes('video') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ?????????? ({filterCount.video}) </button>
                                        <button onClick={_ => flipRT('image')}><i className={selectedResourceTypes.includes('image') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ???????? ({filterCount.images}) </button>
                                        <button onClick={_ => flipRT('note')}><i className={selectedResourceTypes.includes('note') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ???????? ({filterCount.notes}) </button>
                                        <button onClick={_ => flipRT('glossary')}><i className={selectedResourceTypes.includes('glossary') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ???????????? ({0}) </button>
                                        <button onClick={_ => flipRT('article')}><i className={selectedResourceTypes.includes('article') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ???????????????????? ({filterCount.articles}) </button>
                                    </div>
                                </>}
                            </div>


                            <div className='resource-nav-panel-collapse-list'>
                                <button onClick={_ => flipPanel(2)}>?????????? <i className={openedPanels.includes(2) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i>

                                    {authState.user.is_editor && <button onClick={_ => setSelectedItemUriAdd(LANGUAGE_URI)} className='add-object-to-resource-button'><i className='fas fa-plus'></i></button>}
                                </button>
                                {openedPanels.includes(2) && <>

                                    <div className='resource-nav-panel-collapse-list-content'>
                                        {filterCount.langs.map(l => {
                                            return <button onClick={_ => setSearchLang(searchLang === l.id ? -1 : l.id)}><i className={searchLang === l.id ? 'far fa-dot-circle' : 'far fa-circle'}></i> {getName(l)} </button>
                                        })}


                                    </div>

                                    {/* <div className='resource-nav-panel-collapse-list-second'>
                                    <button onClick={_ => flipPanel(21)}>???????????????? ({0}) <i className={openedPanels.includes(21) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                    {openedPanels.includes(21) && <>
                                        <div className='resource-nav-panel-collapse-list-content'>
                                            <button><i className={selectedResourceTypes.includes('???') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ??? { } </button>

                                        </div>
                                    </>}
                                </div>

                                <div className='resource-nav-panel-collapse-list-second'>
                                    <button onClick={_ => flipPanel(22)}>???????????? ({0})<i className={openedPanels.includes(22) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                    {openedPanels.includes(22) && <>
                                        <div className='resource-nav-panel-collapse-list-content'>
                                            <button><i className={selectedResourceTypes.includes('???') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ??? { } </button>

                                        </div>
                                    </>}
                                </div> */}

                                </>}
                            </div>

                            <div className='resource-nav-panel-collapse-list'>
                                <button onClick={_ => flipPanel(3)}>?????????? <i className={openedPanels.includes(3) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i>
                                    {authState.user.is_editor && <button onClick={_ => setSelectedItemUriAdd(GENRE_URI)} className='add-object-to-resource-button'><i className='fas fa-plus'></i></button>}


                                </button>
                                {openedPanels.includes(3) && <>
                                    <div className='resource-nav-panel-collapse-list-content'>
                                        {filterCount.genres.map(g => {
                                            return <button onClick={_ => setSearchGenre(searchGenre === g.id ? -1 : g.id)}><i className={searchGenre === g.id ? 'far fa-dot-circle' : 'far fa-circle'}></i> {getName(g)} </button>
                                        })}


                                    </div>
                                    {/* <div className='resource-nav-panel-collapse-list-second'>
                                    <button onClick={_ => flipPanel(31)}>???????????????????????? ({0}) <i className={openedPanels.includes(31) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                    {openedPanels.includes(31) && <>
                                        <div className='resource-nav-panel-collapse-list-content'>
                                            <button><i className={selectedResourceTypes.includes('???') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ??? { } </button>

                                        </div>
                                    </>}
                                </div>

                                <div className='resource-nav-panel-collapse-list-second'>
                                    <button onClick={_ => flipPanel(32)}>???????????????????????? ({0})<i className={openedPanels.includes(32) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                    {openedPanels.includes(32) && <>
                                        <div className='resource-nav-panel-collapse-list-content'>
                                            <button><i className={selectedResourceTypes.includes('???') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ??? { } </button>

                                        </div>
                                    </>}
                                </div>

                                <div className='resource-nav-panel-collapse-list-second'>
                                    <button onClick={_ => flipPanel(33)}>???????????????? ?????????????????? ({0})<i className={openedPanels.includes(33) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                    {openedPanels.includes(33) && <>
                                        <div className='resource-nav-panel-collapse-list-content'>
                                            <button><i className={selectedResourceTypes.includes('???') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ??? { } </button>

                                        </div>
                                    </>}
                                </div> */}

                                </>}
                            </div>

                            <div className='resource-nav-panel-collapse-list'>
                                <button onClick={_ => flipPanel(4)}>?????????????? <i className={openedPanels.includes(4) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                {openedPanels.includes(4) && <>
                                    <div className='resource-nav-panel-collapse-list-content'>
                                        {filterCount.actors.map(a => {
                                            return <button onClick={_ => setSearchActor(searchActor === a.id ? -1 : a.id)}><i className={searchActor === a.id ? 'far fa-dot-circle' : 'far fa-circle'}></i> {getName(a)} </button>
                                        })}


                                    </div>
                                    {/* <div className='resource-nav-panel-collapse-list-second'>
                                    <button onClick={_ => flipPanel(41)}>?????????????????????? ({0}) <i className={openedPanels.includes(41) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                    {openedPanels.includes(41) && <>
                                        <div className='resource-nav-panel-collapse-list-content'>
                                            <button><i className={selectedResourceTypes.includes('???') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ??? { } </button>

                                        </div>
                                    </>}
                                </div>

                                <div className='resource-nav-panel-collapse-list-second'>
                                    <button onClick={_ => flipPanel(42)}>?????????????????????????? ({0})<i className={openedPanels.includes(42) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                    {openedPanels.includes(42) && <>
                                        <div className='resource-nav-panel-collapse-list-content'>
                                            <button><i className={selectedResourceTypes.includes('???') ? 'far fa-dot-circle' : 'far fa-circle'}></i> ??? { } </button>

                                        </div>
                                    </>}
                                </div> */}

                                </>}
                            </div>

                            <div className='resource-nav-panel-collapse-list'>
                                <button onClick={_ => flipPanel(5)}>?????????? ???????????? <i className={openedPanels.includes(5) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i>
                                    {authState.user.is_editor && <button onClick={_ => setSelectedItemUriAdd(PLACE_URI)} className='add-object-to-resource-button'><i className='fas fa-plus'></i></button>}
                                </button>
                                {openedPanels.includes(5) && <>
                                    <div className='resource-nav-panel-collapse-list-content'>
                                        {filterCount.places.map(p => {
                                            return <button onClick={_ => setSearchPlace(searchPlace === p.id ? -1 : p.id)}><i className={searchPlace === p.id ? 'far fa-dot-circle' : 'far fa-circle'}></i> {getName(p)} </button>
                                        })}


                                    </div>
                                </>}
                            </div>

                            <div className='resource-nav-panel-collapse-list'>
                                <button onClick={_ => flipPanel(6)}>?????????? ???????????? <i className={openedPanels.includes(6) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                {openedPanels.includes(6) && <>
                                    <input></input>
                                </>}
                            </div>

                            <div className='resource-nav-panel-collapse-list'>
                                <button onClick={_ => flipPanel(7)}>?????????? ???? ?????????????????? <i className={openedPanels.includes(7) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                                {openedPanels.includes(7) && <>
                                    <input></input>
                                </>}
                            </div>


                            <button className='resource-nav-panel-reset' onClick={resetFilter}>
                                ???????????????? ????????????
                            </button>

                            {authState.user.is_editor && selectedCorpus && <>
                                <div className='admin-resource-filter-add-button-container'>
                                    <button onClick={_ => setUploadMediaWindow(true)}>?????????????????? ??????????</button>
                                    <button onClick={_ => setUploadTextWindow(true)}>?????????????????? ??????????</button>
                                    {/* <button onClick={_ => setEventFormWindow(true)}>?????????????? ??????????????</button> */}

                                </div>
                            </>}

                        </div>

                        <div className='resource-list'>
                            {resourceState.is_loading && <Loading height={460} />}
                            {!resourceState.is_loading && renderResources()}
                            {!resourceState.is_loading && resourceState.corpus_resources && resourceState.corpus_resources.data_size === 0 && <>
                                <div className='resource-list-empty'>
                                    <span><i className='fas fa-times'></i></span>
                                    <p>???????????? ???? ?????? ????????????????????</p>
                                </div>

                            </>}
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
        <button className='resource-list-to-the-top' onClick={scroll1}>????????????</button>
    </>;
};

export default Resources;
