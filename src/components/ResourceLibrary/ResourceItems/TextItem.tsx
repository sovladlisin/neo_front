import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { node } from 'webpack';
import { Link } from 'react-router-dom'
import { TClass } from '../../../actions/ontology/classes/types';
import { getName, getNote } from '../../../utils';

interface ITextItemProps {
    node: TClass,
    images: number,
    video: number,
    audio: number,
    notations: number,
}
export const TextItem: React.FunctionComponent<ITextItemProps> = (props) => {
    const getLink = () => {
        if (props.node.labels.includes('http://erlangen-crm.org/current/E33_Linguistic_Object')) {
            return "/workspace/" + props.node.id
        }
    }
    const [show, setShow] = React.useState(false)
    return <>
        <div className='resource-item-container'>
            <div>
                <p className='resource-item-title'> <i style={{ color: '#61a4eb' }} className="fas fa-file-alt"></i> {getName(props.node)}</p>
                <p style={!show ? { maxHeight: '20px' } : { maxHeight: 'max-content' }} className='resource-item-note'>{getNote(props.node)}</p>
                <div className='resource-item-counter'>
                    <label>{props.images} Изобр.</label>
                    <label>{props.video} Видео</label>
                    <label>{props.audio} Аудио</label>
                    <label>{props.notations} Нотировки</label>
                </div>
            </div>
            <div>
                <Link to={getLink()} className='resource-item-open'>ОТКРЫТЬ</Link>
                <button onClick={_ => setShow(!show)} className='resource-item-more'>Подробнее <i className='fas fa-chevron-down'></i></button>
            </div>

        </div>
    </>
}