import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TClass } from '../../actions/ontology/classes/types';
import { getSubCorpuses } from '../../actions/ontology/corpuses/corpuses';
import { RootStore } from '../../store';
import { getName } from '../../utils';

interface ICorpusItemProps {
    corpus: TClass
    onSelect: (corpus_id: number) => void
}



const CorpusItem: React.FunctionComponent<ICorpusItemProps> = (props) => {
    const dispatch = useDispatch()
    const corpusState = useSelector((state: RootStore) => state.corpuses)

    //on SubCorpus info update
    const [subCorpuses, setSubCorpuses] = React.useState<TClass[]>([])
    React.useEffect(() => { corpusState.subCorpuses.corpus_id === currentCorpus.id && setSubCorpuses(corpusState.subCorpuses.corpuses) }, [corpusState.subCorpuses])

    const [isOpened, setIsOpened] = React.useState(false)

    const [currentCorpus, setCurrentCorpus] = React.useState(props.corpus)
    React.useEffect(() => setCurrentCorpus(props.corpus), [props.corpus])

    const onClick = () => {
        subCorpuses.length === 0 && dispatch(getSubCorpuses(currentCorpus.id))
        setIsOpened(!isOpened)

    }

    return <div className='og-class-block' >
        <div onClick={onClick} className='og-class-title' style={isOpened && subCorpuses.length != 0 ? { background: 'grey' } : {}}>
            <p>{getName(currentCorpus)}</p> <p id='open' onClick={_ => props.onSelect(currentCorpus.id)}>открыть</p>
        </div>
        {isOpened && <div className='og-class-subblock'>
            {subCorpuses.map(sc => {
                return <CorpusItem onSelect={props.onSelect} corpus={sc} />
            })}
        </div>}
    </div>;
};

export default CorpusItem;
