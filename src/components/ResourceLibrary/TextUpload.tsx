import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadDocxFirstTable } from '../../actions/ontology/files/files';
import { TTextParams } from '../../actions/ontology/files/types';
import { connectFileToResource } from '../../actions/ontology/resources/resources';
import { RootStore } from '../../store';
import { makeId } from '../../utils';
import { useOnClickOutside } from '../HandleClickOutside';
import DragAndDrop from '../Ontology/Forms/DragAndDrop';
import TextForm from '../Ontology/Forms/TextForm';

interface ITextUploadProps {
    onClose: () => void,
    object_id: number,
    file_type?: string,
    corpus_id: number
}

const TextUpload: React.FunctionComponent<ITextUploadProps> = (props) => {
    const [newFileSource, setNewFileSource] = React.useState<File>()
    const dispatch = useDispatch()

    const fileState = useSelector((state: RootStore) => state.files)

    const ref = React.useRef()

    useOnClickOutside(ref, props.onClose)

    const [requestId, setRequestId] = React.useState(makeId(10))
    const onUpload = () => {
        dispatch(uploadDocxFirstTable(newFileSource, requestId))
    }


    const [textParams, setTextParams] = React.useState<TTextParams>(null)

    React.useEffect(() => {
        fileState.textFirstTable && fileState.textFirstTable.request_id === requestId && setTextParams(fileState.textFirstTable.params)
    }, [fileState.textFirstTable])
    return <>
        <div className='m-background'>

        </div>
        {!textParams && <>
            <div className='file-upload-window' ref={ref}>
                <input id='file' type="file" name="file" onChange={(e) => { setNewFileSource(e.target.files[0]) }} />
                {/* <DragAndDrop onChange={file => setNewFileSource(file)} /> */}
                <button onClick={onUpload}>ЗАГРУЗИТЬ</button>
            </div>
        </>}
        {textParams && <>
            <div className='text-upload-window' ref={ref}>
                <TextForm in_params={textParams} file={newFileSource} corpus_id={props.corpus_id} />
            </div>
        </>}

    </>;
};

export default TextUpload;
