import * as React from 'react';
import { TClass, TConnectedVisualItem } from '../../actions/ontology/classes/types';
import { SERVER_DOMAIN, getName, getNote, CORPUS_URI, PERSON_URI, LING_OBJECT_URI } from '../../utils';
import { useOnClickOutside } from '../HandleClickOutside';
import { Link } from 'react-router-dom'
import ObjectInfo from '../Ontology/ObjectInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getVisualConnections } from '../../actions/ontology/resources/resources';
import { RootStore } from '../../store';

import { Document, Page } from 'react-pdf';

interface IImageCardProps {
    onClose: () => void
    file: TConnectedVisualItem
}

const ImageCard: React.FunctionComponent<IImageCardProps> = (props) => {
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
        // console.log(props.file.node.id)
        if (resourceState.visual_items_connections && resourceState.visual_items_connections.id === props.file.node.id) {
            setLocalConnections(resourceState.visual_items_connections.data)
        }

    }, [resourceState.visual_items_connections])

    // console.log('IDDDDDD:', props.file.file.id)

    return <>
        {props.file && <>
            <div className='m-background' onClick={props.onClose}></div>
            <div className='image-card' ref={ref}>
                {props.file.file.type === 'pdf' ? <>
                    <object data={SERVER_DOMAIN.slice(0, -1) + props.file.file.source} type="application/pdf">
                        <iframe src={"https://docs.google.com/viewer?url=" + SERVER_DOMAIN.slice(0, -1) + props.file.file.source + "&embedded=true"}></iframe>
                    </object>

                    {/* <Document file={SERVER_DOMAIN.slice(0, -1) + props.file.file.source}>
                        <Page pageNumber={1} />
                    </Document> */}


                    {/* <iframe src={SERVER_DOMAIN.slice(0, -1) + props.file.file.source}></iframe> */}


                </> : <><img src={SERVER_DOMAIN.slice(0, -1) + props.file.file.source}></img></>}

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

export default ImageCard;
