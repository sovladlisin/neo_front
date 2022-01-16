import * as React from 'react';
import { Link } from 'react-router-dom'
import { TClass, TConnectedVisualItem } from '../../../actions/ontology/classes/types';
import { SERVER_DOMAIN, getName, getNote, CORPUS_URI, LING_OBJECT_URI, PERSON_URI } from '../../../utils';
import ObjectInfo from '../../Ontology/ObjectInfo';

import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux';
import { getVisualConnections } from '../../../actions/ontology/resources/resources';
import { RootStore } from '../../../store';
interface IVideoCardProps {
    onClose: () => void
    file: TConnectedVisualItem
}

const VideoCard: React.FunctionComponent<IVideoCardProps> = (props) => {
    const dispatch = useDispatch()
    const ref = React.useRef()
    // useOnClickOutside(ref, () => props.onClose())

    const [selectedItem, setSelectedItem] = React.useState(-1)

    React.useEffect(() => {
        dispatch(getVisualConnections(props.file.node.id))
    }, [])

    const resourceState = useSelector((state: RootStore) => state.resources)
    const [localConnections, setLocalConnections] = React.useState<TClass[]>([])
    React.useEffect(() => {
        if (resourceState.visual_items_connections && resourceState.visual_items_connections.id === props.file.node.id) {
            setLocalConnections(resourceState.visual_items_connections.data)
        }

    }, [resourceState.visual_items_connections])

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
                        {localConnections.map(c => {
                            var url = ''
                            if (c.labels.includes(CORPUS_URI)) {
                                url = '/corpus/' + c.id
                            }
                            if (c.labels.includes(PERSON_URI)) {
                                url = '/actor/' + c.id
                            }
                            if (c.labels.includes(LING_OBJECT_URI)) {
                                url = '/workspace/' + c.id
                            }
                            return <Link to={url} target="_blank" rel="noopener noreferrer">{getName(c)}<i className="fas fa-external-link-alt"></i></Link>
                        })}
                    </div>
                </div>
            </div>
        </>}
        {selectedItem != -1 && <ObjectInfo onSelect={id => setSelectedItem(id)} object_id={selectedItem} onClose={() => setSelectedItem(-1)} />}

    </>;
};

export default VideoCard;
