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
import { TMainCounter } from '../../actions/ontology/resources/types';
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
            // dispatch(getCorpusResources(new_obj.object['uri']))
        }
    }, [classState.selectedObject])


    React.useEffect(() => {
        requestResources()
    }, [currentCorpus])



    const requestResources = () => {
        currentCorpus && dispatch(getCorpusResources(currentCorpus['uri'], [], '', -1, -1, -1, -1, '', 1, 1))
    }

    const [counter, setCounter] = React.useState<TMainCounter>(null)
    React.useEffect(() => {
        resourceState.corpus_resources && resourceState.corpus_resources.counters && setCounter(resourceState.corpus_resources.counters)
    }, [, resourceState.corpus_resources])





    return <>
        {resourceState.is_loading && <Loading height={600} />}
        {currentCorpus && !resourceState.is_loading && <>
            <div className='sub-page-container'>
                <Link to='/corpuses'><button className='corpus-return'><i className='fas fa-long-arrow-alt-left'></i>К списку корпусов</button></Link>

                <div className='corpus-view-title-card'>
                    <img src={CORPUS_1}></img>
                    <div className='corpus-view-title-card-meta'>
                        <p className='corpus-view-title-card-meta-title'>
                            {getName(currentCorpus.object)}
                        </p>
                        <p className='corpus-view-title-card-meta-note'>{getNote(currentCorpus.object)}</p>
                    </div>
                </div>

                <div className='gray-background-strip-outer'>
                    <div className='gray-background-strip'>
                        <div className='home-block home-block-gray'>
                            <div className='home-block-inner'>
                                <p>Ресурсы</p>
                                <div className='home-resourse-container'>
                                    <Link to={{
                                        pathname: "/resources",
                                        resType: "text",
                                        corpusUri: currentCorpus.object['uri'],
                                    }}>
                                        <div className='home-resourse-block'>
                                            <p>Т</p>
                                            <div className='home-resourse-meta'>
                                                <p className='home-resourse-title'>Тексты</p>
                                                <p>{counter.texts} ресурсов</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to={{
                                        pathname: "/resources",
                                        resType: "audio",
                                        corpusUri: currentCorpus.object['uri'],
                                    }}>
                                        <div className='home-resourse-block'>
                                            <p>А</p>
                                            <div className='home-resourse-meta'>
                                                <p className='home-resourse-title'>Аудио</p>
                                                <p>{counter.audio} ресурсов</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to={{
                                        pathname: "/resources",
                                        resType: "video",
                                        corpusUri: currentCorpus.object['uri'],
                                    }}>
                                        <div className='home-resourse-block'>
                                            <p>В</p>
                                            <div className='home-resourse-meta'>
                                                <p className='home-resourse-title'>Видео</p>
                                                <p>{counter.video} ресурсов</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to={{
                                        pathname: "/resources",
                                        resType: "article",
                                        corpusUri: currentCorpus.object['uri'],
                                    }}>
                                        <div className='home-resourse-block'>
                                            <p>П</p>
                                            <div className='home-resourse-meta'>
                                                <p className='home-resourse-title'>Публикации</p>
                                                <p>{counter.articles} ресурсов</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to={{
                                        pathname: "/resources",
                                        resType: "glossary",
                                        corpusUri: currentCorpus.object['uri'],
                                    }}>
                                        <div className='home-resourse-block'>
                                            <p>Г</p>
                                            <div className='home-resourse-meta'>
                                                <p className='home-resourse-title'>Глоссы</p>
                                                <p>{0} ресурсов</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to={{
                                        pathname: "/resources",
                                        resType: "image",
                                        corpusUri: currentCorpus.object['uri'],
                                    }}>
                                        <div className='home-resourse-block'>
                                            <p>Ф</p>
                                            <div className='home-resourse-meta'>
                                                <p className='home-resourse-title'>Фото</p>
                                                <p>{counter.images} ресурсов</p>
                                            </div>
                                        </div>
                                    </Link>


                                    <Link to={{
                                        pathname: "/resources",
                                        resType: "note",
                                        corpusUri: currentCorpus.object['uri'],
                                    }}>
                                        <div className='home-resourse-block'>
                                            <p>Н</p>
                                            <div className='home-resourse-meta'>
                                                <p className='home-resourse-title'>Нотировки</p>
                                                <p>{counter.notes} ресурсов</p>
                                            </div>
                                        </div>
                                    </Link>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>



                <div className='corpus-view-connected-objects-container'>
                    <p className='sub-page-title'>Связанные персоны</p>

                    <div className='corpus-connected-objects-container'>
                        {counter.actors.map(a => {
                            return <div className='corpus-view-connected-objects-container-actor'>
                                <p>{getName(a)}</p>
                                <Link to={'/actor/' + a.id}><i className="fas fa-external-link-alt"></i></Link>
                            </div>
                        })}
                    </div>

                    <p className='sub-page-title'>Связанные места</p>

                    <div className='corpus-connected-objects-container'>

                        {counter.places.filter(p => p).map(p => {
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