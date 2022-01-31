import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TClass } from '../../actions/ontology/classes/types';
import { getCorpuses } from '../../actions/ontology/corpuses/corpuses';
import { TCorpus } from '../../actions/ontology/corpuses/types';
import { RootStore } from '../../store';
import { CORPUS_1, CORPUS_URI, getName } from '../../utils';
import Footer from '../Footer';
import ObjectForm from '../Ontology/Forms/ObjectForm';
import ObjectInfo from '../Ontology/ObjectInfo';
import CorpusItem from './CorpusItem';
import { Link } from 'react-router-dom'
interface ICorpusTreeProps {
}




export const CorpusTree: React.FunctionComponent<ICorpusTreeProps> = (props) => {
    const dispatch = useDispatch()
    const corpusState = useSelector((state: RootStore) => state.corpuses)
    const authState = useSelector((state: RootStore) => state.auth)


    React.useEffect(() => {
        dispatch(getCorpuses())
    }, [])

    const [corpuses, setCorpuses] = React.useState<TCorpus[]>([])
    React.useEffect(() => { setCorpuses(corpusState.parentCorpuses) }, [corpusState.parentCorpuses])

    const [objectAddWindow, setObjectAddWindow] = React.useState(false)

    const [selectedCorpus, setSelectedCorpus] = React.useState(-1)

    const openCorpus = (id: number) => {

    }

    const [addItemWindow, setAddItemWindow] = React.useState(false)

    return <>
        <div className='sub-page-container'>

            <p className='sub-page-title'>Корпусы
                {authState.user.is_editor && <button onClick={_ => setAddItemWindow(true)} ><i className='fas fa-plus'></i></button>}

            </p>
            <div className='corpuses-page-container'>
                {corpuses.map(c => {
                    return <>
                        <div className='corpus-container'>
                            <div className='corpus-container-image-container'>
                                <Link target={'_blank'} to={'/corpus/' + c.id}><img src={CORPUS_1}></img></Link>
                                <span></span>
                                <p>{getName(c)}</p>
                                {authState.user.is_editor && <button className='corpus-container-image-container-edit-corpus' onClick={_ => setSelectedCorpus(c.id)}><i className='fas fa-cog'></i></button>}
                            </div>
                            {/* <div className='corpus-container-meta'>
                                <p>{c.texts.length + ' текстов'}</p>
                                <p>{c.texts.length + ' видео'}</p>
                                <button className='corpus-detailed-info-button' onClick={_ => setSelectedCorpus(c.id)}><i className='fas fa-info'></i></button>
                            </div> */}
                        </div>
                        {/* <CorpusItem onSelect={id => setSelectedCorpus(id)} corpus={c} /> */}
                    </>
                })}
            </div>
            {selectedCorpus != -1 && <ObjectInfo onSelect={id => setSelectedCorpus(id)} object_id={selectedCorpus} onClose={() => setSelectedCorpus(-1)} />}
        </div>

        {addItemWindow && <ObjectForm class_uri={CORPUS_URI} onClose={() => setAddItemWindow(false)} domain='Resource' />}


    </>;
};


