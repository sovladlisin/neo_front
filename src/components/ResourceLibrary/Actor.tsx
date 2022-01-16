import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassObject } from '../../actions/ontology/classes/classes';
import { TObjectExtended } from '../../actions/ontology/classes/types';
import { RootStore } from '../../store';
import { RouteComponentProps } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loading from '../Loading';
import { ACCOUNT_1, getActorName, getImage, getImageFile, NOTE_URI } from '../../utils';
import FileUploadToObject from './FileUploadToObject';
import ImageCard from '../Workspace/ImageCard';
import ObjectInfo from '../Ontology/ObjectInfo';
interface IActorProps {
    id: number
}
const Actor: React.FunctionComponent<IActorProps> = ({ match }: RouteComponentProps<IActorProps>) => {
    const current_id: number = parseInt(match.params.id)

    const dispatch = useDispatch()

    React.useEffect(() => { dispatch(getClassObject(current_id)) }, [])
    const classState = useSelector((state: RootStore) => state.classes)
    const [currentObject, setCurrentObject] = React.useState<TObjectExtended>(null)

    React.useEffect(() => {
        var new_obj = classState.selectedObject
        if (new_obj && current_id === new_obj.id) {
            setCurrentObject(new_obj)
        }
    }, [classState.selectedObject])

    const [fileUploadWindow, setFileUploadWindow] = React.useState(false)

    const [imageCard, setImageCard] = React.useState(false)

    const [selectedItem, setSelectedItem] = React.useState(-1)
    const authState = useSelector((state: RootStore) => state.auth)


    return <>
        {currentObject && <>
            <div className='sub-page-container'>
                <Link to='/actors' className='workspace-return'><i className='fas fa-long-arrow-alt-left'></i>Обратно к списку</Link>
                <p className='actor-page-title'>{getActorName(currentObject.object)} </p>
                {authState.user.is_editor && <>
                    <div className='actor-admin-buttons'>
                        <button onClick={_ => setFileUploadWindow(true)}><i className='fas fa-plus'></i></button>
                        <button onClick={_ => setSelectedItem(current_id)} ><i className='fas fa-cog'></i></button>
                    </div>
                </>}
                <div className='actor-page-meta'>
                    <img onClick={_ => getImage(currentObject) != ACCOUNT_1 && setImageCard(true)} src={getImage(currentObject)}></img>
                    <p>{currentObject.object[NOTE_URI] ? currentObject.object[NOTE_URI] : 'Описание отсутсвует'}</p>
                </div>
                <div className='actor-connected-resources'>
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
        {!currentObject && <Loading height={500} />}
        {fileUploadWindow && <FileUploadToObject onClose={() => setFileUploadWindow(false)} object_id={current_id} />}
        {imageCard && <ImageCard onClose={() => setImageCard(false)} file={getImageFile(currentObject)} />}
        {selectedItem != -1 && <ObjectInfo onSelect={id => setSelectedItem(id)} object_id={selectedItem} onClose={() => setSelectedItem(-1)} />}

    </>;
}


export default Actor;
