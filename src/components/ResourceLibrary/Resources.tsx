import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { node } from 'webpack';
import { TClass } from '../../actions/ontology/classes/types';
import { getAllResources } from '../../actions/ontology/resources/resources';
import { RootStore } from '../../store';
import { getName } from '../../utils';
import Keyboard from '../Keyboard';
import { Link } from 'react-router-dom'

interface IResourceItemProps {
    node: TClass
}
const ResourceItem: React.FunctionComponent<IResourceItemProps> = (props) => {
    const getLink = () => {
        if (props.node.labels.includes('http://erlangen-crm.org/current/E33_Linguistic_Object')) {
            return "/workspace/" + props.node.id
        }
    }
    return <>
        <div className='resource-item-container'>
            <div>
                <p className='resource-item-title'>{getName(props.node)}</p>
                <p className='resource-item-note'>Описание...</p>
            </div>
            <div>
                <Link to={getLink()} className='resource-item-open'>ОТКРЫТЬ</Link>
                <button className='resource-item-more'>Подробнее <i className='fas fa-chevron-down'></i></button>
            </div>

        </div>
    </>
}

interface IResourcesProps {
}

const Resources: React.FunctionComponent<IResourcesProps> = (props) => {
    const dispatch = useDispatch()
    const resourceState = useSelector((state: RootStore) => state.resources)

    React.useEffect(() => {
        dispatch(getAllResources())
    }, [])

    const [mainSearch, setMainSearch] = React.useState('')
    const [keyboard, setKeyboard] = React.useState(false)

    const [openedPanels, setOpenedPanels] = React.useState<number[]>([])
    const [selectedResourceTypes, setSelectedResourceTypes] = React.useState([])

    const flipPanel = (n: number) => {
        openedPanels.includes(n) ? setOpenedPanels(openedPanels.filter(i => i != n)) : setOpenedPanels([...openedPanels, n])
    }
    const flipRT = (s: string) => {
        selectedResourceTypes.includes(s) ? setSelectedResourceTypes(selectedResourceTypes.filter(i => i != s)) : setSelectedResourceTypes([...selectedResourceTypes, s])
    }
    const resetFilter = () => {
        setSelectedResourceTypes([])
    }
    return <>
        {resourceState.all_resources && <>

            <div className='sub-page-container'>

                <div className='resource-search-container'>
                    <span><i className='fas fa-search'></i></span>
                    <input placeholder={'Поиск по ресурсам'} value={mainSearch} onChange={e => setMainSearch(e.target.value)}></input>
                    <button onClick={_ => setKeyboard(!keyboard)}>Клавиатура спецсимволов</button>
                    <label>Для поиска можно использовать национальные знаки, например, ӑ, ӱ, ү</label>
                </div>

                <div className='resource-content-container'>
                    <div className='resource-nav-panel'>
                        <div className='resource-nav-panel-collapse-list'>
                            <button onClick={_ => flipPanel(1)}>Тип ресурса <i className={openedPanels.includes(1) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                            {openedPanels.includes(1) && <>
                                <div className='resource-nav-panel-collapse-list-content'>
                                    <button onClick={_ => flipRT('texts')}><i className={selectedResourceTypes.includes('texts') ? 'far fa-dot-circle' : 'far fa-circle'}></i> Тексты ({resourceState.all_resources.texts_count}) </button>
                                    <button onClick={_ => flipRT('audio')}><i className={selectedResourceTypes.includes('audio') ? 'far fa-dot-circle' : 'far fa-circle'}></i> Аудио ({resourceState.all_resources.audio_count}) </button>
                                    <button onClick={_ => flipRT('video')}><i className={selectedResourceTypes.includes('video') ? 'far fa-dot-circle' : 'far fa-circle'}></i> Видео ({resourceState.all_resources.video_count}) </button>
                                    <button onClick={_ => flipRT('images')}><i className={selectedResourceTypes.includes('images') ? 'far fa-dot-circle' : 'far fa-circle'}></i> Фото ({resourceState.all_resources.images_count}) </button>
                                    <button onClick={_ => flipRT('notes')}><i className={selectedResourceTypes.includes('notes') ? 'far fa-dot-circle' : 'far fa-circle'}></i> Нотировки ({0}) </button>
                                    <button onClick={_ => flipRT('glossary')}><i className={selectedResourceTypes.includes('glossary') ? 'far fa-dot-circle' : 'far fa-circle'}></i> Глоссы ({0}) </button>
                                    <button onClick={_ => flipRT('publications')}><i className={selectedResourceTypes.includes('publications') ? 'far fa-dot-circle' : 'far fa-circle'}></i> Публикации ({0}) </button>
                                </div>
                            </>}
                        </div>


                        <div className='resource-nav-panel-collapse-list'>
                            <button onClick={_ => flipPanel(2)}>Языки <i className={openedPanels.includes(2) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                            {openedPanels.includes(2) && <>

                                <div className='resource-nav-panel-collapse-list-second'>
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
                                </div>

                            </>}
                        </div>

                        <div className='resource-nav-panel-collapse-list'>
                            <button onClick={_ => flipPanel(3)}>Жанры <i className={openedPanels.includes(3) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                            {openedPanels.includes(3) && <>

                                <div className='resource-nav-panel-collapse-list-second'>
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
                                </div>

                            </>}
                        </div>

                        <div className='resource-nav-panel-collapse-list'>
                            <button onClick={_ => flipPanel(4)}>Персоны <i className={openedPanels.includes(4) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                            {openedPanels.includes(4) && <>

                                <div className='resource-nav-panel-collapse-list-second'>
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
                                </div>

                            </>}
                        </div>

                        <div className='resource-nav-panel-collapse-list'>
                            <button onClick={_ => flipPanel(5)}>Место записи <i className={openedPanels.includes(5) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}></i></button>
                            {openedPanels.includes(5) && <>
                                <input></input>
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

                    </div>
                    <div className='resource-list'>
                        {resourceState.all_resources.texts.map(res => {
                            return <ResourceItem node={res} />
                        })}
                    </div>
                </div>
            </div>
        </>}

        {keyboard && <Keyboard onClick={l => setMainSearch(mainSearch + l)} onClose={() => setKeyboard(false)} />}
    </>;
};

export default Resources;
