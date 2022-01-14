import { readFile } from 'fs';
import * as React from 'react';
import { TClass, TConnectedVisualItem } from '../../actions/ontology/classes/types';
import FileUploadToObject from '../ResourceLibrary/FileUploadToObject';
import ImageTile from './ImageTile';
import VisualTile from './VisualTile';

interface ITextResourceListProps {
    object_id: number,
    resources: TConnectedVisualItem[]
}

const TextResourceList: React.FunctionComponent<ITextResourceListProps> = (props) => {

    const [fileUploadWindow, setFileUploadWindow] = React.useState(null)

    const [imageList, setImageList] = React.useState<TConnectedVisualItem[]>([])
    const [videoList, setVideoList] = React.useState<TConnectedVisualItem[]>([])
    const [audioList, setAudioList] = React.useState<TConnectedVisualItem[]>([])
    const [notesList, setNotesList] = React.useState<TConnectedVisualItem[]>([])
    React.useEffect(() => {
        if (!props.resources) return;

        const temp_images = props.resources.filter(r => ['png', 'jpg', 'jpeg'].includes(r.file.type))

        const notes = temp_images.filter(t => t.node['res_type'] === 'note')
        const images = temp_images.filter(t => t.node['res_type'] === 'image')

        setImageList(images)
        setNotesList(notes)



        setVideoList(props.resources.filter(r => ['mp4', 'avi', 'mkv'].includes(r.file.type)))
        setAudioList(props.resources.filter(r => ['mp3'].includes(r.file.type)))
    }, [, props.resources])


    return <>
        <div className='sub-page-container'>
            <p className='sub-page-title'>Аудио {audioList.length} <button onClick={_ => setFileUploadWindow('audio')}><i className='fas fa-plus'></i></button></p>
            <div className='text-resource-items-list'>
                {audioList.map(i => {
                    return <VisualTile file={i} />
                })}
            </div>
            <p className='sub-page-title'>Видео {videoList.length} <button onClick={_ => setFileUploadWindow('video')}><i className='fas fa-plus'></i></button></p>
            <div className='text-resource-items-list'>
                {videoList.map(i => {
                    return <VisualTile file={i} />
                })}
            </div>
            <p className='sub-page-title'>Изображения {imageList.length} <button onClick={_ => setFileUploadWindow('image')}><i className='fas fa-plus'></i></button></p>
            <div className='text-resource-items-list'>
                {imageList.map(i => {
                    return <ImageTile file={i} />
                })}
            </div>
            <p className='sub-page-title'>Ноты {notesList.length} <button onClick={_ => setFileUploadWindow('note')}><i className='fas fa-plus'></i></button></p>
            <div className='text-resource-items-list'>
                {notesList.map(i => {
                    return <ImageTile file={i} />
                })}
            </div>
        </div>

        {fileUploadWindow && <FileUploadToObject connect_type='text' onClose={() => setFileUploadWindow(null)} object_id={props.object_id} res_type={fileUploadWindow} />}
    </>;
};

export default TextResourceList;
