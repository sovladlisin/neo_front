import * as React from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '../../actions/ontology/classes/classes';
import { TClass } from '../../actions/ontology/classes/types';
import { ACTOR_URI, getRandomInt, PLACE_URI } from '../../utils';
import { useOnClickOutside } from '../HandleClickOutside';
import LangStringInput from '../Ontology/Forms/LangStringInput';
import ObjectSelector from '../Ontology/Forms/ObjectSelector';

interface IEventFormProps {
    onClose: () => void,
}

const EventForm: React.FunctionComponent<IEventFormProps> = (props) => {
    const dispatch = useDispatch()

    const [selectedPlace, setSelectedPlace] = React.useState<TClass>(null)
    const [selectedActor, setSelectedActor] = React.useState<TClass>(null)
    const [selectedTime, setSelectedTime] = React.useState('')
    const [label, setLabel] = React.useState<string[]>([])

    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())


    const onSave = () => {
        dispatch(createEvent(selectedActor.id, selectedPlace.id, selectedTime, label))
    }
    return <>
        <div className='m-background'></div>
        <div className='og-form' ref={ref}>

            <p className='og-form-title'>Событие</p>

            <div className='event-form-container' ref={ref}>
                <label>Краткое название</label>
                <LangStringInput
                    value={
                        label.map(item => {

                            return { val: item.split('@')[0], type: '@' + item.split('@')[1], id: getRandomInt(0, 1000) }
                        })
                    }
                    onChange={val => setLabel(val.map(item => item.val + item.type))} />
                <label>Место</label>
                <ObjectSelector
                    uri={PLACE_URI}
                    default={selectedPlace}
                    onSelect={(obj) => setSelectedPlace(obj)} />
                <label>Персона</label>
                <ObjectSelector
                    uri={ACTOR_URI}
                    default={selectedActor}
                    onSelect={(obj) => setSelectedActor(obj)} />
                <label>Время</label>
                <input value={selectedTime} onChange={e => setSelectedTime(e.target.value)}></input>


            </div>

            <button onClick={onSave}>СОХРАНИТЬ</button>


        </div>

    </>;
};

export default EventForm;
