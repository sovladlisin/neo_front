import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchIndex } from '../../../actions/ontology/classes/classes';
import { TClass } from '../../../actions/ontology/classes/types';
import { RootStore } from '../../../store';
import { getName } from '../../../utils';
import { useOnClickOutside } from '../../HandleClickOutside';
import Loading from '../../Loading';

interface ISearchFormProps {
    domain: string,
    onClose: () => void,
    onObjectSelect: (obj: number) => void
}

const SearchForm: React.FunctionComponent<ISearchFormProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)

    const [connector, setConnector] = React.useState('OR')
    const [searchString, setSearchString] = React.useState('')

    const [result, setResult] = React.useState<TClass[]>([])
    React.useEffect(() => {
        const data = classState.searchResult
        if (data && data.domain === props.domain) setResult(data.result)
    }, [, classState.searchResult])


    const onSearch = () => {
        dispatch(searchIndex(props.domain, connector, searchString))
    }

    return <>
        <div className='og-search-form'>
            <button className='og-search-form-exit' onClick={props.onClose}><i className='fas fa-times'></i></button>
            {/* <div className='og-search-filters'>
                <button style={connector === 'OR' ? { background: '#252854', color: 'white', border: 'none' } : {}} onClick={_ => setConnector('OR')}>"Или"</button>
                <button style={connector === 'AND' ? { background: '#252854', color: 'white', border: 'none' } : {}} onClick={_ => setConnector('AND')}>"И"</button>
            </div> */}
            <div className='og-search-input-container'>
                <input onChange={e => setSearchString(e.target.value)} value={searchString}></input>
                <button onClick={onSearch} className='og-search-search'>
                    <i className='fas fa-search'></i>
                </button>
            </div>
            <div className='og-search-result'>
                {classState.isSearching && <><Loading height={200} /></>}
                {result && !classState.isSearching && result.length === 0 && <>
                    <div id='empty'><i className='fas fa-times'></i></div>
                </>}
                {result && !classState.isSearching && result.length > 0 && <>
                    <div className='og-search-result-items'>
                        {result.map(item => {
                            return <>
                                <div onClick={_ => props.onObjectSelect(item.id)} className='og-class-title'>
                                    <p >{getName(item)}</p>
                                </div>
                            </>
                        })}
                    </div>
                </>}
            </div>
        </div>
    </>;
};

export default SearchForm;
