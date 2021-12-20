import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getObjectsByClassUri } from '../../../actions/ontology/classes/classes';
import { TClass, TRelation } from '../../../actions/ontology/classes/types';
import { RootStore } from '../../../store';
import { getName, nodeFilter, useKeyPress } from '../../../utils';
import { useOnClickOutside } from '../../HandleClickOutside';

interface IObjectSelectorWindowProps {
    uri: string,
    onSelect: (object: TClass) => void,
    onClose: () => void,
    default?: TClass,

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

        if (data.uri != props.uri) return;
        setObjects(data.objects)

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
            <button style={props.default === null ? { background: '#252854', color: 'white' } : {}} onClick={_ => onSelect(null)}>Не указано</button>
            {objects.filter(node => nodeFilter(objectWindowSearch, node)).map(object => {
                return <button style={props.default && object.id === props.default.id ? { background: '#252854', color: 'white' } : {}} onClick={_ => onSelect(object)}>{getName(object)}</button>
            })}
        </div>
    </>
}

interface IObjectSelectorProps {
    uri: string,
    onSelect: (object: TClass, relation?: TRelation) => void,
    default?: TClass,
    onClick?: () => void,
    relation?: TRelation
}

const ObjectSelector: React.FunctionComponent<IObjectSelectorProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)

    const ctrlPress = useKeyPress('Control')

    const [objectWindow, setObjectWindow] = React.useState(false)

    const onSelect = (object: TClass) => {
        if (props.relation) props.onSelect(object, props.relation)
        else props.onSelect(object)
    }

    return <>
        <div className='object-selector' style={{ position: 'relative' }}>
            <div className='object-selector-name-placeholder' onClick={_ => {
                if (ctrlPress && props.onClick) props.onClick()
                else
                    setObjectWindow(true)
            }}>
                {props.default ? <p>{getName(props.default)}</p> : <p>Не указано</p>}
            </div>
            {objectWindow && <>
                <ObjectSelectorWindow uri={props.uri} default={props.default} onClose={() => setObjectWindow(false)} onSelect={obj => onSelect(obj)} />
            </>}
        </div>

    </>;
};

export default ObjectSelector;
