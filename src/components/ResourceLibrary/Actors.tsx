import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getObjectsByClassUri } from '../../actions/ontology/classes/classes';
import { TActor, TClass } from '../../actions/ontology/classes/types';
import { RootStore } from '../../store';
import { nodeFilter, getName, PERSON_URI, ACTOR_URI } from '../../utils';
import Loading from '../Loading';
import ObjectInfo from '../Ontology/ObjectInfo';
import { Link } from 'react-router-dom'
import Footer from '../Footer';
import ObjectForm from '../Ontology/Forms/ObjectForm';
interface IActorsProps {
}

const Actors: React.FunctionComponent<IActorsProps> = (props) => {
    const class_uri = PERSON_URI


    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)
    const authState = useSelector((state: RootStore) => state.auth)

    const [objectWindowSearch, setObjectWindowSearch] = React.useState('')


    const [items, setItems] = React.useState<TActor[]>([])
    const [selectedItem, setSelectedItem] = React.useState(-1)

    React.useEffect(() => {
        dispatch(getObjectsByClassUri(class_uri))
    }, [, class_uri, classState.createdEntity])
    React.useEffect(() => {
        const data = classState.selectedObjectsByUri
        if (!data || (data && data.uri != class_uri)) return;
        setItems(data.objects)
    }, [, classState.selectedObjectsByUri])

    const [selectedLetter, setSelectedLetter] = React.useState('~')

    const [addActorWindow, setAddActorWindow] = React.useState(false)
    return <>
        <div className='sub-page-container'>
            {classState.isObjectsLoadingByUri && <><Loading height={300} /></>}
            {!classState.isObjectsLoadingByUri && <>
                <p className='sub-page-title'>Персоны
                    {authState.user.is_editor && <button onClick={_ => setAddActorWindow(true)} ><i className='fas fa-plus'></i></button>}
                </p>
                <div className='person-search-container'>
                    <span><i className='fas fa-search'></i></span>
                    <input placeholder='Поиск' value={objectWindowSearch} onChange={e => setObjectWindowSearch(e.target.value)}></input>
                    <div className='person-abc-container'>
                        <div className='person-abc-inner-container'>
                            <button className={selectedLetter === '~' ? 'selected-letter' : ''} onClick={_ => setSelectedLetter('~')}>ВСЕ</button>
                            {'А.Б.В.Г.Д.Е.Ж.З.И.Й.К.Л.М.Н.О.П.Р.С.Т.У.Ф.Х.Ц.Ч.Ш.Щ.Э.Ю.Я'.split('.').map(letter => {
                                return <>
                                    <button className={selectedLetter === letter ? 'selected-letter' : ''} onClick={_ => setSelectedLetter(letter)}>{letter}</button>
                                </>
                            })}
                        </div>
                    </div>
                </div>

                <div className='selected-letter-container'>
                    {selectedLetter === '~' && <p>ВСЕ</p>}
                    {selectedLetter != '~' && <p>{selectedLetter}</p>}
                </div>

                <div className='actor-list'>
                    {items.filter(node => nodeFilter(objectWindowSearch, node)).map(item => {
                        if (selectedLetter === '~' || getName(item)[0] === selectedLetter)
                            return <>
                                <div className='actor-item'>
                                    <p>{getName(item)}</p>
                                    <button onClick={_ => setSelectedItem(item.id)}><i className="fas fa-cog"></i></button>
                                    <Link to={'/actor/' + item.id}><i className="fas fa-external-link-alt"></i></Link>
                                </div>
                            </>
                        return <></>
                    })}
                </div>





            </>}
        </div>
        {addActorWindow && <ObjectForm class_uri={ACTOR_URI} onClose={() => setAddActorWindow(false)} domain='Resource' />}
        {selectedItem != -1 && <ObjectInfo onSelect={id => setSelectedItem(id)} object_id={selectedItem} onClose={() => setSelectedItem(-1)} />}

    </>
};

export default Actors;
