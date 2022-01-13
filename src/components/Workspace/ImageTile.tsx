import * as React from 'react';
import { TConnectedVisualItem } from '../../actions/ontology/classes/types';
import { getName, SERVER_DOMAIN, SERVER_URL } from '../../utils';
import { Link } from 'react-router-dom'
import { useOnClickOutside } from '../HandleClickOutside';
import ImageCard from './ImageCard';

interface IImageTileProps {
    file: TConnectedVisualItem
}

const ImageTile: React.FunctionComponent<IImageTileProps> = (props) => {



    const [cardWindow, setCardWindow] = React.useState(false)
    const ref = React.useRef()
    useOnClickOutside(ref, () => setCardWindow(false))
    return <>
        {props.file && <>
            <div className='image-carrier' onClick={_ => setCardWindow(true)}>
                <img src={SERVER_DOMAIN.slice(0, -1) + props.file.file.source}></img>
                <p>{getName(props.file.node)}</p>
            </div>

            {cardWindow && <>
                <ImageCard file={props.file} onClose={() => setCardWindow(false)} />
            </>}
        </>}
    </>;
};

export default ImageTile;
