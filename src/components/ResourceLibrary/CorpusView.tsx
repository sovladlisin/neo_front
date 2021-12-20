import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassObject } from '../../actions/ontology/classes/classes';
import { TClass, TConnectedVisualItem, TCorpusExtended, TObjectExtended } from '../../actions/ontology/classes/types';
import { TCorpus } from '../../actions/ontology/corpuses/types';
import { CORPUS_1, getActorName, getName, getNote, HOST, LING_OBJECT_URI, removeDuplFromNodeList, removeDuplFromStringList } from '../../utils';
import { RouteComponentProps } from 'react-router-dom'
import { RootStore } from '../../store';
import { getCorpusResources } from '../../actions/ontology/resources/resources';
import Loading from '../Loading';
import { Link } from 'react-router-dom'
interface ICorpusViewProps {
    id: number
}

type TCorpusLocalTypes = {
    images: number,
    video: number,
    audio: number,
    texts: number,
    actors: TClass[],
    genres: string[],
    langs: string[],
    places: TClass[]
}

const CorpusView: React.FunctionComponent<ICorpusViewProps> = ({ match }: RouteComponentProps<ICorpusViewProps>) => {
    const current_id: number = parseInt(match.params.id)
    const classState = useSelector((state: RootStore) => state.classes)
    const resourceState = useSelector((state: RootStore) => state.resources)


    const [currentCorpus, setCurrentCorpus] = React.useState<TCorpusExtended>(null)
    const dispatch = useDispatch()
    React.useEffect(() => { dispatch(getClassObject(current_id)) }, [, current_id])

    React.useEffect(() => {
        var new_obj = classState.selectedObject
        if (new_obj && current_id === new_obj.id) {
            setCurrentCorpus(new_obj)
            console.log(new_obj.object['uri'])
            dispatch(getCorpusResources(new_obj.object['uri']))
        }
    }, [classState.selectedObject])


    React.useEffect(() => {
        resourceState.corpus_resources && prepareFilters()
    }, [resourceState.corpus_resources])

    const [filterCount, setFilterCount] = React.useState<TCorpusLocalTypes>(null)

    const prepareFilters = () => {
        const data = resourceState.corpus_resources
        var f: TCorpusLocalTypes = {
            images: 0,
            video: 0,
            audio: 0,
            texts: 0,
            actors: [],
            genres: [],
            langs: [],
            places: []
        }
        data.map(item => {
            if (item.media_carrier && item.media_carrier.length === 1) {
                var r: TConnectedVisualItem = item.media_carrier[0]
                f.images = ['png', 'jpg', 'jpeg', 'pdf'].includes(r.file.type) ? f.images + 1 : f.images
                f.video = ['mp4', 'avi', 'mkv'].includes(r.file.type) ? f.video + 1 : f.video
                f.audio = ['wav', 'mp4'].includes(r.file.type) ? f.audio + 1 : f.audio
            }
            if (item.resource.labels.includes(LING_OBJECT_URI)) {
                f.texts += 1
            }
            if (item.lang) {
                f.langs.push(getName(item.lang))
            }
            if (item.events && item.events.length > 0) {
                item.events.map(e => {
                    f.actors.push(e.actor)
                })
            }
            if (item.events && item.events.length > 0) {
                item.events.map(e => {
                    f.places.push(e.place)
                })
            }
            if (item.genres && item.genres.length > 0) {
                item.genres.map(g => {
                    f.genres.push(getName(g))
                })
            }
            f.langs = removeDuplFromStringList(f.langs)
            f.genres = removeDuplFromStringList(f.genres)
            f.actors = removeDuplFromNodeList(f.actors)
            f.places = removeDuplFromNodeList(f.places)
            setFilterCount(f)
        })
        // types

    }

    const onRedirect = () => {
        window.location.replace(HOST + 'resources')
    }

    return <>
        {resourceState.is_loading && <Loading height={600} />}
        {currentCorpus && !resourceState.is_loading && filterCount && <>
            <div className='sub-page-container'>
                <button className='corpus-return'><i className='fas fa-long-arrow-alt-left'></i>К списку корпусов</button>

                <div className='corpus-view-title-card'>
                    <img src={CORPUS_1}></img>
                    <div className='corpus-view-title-card-meta'>
                        <p className='corpus-view-title-card-meta-title'>
                            {getName(currentCorpus.object)}
                        </p>
                        <p>{getNote(currentCorpus.object)}</p>
                    </div>
                </div>

                <div className='gray-background-strip-outer'>
                    <div className='gray-background-strip'>
                        <div className='home-block home-block-gray'>
                            <div className='home-block-inner'>
                                <p>Ресурсы</p>
                                <div className='home-resourse-container'>
                                    <div onClick={onRedirect} className='home-resourse-block'>
                                        <p>Т</p>
                                        <div className='home-resourse-meta'>
                                            <p className='home-resourse-title'>Тексты</p>
                                            <p>{filterCount.texts} ресурсов</p>
                                        </div>
                                    </div>
                                    <div onClick={onRedirect} className='home-resourse-block'>
                                        <p>А</p>
                                        <div className='home-resourse-meta'>
                                            <p className='home-resourse-title'>Аудио</p>
                                            <p>{filterCount.audio} ресурсов</p>
                                        </div>
                                    </div>
                                    <div onClick={onRedirect} className='home-resourse-block'>
                                        <p>В</p>
                                        <div className='home-resourse-meta'>
                                            <p className='home-resourse-title'>Видео</p>
                                            <p>{filterCount.video} ресурсов</p>
                                        </div>
                                    </div>
                                    <div onClick={onRedirect} className='home-resourse-block'>
                                        <p>П</p>
                                        <div className='home-resourse-meta'>
                                            <p className='home-resourse-title'>Публикации</p>
                                            <p>{0} ресурсов</p>
                                        </div>
                                    </div>
                                    <div onClick={onRedirect} className='home-resourse-block'>
                                        <p>Г</p>
                                        <div className='home-resourse-meta'>
                                            <p className='home-resourse-title'>Глоссы</p>
                                            <p>{0} ресурсов</p>
                                        </div>
                                    </div>
                                    <div onClick={onRedirect} className='home-resourse-block'>
                                        <p>Ф</p>
                                        <div className='home-resourse-meta'>
                                            <p className='home-resourse-title'>Фото</p>
                                            <p>{filterCount.images} ресурсов</p>
                                        </div>
                                    </div>
                                    <div onClick={onRedirect} className='home-resourse-block'>
                                        <p>Н</p>
                                        <div className='home-resourse-meta'>
                                            <p className='home-resourse-title'>Нотировки</p>
                                            <p>{currentCorpus.notations ? currentCorpus.notations : 0} ресурсов</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>



                <div className='corpus-view-connected-objects-container'>
                    <p className='sub-page-title'>Связанные персоны</p>

                    <div className='corpus-connected-objects-container'>
                        {filterCount.actors.map(a => {
                            return <div className='corpus-view-connected-objects-container-actor'>
                                <p>{getName(a)}</p>
                                <Link to={'/actor/' + a.id}><i className="fas fa-external-link-alt"></i></Link>
                            </div>
                        })}
                    </div>

                    <p className='sub-page-title'>Связанные места</p>

                    <div className='corpus-connected-objects-container'>

                        {filterCount.places.filter(p => p).map(p => {
                            return <div className='corpus-view-connected-objects-container-place'>
                                <p>{getName(p)}</p>
                            </div>
                        })}
                    </div>


                </div>

            </div>
        </>}

    </>;
};

export default CorpusView;