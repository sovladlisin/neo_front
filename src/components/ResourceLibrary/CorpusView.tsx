import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassObject } from '../../actions/ontology/classes/classes';
import { TCorpusExtended, TObjectExtended } from '../../actions/ontology/classes/types';
import { TCorpus } from '../../actions/ontology/corpuses/types';
import { CORPUS_1, getName } from '../../utils';
import { RouteComponentProps } from 'react-router-dom'
import { RootStore } from '../../store';

interface ICorpusViewProps {
    id: number
}

const CorpusView: React.FunctionComponent<ICorpusViewProps> = ({ match }: RouteComponentProps<ICorpusViewProps>) => {
    const current_id: number = parseInt(match.params.id)
    const classState = useSelector((state: RootStore) => state.classes)


    const [currentCorpus, setCurrentCorpus] = React.useState<TCorpusExtended>(null)
    const dispatch = useDispatch()
    React.useEffect(() => { dispatch(getClassObject(current_id)) }, [, current_id])
    React.useEffect(() => {
        var new_obj = classState.selectedObject
        if (new_obj && current_id === new_obj.id) {
            setCurrentCorpus(new_obj)
        }
    }, [classState.selectedObject])

    return <>
        {currentCorpus && <>
            <div className='sub-page-container'>
                <button className='corpus-return'><i className='fas fa-long-arrow-alt-left'></i>К списку корпусов</button>

                <div className='corpus-view-title-card'>
                    <img src={CORPUS_1}></img>
                    <div className='corpus-view-title-card-meta'>
                        <p className='corpus-view-title-card-meta-title'>
                            {getName(currentCorpus.object)}
                        </p>
                        <p>{currentCorpus.object['http://erlangen-crm.org/current/P3_has_note'] || 'Нет описания'}</p>
                    </div>
                </div>

                <div className='gray-background-strip-outer'>
                    <div className='gray-background-strip'>
                        <div className='home-block home-block-gray'>
                            <div className='home-block-inner'>
                                <p>Ресурсы</p>
                                <div className='home-resourse-container'>
                                    <div className='home-resourse-block'>
                                        <p>Т</p>
                                        <div className='home-resourse-meta'>
                                            <p className='home-resourse-title'>Тексты</p>
                                            <p>5 ресурсов</p>
                                        </div>
                                    </div>
                                    <div className='home-resourse-block'>
                                        <p>А</p>
                                        <div className='home-resourse-meta'>
                                            <p className='home-resourse-title'>Аудио</p>
                                            <p>5 ресурсов</p>
                                        </div>
                                    </div>
                                    <div className='home-resourse-block'>
                                        <p>В</p>
                                        <div className='home-resourse-meta'>
                                            <p className='home-resourse-title'>Видео</p>
                                            <p>5 ресурсов</p>
                                        </div>
                                    </div>
                                    <div className='home-resourse-block'>
                                        <p>П</p>
                                        <div className='home-resourse-meta'>
                                            <p className='home-resourse-title'>Публикации</p>
                                            <p>5 ресурсов</p>
                                        </div>
                                    </div>
                                    <div className='home-resourse-block'>
                                        <p>Г</p>
                                        <div className='home-resourse-meta'>
                                            <p className='home-resourse-title'>Глоссы</p>
                                            <p>5 ресурсов</p>
                                        </div>
                                    </div>
                                    <div className='home-resourse-block'>
                                        <p>Ф</p>
                                        <div className='home-resourse-meta'>
                                            <p className='home-resourse-title'>Фото</p>
                                            <p>5 ресурсов</p>
                                        </div>
                                    </div>
                                    <div className='home-resourse-block'>
                                        <p>Н</p>
                                        <div className='home-resourse-meta'>
                                            <p className='home-resourse-title'>Нотировки</p>
                                            <p>5 ресурсов</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>



                <div className='corpus-view-connected-objects-container'>
                    <p className='sub-page-title'>Связанные персоны</p>
                    <p className='sub-page-title'>Связанные места</p>
                    <div className='corpus-view-connected-objects-container-list'>

                    </div>
                    <div className='corpus-view-connected-objects-container-list'>

                    </div>

                </div>

            </div>
        </>}

    </>;
};

export default CorpusView;