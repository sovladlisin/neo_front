import * as React from 'react';
import { TConnectedVisualItem } from '../../actions/ontology/classes/types';
import { SERVER_DOMAIN, SERVER_URL } from '../../utils';
import { Link } from 'react-router-dom'
import { useOnClickOutside } from '../HandleClickOutside';
import ImageCard from './ImageCard';

interface IImageTileProps {
    file: TConnectedVisualItem
}

const ImageTile: React.FunctionComponent<IImageTileProps> = (props) => {

    const getName = () => {
        console.log(props.file)
        if (props.file.node.params.includes('name')) return props.file.node['name']
        return 'Не указано'
    }

    const [cardWindow, setCardWindow] = React.useState(false)
    const ref = React.useRef()
    useOnClickOutside(ref, () => setCardWindow(false))
    return <>
        {props.file && <>
            <div className='image-carrier' onClick={_ => setCardWindow(true)}>
                <img src={SERVER_DOMAIN.slice(0, -1) + props.file.file.source}></img>
                <p>{getName()}</p>
            </div>

            {cardWindow && <>
                <ImageCard file={props.file} onClose={() => setCardWindow(false)} />
            </>}
        </>}
    </>;
};

export default ImageTile;
