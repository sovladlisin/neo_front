import { readFile } from 'fs';
import * as React from 'react';
import { TClass, TConnectedVisualItem } from '../../actions/ontology/classes/types';
import FileUploadToObject from '../ResourceLibrary/FileUploadToObject';
import ImageTile from './ImageTile';

interface ITextResourceListProps {
    object_id: number,
    resources: TConnectedVisualItem[]
}

const TextResourceList: React.FunctionComponent<ITextResourceListProps> = (props) => {

    const [fileUploadWindow, setFileUploadWindow] = React.useState(false)

    const [imageList, setImageList] = React.useState<TConnectedVisualItem[]>([])
    const [videoList, setVideoList] = React.useState<TConnectedVisualItem[]>([])
    const [audioList, setAudioList] = React.useState<TConnectedVisualItem[]>([])
    React.useEffect(() => {
        if (!props.resources) return;
        setImageList(props.resources.filter(r => ['png', 'jpg', 'jpeg', 'pdf'].includes(r.file.type)))
        setVideoList(props.resources.filter(r => ['mp4', 'avi', 'mkv'].includes(r.file.type)))
        setAudioList(props.resources.filter(r => ['wav', 'mp4'].includes(r.file.type)))
    }, [, props.resources])


    return <>
        <div className='sub-page-container'>
            <p className='sub-page-title'>Аудио {audioList.length} <button onClick={_ => setFileUploadWindow(true)}><i className='fas fa-plus'></i></button></p>
            <p className='sub-page-title'>Видео {videoList.length} <button onClick={_ => setFileUploadWindow(true)}><i className='fas fa-plus'></i></button></p>
            <p className='sub-page-title'>Изображения {imageList.length} <button onClick={_ => setFileUploadWindow(true)}><i className='fas fa-plus'></i></button></p>
            <div className='text-resource-items-list'>
                {imageList.map(i => {
                    return <ImageTile file={i} />
                })}
            </div>
        </div>

        {fileUploadWindow && <FileUploadToObject onClose={() => setFileUploadWindow(false)} object_id={props.object_id} />}
    </>;
};

export default TextResourceList;
