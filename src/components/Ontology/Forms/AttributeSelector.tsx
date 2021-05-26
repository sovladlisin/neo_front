import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getObjectsByClassUri } from '../../../actions/ontology/classes/classes';
import { TClass } from '../../../actions/ontology/classes/types';
import { getNodeAttributes } from '../../../actions/workspace/workspace';
import { RootStore } from '../../../store';
import { getName, nodeFilter } from '../../../utils';
import { useOnClickOutside } from '../../HandleClickOutside';

interface IAttributeSelectorWindowProps {
    uri: string,
    onSelect: (object: TClass) => void,
    onClose: () => void,
    default?: TClass,
    obj: boolean
}

const AttributeSelectorWindow: React.FunctionComponent<IAttributeSelectorWindowProps> = (props) => {

    const dispatch = useDispatch()
    const workState = useSelector((state: RootStore) => state.workspace)

    const [objectWindowSearch, setObjectWindowSearch] = React.useState('')

    const onSelect = (object: TClass) => {
        props.onSelect(object)
        props.onClose()
    }

    const [objects, setObjects] = React.useState<TClass[]>([])
    React.useEffect(() => {
        dispatch(getNodeAttributes(props.uri))
    }, [, props.uri])

    React.useEffect(() => {
        const data = workState.selectedAttributes

        if (!data || data.node_uri != props.uri) return;
        if (props.obj) setObjects(data.attributes_obj)
        else setObjects(data.attributes)


    }, [workState.selectedAttributes])

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
        <div className='object-selector-background'></div>
    </>
}

interface IAttributeSelectorProps {
    uri: string,
    onSelect: (object: TClass) => void,
    default?: TClass,
    obj?: true
}

const AttributeSelector: React.FunctionComponent<IAttributeSelectorProps> = (props) => {

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
            <AttributeSelectorWindow obj={props.obj} uri={props.uri} default={props.default} onClose={() => setObjectWindow(false)} onSelect={obj => onSelect(obj)} />
        </>}
    </>;
};

export default AttributeSelector;
