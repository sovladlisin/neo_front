import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { node } from 'webpack';
import { Link } from 'react-router-dom'
import { TClass, TConnectedVisualItem } from '../../../actions/ontology/classes/types';
import { getName, getNote } from '../../../utils';
import ImageCard from '../../Workspace/ImageCard'
import VideoCard from './VideoCard';
interface IVisualItemProps {
    node: TClass
    file?: TConnectedVisualItem
}
export const VisualItem: React.FunctionComponent<IVisualItemProps> = (props) => {

    const [imageCardWindow, setImageCardWindow] = React.useState(false)
    const [videoCardWindow, setVideoCardWindow] = React.useState(false)


    return <>
        <div className='resource-item-container'>
            <div>
                {['mp4', 'wav', 'avi', 'mp3', 'mkv'].includes(props.file.file.type) ?
                    <p className='resource-item-title'> < i style={{ color: '#a9a958' }} className="fas fa-file-video" ></i>{getName(props.node)}</p>
                    :
                    <p className='resource-item-title'><i style={{ color: '#34ab68' }} className="fas fa-file-image"></i>{getName(props.node)}</p>
                }
                <p className='resource-item-note'>{getNote(props.node)}</p>
            </div>
            <div>
                {['mp4', 'wav', 'avi', 'mp3', 'mkv'].includes(props.file.file.type) ? <>
                    <Link className='resource-item-open' onClick={_ => setVideoCardWindow(true)}>ОТКРЫТЬ</Link>
                </> : <>
                    <Link className='resource-item-open' onClick={_ => setImageCardWindow(true)}>ОТКРЫТЬ</Link>
                </>}
                <button className='resource-item-more'>Подробнее <i className='fas fa-chevron-down'></i></button>
            </div>

        </div>


        {imageCardWindow && <ImageCard onClose={() => setImageCardWindow(false)} file={props.file ? props.file : null} />}
        {videoCardWindow && <VideoCard onClose={() => setVideoCardWindow(false)} file={props.file ? props.file : null} />}
    </>
}