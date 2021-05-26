import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClasses, getObjectsByClassUri } from '../../../actions/ontology/classes/classes';
import { TClass } from '../../../actions/ontology/classes/types';
import { RootStore } from '../../../store';
import { getName, nodeFilter } from '../../../utils';
import { useOnClickOutside } from '../../HandleClickOutside';

interface IClassSelectorWindowProps {
    domain: string,
    onSelect: (object: TClass) => void,
    onClose: () => void,
    default?: TClass
}

const ClassSelectorWindow: React.FunctionComponent<IClassSelectorWindowProps> = (props) => {

    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)

    const [classWindowSearch, setClassWindowSearch] = React.useState('')

    const onSelect = (object: TClass) => {
        props.onSelect(object)
        props.onClose()
    }

    const [objects, setObjects] = React.useState<TClass[]>([])
    React.useEffect(() => {
        dispatch(getAllClasses(props.domain))
    }, [, props.domain])

    React.useEffect(() => {
        const data = classState.domainClasses
        if (data === null) return;
        if (data.domain != props.domain) return;
        data.classes && setObjects(data.classes)
    }, [, classState.domainClasses])

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
            <input placeholder='Поиск' value={classWindowSearch} onChange={e => setClassWindowSearch(e.target.value)}></input>
            <button style={props.default === null ? { background: '#252854', color: 'white' } : {}} onClick={_ => onSelect(null)}>Не указано</button>
            {objects.filter(node => nodeFilter(classWindowSearch, node)).map(object => {
                return <button style={props.default && object.id === props.default.id ? { background: '#252854', color: 'white' } : {}} onClick={_ => onSelect(object)}>{getName(object)}</button>
            })}
        </div>
        <div className='object-selector-background'></div>
    </>
}

interface IClassSelectorProps {
    domain: string,
    onSelect: (object: TClass) => void,
    default?: TClass
}

const ClassSelector: React.FunctionComponent<IClassSelectorProps> = (props) => {
    const [classWindow, setClassWindow] = React.useState(false)

    const onSelect = (object: TClass) => {
        props.onSelect(object)
    }

    return <>
        <div className='object-selector'>
            <div className='object-selector-name-placeholder' onClick={_ => setClassWindow(true)}>
                {props.default ? <p>{getName(props.default)}</p> : <p>Не указано</p>}
            </div>
        </div>
        {classWindow && <>
            <ClassSelectorWindow domain={props.domain} default={props.default} onClose={() => setClassWindow(false)} onSelect={obj => onSelect(obj)} />
        </>}
    </>;
};

export default ClassSelector;
