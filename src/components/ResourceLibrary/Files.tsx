import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TFile } from '../../actions/ontology/files/types';
import { RootStore } from '../../store';
import { SERVER_DOMAIN, TEXT_TYPE, IMAGE_TYPE, VIDEO_TYPE, LING_OBJECT_URI, VISUAL_ITEM_URI } from '../../utils';
import { Link } from 'react-router-dom'
import { deleteFile, getFiles, uploadFile } from '../../actions/ontology/files/files';
import ObjectSelector from '../Ontology/Forms/ObjectSelector';
import { TClass } from '../../actions/ontology/classes/types';
interface IFilesProps {
}

const Files: React.FunctionComponent<IFilesProps> = (props) => {
    const dispatch = useDispatch()
    const fileState = useSelector((state: RootStore) => state.files)

    const [files, setFiles] = React.useState<TFile[]>([])
    React.useEffect(() => { setFiles(fileState.files) }, [fileState.files])

    React.useEffect(() => {
        dispatch(getFiles())
    }, [])

    const [newFileSource, setNewFileSource] = React.useState<File>()
    const [newFileName, setNewFileName] = React.useState<string>('')
    const [carrierUri, setCarrierUri] = React.useState('http://erlangen-crm.org/current/[ваш_uri]')
    const [typeUri, setTypeUri] = React.useState(TEXT_TYPE)
    const [selectedResource, setSelectedResource] = React.useState<TClass>(null)

    const onUpload = () => {
        if (newFileSource) {
            dispatch(uploadFile(newFileName, newFileSource, carrierUri, typeUri, selectedResource.id))
        }
    }

    const types = [
        { name: 'Текст', uri: TEXT_TYPE, resource_uri: LING_OBJECT_URI },
        { name: 'Изобр.', uri: IMAGE_TYPE, resource_uri: VISUAL_ITEM_URI },
        { name: 'Видео', uri: VIDEO_TYPE, resource_uri: VISUAL_ITEM_URI },
    ]



    return <>
        <div className='ro-file-input'>
            <input placeholder="Название файла" onChange={(e) => { setNewFileName(e.target.value) }} value={newFileName} />
            <input onChange={(e) => { setCarrierUri(e.target.value) }} value={carrierUri} />
            <select value={typeUri} onChange={e => setTypeUri(e.target.value)}>
                {types.map(t => {
                    return <option key={t.uri} value={t.uri}>{t.name}</option>
                })}
            </select>
            <input id='file' type="file" name="file" onChange={(e) => { setNewFileSource(e.target.files[0]) }} />
            <label>Ресурс:</label>
            <ObjectSelector
                uri={types.find(t => t.uri === typeUri).resource_uri}
                default={selectedResource}
                onSelect={obj => setSelectedResource(obj)} />
            <button onClick={onUpload}>Загрузить</button>
        </div>
        <div className='ro-file-list'>
            {files.map(file => {
                return <>
                    <div className='ro-file-card'>
                        <label>Название</label>
                        <p>{file.name}</p>
                        <label>Файл</label>
                        <a href={SERVER_DOMAIN + file.source.substring(1)} target='_blank'>Скачать</a>
                        <button id='delete' onClick={_ => dispatch(deleteFile(file.id))}><i className='fas fa-trash'></i></button>
                    </div>
                </>
            })}
        </div>
    </>;
};

export default Files;
