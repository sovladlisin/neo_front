import * as React from 'react';
import { useDispatch } from 'react-redux';
import { updateIndex } from '../../../actions/ontology/classes/classes';
import { useOnClickOutside } from '../../HandleClickOutside';

interface IConformationFormProps {
    onClose: () => void,
    onConfirm: () => void,
    message: string
}

const ConformationForm: React.FunctionComponent<IConformationFormProps> = (props) => {
    const ref = React.useRef()
    useOnClickOutside(ref, props.onClose)
    return <>
        <div className='index-form' ref={ref}>
            <p>{props.message}</p>
            <button style={{ background: '#3ed29b' }} onClick={props.onConfirm}>Да, я уверен</button>
            <button style={{ background: '#df3d5c' }} onClick={props.onClose}>Нет, вернуться назад</button>
        </div>
        <div className='background'>

        </div>
    </>;
};

export default ConformationForm;
