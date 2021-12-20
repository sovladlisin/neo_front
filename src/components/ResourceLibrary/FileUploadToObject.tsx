import * as React from 'react';
import { useDispatch } from 'react-redux';
import { connectFileToResource } from '../../actions/ontology/resources/resources';
import { useOnClickOutside } from '../HandleClickOutside';

interface IFileUploadToObjectProps {
    onClose: () => void,
    object_id: number,
    file_type?: string
}

const FileUploadToObject: React.FunctionComponent<IFileUploadToObjectProps> = (props) => {
    const [newFileSource, setNewFileSource] = React.useState<File>()
    const dispatch = useDispatch()
    const ref = React.useRef()

    const [name, setName] = React.useState('')
    const [note, setNote] = React.useState('')
    const [fileType, setFileType] = React.useState(props.file_type || 'mp4')
    useOnClickOutside(ref, props.onClose)
    const onUpload = () => {
        dispatch(connectFileToResource(name, fileType, props.object_id, newFileSource, note))
    }
    React.useEffect(() => {
        newFileSource && setFileType(newFileSource.name.split('.').pop())
    }, [newFileSource])
    return <>
        <div className='m-background'>

        </div>
        <div className='file-upload-window' ref={ref}>
            <input placeholder='Название файла' onChange={e => setName(e.target.value)} value={name}></input>
            <textarea placeholder='Описание...' onChange={e => setNote(e.target.value)} value={note}></textarea>
            <input id='file' type="file" name="file" onChange={(e) => { setNewFileSource(e.target.files[0]) }} />
            <button onClick={onUpload}>ЗАГРУЗИТЬ</button>
        </div>

    </>;
};

export default FileUploadToObject;
