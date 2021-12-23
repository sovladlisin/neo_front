import * as React from 'react';
import { Link } from 'react-router-dom'
import { TConnectedVisualItem } from '../../../actions/ontology/classes/types';
import { SERVER_DOMAIN, getName, getNote } from '../../../utils';
import ObjectInfo from '../../Ontology/ObjectInfo';

import ReactPlayer from 'react-player'
interface IVideoCardProps {
    onClose: () => void
    file: TConnectedVisualItem
}

const VideoCard: React.FunctionComponent<IVideoCardProps> = (props) => {

    const ref = React.useRef()
    // useOnClickOutside(ref, () => props.onClose())

    const [selectedItem, setSelectedItem] = React.useState(-1)

    return <>
        {props.file && <>
            <div className='m-background' onClick={props.onClose}></div>
            <div className='image-card' ref={ref}>

                <ReactPlayer className='resource-video-player' url={SERVER_DOMAIN.slice(0, -1) + props.file.file.source} controls={true} />


                <div className='visual-item-control-panel'>
                    <button onClick={_ => setSelectedItem(props.file.node.id)} ><i className='fas fa-cog'></i></button>
                </div>
                <p className='image-card-title'>{getName(props.file.node)}</p>
                <div className='image-card-meta'>
                    <div><label>Автор</label><p>{'Не указано'}</p></div>
                    <div><label>Место записи</label><p>{'Не указано'}</p></div>
                    <div><label>Ресурс</label><p>{'Не указано'}</p></div>
                    <div><label>Время записи</label><p>{'Не указано'}</p></div>
                </div>
                <div className='image-card-note'>
                    {getNote(props.file.node)}
                </div>
                <div className='image-card-connected'>
                    <label>Связанные ресурсы:</label>
                    <div>
                        <Link to=''>Пример<i className="fas fa-external-link-alt"></i></Link>
                        <Link to=''>Пример<i className="fas fa-external-link-alt"></i></Link>
                        <Link to=''>Пример<i className="fas fa-external-link-alt"></i></Link>
                        <Link to=''>Пример<i className="fas fa-external-link-alt"></i></Link>
                    </div>
                </div>
            </div>
        </>}
        {selectedItem != -1 && <ObjectInfo onSelect={id => setSelectedItem(id)} object_id={selectedItem} onClose={() => setSelectedItem(-1)} />}

    </>;
};

export default VideoCard;
