import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TFile } from '../../actions/ontology/files/types';
import { RootStore } from '../../store';
import { SERVER_DOMAIN } from '../../utils';
import { Link } from 'react-router-dom'
import { deleteFile, getFiles, uploadFile } from '../../actions/ontology/files/files';
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

    const onUpload = () => {
        if (newFileSource) {
            dispatch(uploadFile(newFileName, newFileSource))
        }
    }

    return <>
        <div className='ro-file-input'>
            <input placeholder="Название файла" onChange={(e) => { setNewFileName(e.target.value) }} value={newFileName} />
            <input id='file' type="file" name="file" onChange={(e) => { setNewFileSource(e.target.files[0]) }} />
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
