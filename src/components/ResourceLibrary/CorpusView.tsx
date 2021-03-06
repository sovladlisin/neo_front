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
            dispatch(getCorpusResources(new_obj.object['uri'], [], '', -1, -1, -1, -1, '', 1, 1))
        }
    }, [classState.selectedObject])


    // React.useEffect(() => {
    //     requestResources()
    // }, [currentCorpus])



    // const requestResources = () => {
    //     currentCorpus && console.log(currentCorpus['uri'])
    //     currentCorpus && dispatch(getCorpusResources(currentCorpus['uri'], [], '', -1, -1, -1, -1, '', 1, 1))
    // }

    const [counter, setCounter] = React.useState<TMainCounter>(null)
    React.useEffect(() => {
        resourceState.corpus_resources && resourceState.corpus_resources.counters && setCounter(resourceState.corpus_resources.counters)
    }, [, resourceState.corpus_resources])





    return <>
        {resourceState.is_loading && <Loading height={600} />}
        {currentCorpus && !resourceState.is_loading && <>
            <div className='sub-page-container'>
                <Link to='/corpuses'><button className='corpus-return'><i className='fas fa-long-arrow-alt-left'></i>?? ???????????? ????????????????</button></Link>

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
                                <p>??????????????</p>
                                <div className='home-resourse-container'>
                                    <Link to={{
                                        pathname: "/resources",
                                        resType: "text",
                                        corpusUri: currentCorpus.object['uri'],
                                    }}>
                                        <div className='home-resourse-block'>
                                            <p>??</p>
                                            <div className='home-resourse-meta'>
                                                <p className='home-resourse-title'>????????????</p>
                                                <p>{counter.texts} ????????????????</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to={{
                                        pathname: "/resources",
                                        resType: "audio",
                                        corpusUri: currentCorpus.object['uri'],
                                    }}>
                                        <div className='home-resourse-block'>
                                            <p>??</p>
                                            <div className='home-resourse-meta'>
                                                <p className='home-resourse-title'>??????????</p>
                                                <p>{counter.audio} ????????????????</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to={{
                                        pathname: "/resources",
                                        resType: "video",
                                        corpusUri: currentCorpus.object['uri'],
                                    }}>
                                        <div className='home-resourse-block'>
                                            <p>??</p>
                                            <div className='home-resourse-meta'>
                                                <p className='home-resourse-title'>??????????</p>
                                                <p>{counter.video} ????????????????</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to={{
                                        pathname: "/resources",
                                        resType: "article",
                                        corpusUri: currentCorpus.object['uri'],
                                    }}>
                                        <div className='home-resourse-block'>
                                            <p>??</p>
                                            <div className='home-resourse-meta'>
                                                <p className='home-resourse-title'>????????????????????</p>
                                                <p>{counter.articles} ????????????????</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to={{
                                        pathname: "/resources",
                                        resType: "glossary",
                                        corpusUri: currentCorpus.object['uri'],
                                    }}>
                                        <div className='home-resourse-block'>
                                            <p>??</p>
                                            <div className='home-resourse-meta'>
                                                <p className='home-resourse-title'>????????????</p>
                                                <p>{0} ????????????????</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to={{
                                        pathname: "/resources",
                                        resType: "image",
                                        corpusUri: currentCorpus.object['uri'],
                                    }}>
                                        <div className='home-resourse-block'>
                                            <p>??</p>
                                            <div className='home-resourse-meta'>
                                                <p className='home-resourse-title'>????????</p>
                                                <p>{counter.images} ????????????????</p>
                                            </div>
                                        </div>
                                    </Link>


                                    <Link to={{
                                        pathname: "/resources",
                                        resType: "note",
                                        corpusUri: currentCorpus.object['uri'],
                                    }}>
                                        <div className='home-resourse-block'>
                                            <p>??</p>
                                            <div className='home-resourse-meta'>
                                                <p className='home-resourse-title'>??????????????????</p>
                                                <p>{counter.notes} ????????????????</p>
                                            </div>
                                        </div>
                                    </Link>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>



                <div className='corpus-view-connected-objects-container'>
                    <p className='sub-page-title'>?????????????????? ??????????????</p>

                    <div className='corpus-connected-objects-container'>
                        {counter.actors.map(a => {
                            return <div className='corpus-view-connected-objects-container-actor'>
                                <p>{getName(a)}</p>
                                <Link to={'/actor/' + a.id}><i className="fas fa-external-link-alt"></i></Link>
                            </div>
                        })}
                    </div>

                    <p className='sub-page-title'>?????????????????? ??????????</p>

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