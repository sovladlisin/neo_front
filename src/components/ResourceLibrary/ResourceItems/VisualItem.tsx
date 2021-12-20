import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { node } from 'webpack';
import { Link } from 'react-router-dom'
import { TClass, TConnectedVisualItem } from '../../../actions/ontology/classes/types';
import { getName, getNote } from '../../../utils';
import ImageCard from '../../Workspace/ImageCard'
interface IVisualItemProps {
    node: TClass
    file?: TConnectedVisualItem
}
export const VisualItem: React.FunctionComponent<IVisualItemProps> = (props) => {

    const [imageCardWindow, setImageCardWindow] = React.useState(false)
    return <>
        <div className='resource-item-container'>
            <div>
                <p className='resource-item-title'>{getName(props.node)}</p>
                <p className='resource-item-note'>{getNote(props.node)}</p>
            </div>
            <div>
                <Link className='resource-item-open' onClick={_ => setImageCardWindow(true)}>ОТКРЫТЬ</Link>
                <button className='resource-item-more'>Подробнее <i className='fas fa-chevron-down'></i></button>
            </div>

        </div>


        {imageCardWindow && <ImageCard onClose={() => setImageCardWindow(false)} file={props.file ? props.file : null} />}
    </>
}