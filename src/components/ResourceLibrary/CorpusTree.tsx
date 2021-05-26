import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TClass } from '../../actions/ontology/classes/types';
import { getCorpuses } from '../../actions/ontology/corpuses/corpuses';
import { RootStore } from '../../store';
import ObjectForm from '../Ontology/Forms/ObjectForm';
import ObjectInfo from '../Ontology/ObjectInfo';
import CorpusItem from './CorpusItem';

interface ICorpusTreeProps {
}




export const CorpusTree: React.FunctionComponent<ICorpusTreeProps> = (props) => {
    const dispatch = useDispatch()
    const corpusState = useSelector((state: RootStore) => state.corpuses)
    React.useEffect(() => {
        dispatch(getCorpuses())
    }, [])

    const [corpuses, setCorpuses] = React.useState<TClass[]>([])
    React.useEffect(() => { setCorpuses(corpusState.parentCorpuses) }, [corpusState.parentCorpuses])

    const [objectAddWindow, setObjectAddWindow] = React.useState(false)

    const [selectedCorpus, setSelectedCorpus] = React.useState(-1)

    return <>
        {corpuses.map(c => {
            return <>
                <CorpusItem onSelect={id => setSelectedCorpus(id)} corpus={c} />
            </>
        })}
        {selectedCorpus != -1 && <ObjectInfo onSelect={id => setSelectedCorpus(id)} object_id={selectedCorpus} onClose={() => setSelectedCorpus(-1)} />}


    </>;
};


