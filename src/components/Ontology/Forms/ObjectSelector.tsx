import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getObjectsByClassUri } from '../../../actions/ontology/classes/classes';
import { TClass } from '../../../actions/ontology/classes/types';
import { RootStore } from '../../../store';
import { getName } from '../../../utils';
import { useOnClickOutside } from '../../HandleClickOutside';

interface IObjectSelectorWindowProps {
    uri: string,
    onSelect: (object: TClass) => void,
    onClose: () => void,
    default: TClass
}

const ObjectSelectorWindow: React.FunctionComponent<IObjectSelectorWindowProps> = (props) => {

    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)

    const [objectWindowSearch, setObjectWindowSearch] = React.useState('')

    const onSelect = (object: TClass) => {
        props.onSelect(object)
        props.onClose()
    }

    const [objects, setObjects] = React.useState<TClass[]>([])
    React.useEffect(() => {
        dispatch(getObjectsByClassUri(props.uri))
    }, [, props.uri])

    React.useEffect(() => {
        const data = classState.selectedObjectsByUri
        console.log(data, props.uri)
        if (data.uri != props.uri) return;
        setObjects(data.objects)
        console.log(data.objects)
    }, [classState.selectedObjectsByUri])

    const ref = React.useRef()
    useOnClickOutside(ref, () => {
        props.onClose()
    })


    // .filter(object => {
    //     console.log(objectWindowSearch.length)
    //     if (objectWindowSearch.length === 0) return true
    //     var check = false
    //     object.params.map(p => {
    //         if (Array.isArray(object[p])) {
    //             object[p].map(item => {
    //                 check = item.includes(objectWindowSearch)
    //             })
    //         } else {
    //             check = object[p].includes(objectWindowSearch)
    //         }
    //     })
    //     return check
    // })

    return <>
        <div className='object-selector-window' ref={ref}>
            <input placeholder='Поиск' value={objectWindowSearch} onChange={e => setObjectWindowSearch(e.target.value)}></input>
            {objects.map(object => {
                return <button style={props.default && object.id === props.default.id ? { background: 'black', color: 'white' } : {}} onClick={_ => onSelect(object)}>{getName(object)}</button>
            })}
        </div>
        <div className='object-selector-background'></div>
    </>
}

interface IObjectSelectorProps {
    uri: string,
    onSelect: (object: TClass) => void,
    default: TClass
}

const ObjectSelector: React.FunctionComponent<IObjectSelectorProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)

    const [objectWindow, setObjectWindow] = React.useState(false)

    const onSelect = (object: TClass) => {
        props.onSelect(object)
    }

    return <>
        <div className='object-selector'>
            <div className='object-selector-name-placeholder' onClick={_ => setObjectWindow(true)}>
                {props.default ? <p>{getName(props.default)}</p> : <p>Не указано</p>}
            </div>
        </div>
        {objectWindow && <>
            <ObjectSelectorWindow uri={props.uri} default={props.default} onClose={() => setObjectWindow(false)} onSelect={obj => onSelect(obj)} />
        </>}
    </>;
};

export default ObjectSelector;
