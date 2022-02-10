import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, getObjectsByClassUri } from '../../../actions/ontology/classes/classes';
import { TClass } from '../../../actions/ontology/classes/types';
import { RootStore } from '../../../store';
import { ACTOR_URI, getName, nodeFilter, PLACE_URI } from '../../../utils';
import { useOnClickOutside } from '../../HandleClickOutside';
import ObjectSelector from './ObjectSelector';

interface IAddEventFormProps {
    connection_type: string,
    event_name: string,
    onClose: () => void,
    resource_id: number
}
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
const AddEventForm: React.FunctionComponent<IAddEventFormProps> = (props) => {
    const [selectedTime, setSelectedTime] = React.useState('')
    const [selectedPlace, setSelectedPlace] = React.useState<TClass>(null)
    const dispatch = useDispatch()
    const [objectWindow, setObjectWindow] = React.useState(false)
    const [selectedActors, setSelectedActors] = React.useState<TClass[]>([])

    const onSave = () => {
        const actors_ids = selectedActors.map(a => {
            var title = getName(a) + "_" + props.event_name
            return { actor_id: a.id, title: [title + '@ru'] }
        })

        var place_id = selectedPlace ? selectedPlace.id : -1
        var time_string = selectedTime
        var resource_id = props.resource_id
        var connection_type = props.connection_type

        dispatch(createEvent(actors_ids, place_id, time_string, resource_id, connection_type))
        props.onClose()
    }
    return <>

        <div className='event-add-object-form-container'>
            <div className='event-add-object-form-container-data'>

                <label>Персоны:</label>
                <div className='event-add-object-form-container-actors'>
                    {selectedActors.map(actor => {
                        return <div className='event-add-object-form-container-actors-actor'>
                            <p>{getName(actor)}</p>
                            <button onClick={_ => setSelectedActors(selectedActors.filter(a => a.id != actor.id))}><i className='fas fa-times'></i></button>
                        </div>
                    })}
                    <button className='event-add-object-form-container-actors-button' onClick={_ => setObjectWindow(true)}><i className='fas fa-plus'></i></button>
                </div>
                <label>Время:</label>
                <input value={selectedTime} onChange={e => setSelectedTime(e.target.value)}></input>

                <label>Место:</label>
                <ObjectSelector
                    uri={PLACE_URI}
                    default={selectedPlace}
                    onSelect={(obj) => setSelectedPlace(obj)} />
            </div>
            <button className='event-add-object-form-container-save' onClick={onSave}>Сохранить</button>
            <button className='event-add-object-form-container-close' onClick={_ => props.onClose()}>Закрыть</button>
            {objectWindow && <>
                <ObjectSelectorWindow uri={ACTOR_URI} default={null} onClose={() => setObjectWindow(false)} onSelect={obj => setSelectedActors([...selectedActors, obj])} />
            </>}
        </div>

    </>;
};

export default AddEventForm;
