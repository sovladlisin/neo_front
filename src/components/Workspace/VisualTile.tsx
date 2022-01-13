import * as React from 'react';
import { TConnectedVisualItem } from '../../actions/ontology/classes/types';
import { ACCOUNT_1, getName, SERVER_DOMAIN } from '../../utils';
import VideoCard from '../ResourceLibrary/ResourceItems/VideoCard';

interface IVisualTileProps {
    file: TConnectedVisualItem
}

const VisualTile: React.FunctionComponent<IVisualTileProps> = (props) => {
    const [videoCardWindow, setVideoCardWindow] = React.useState(false)

    return <>
        <div className='image-carrier' onClick={_ => setVideoCardWindow(true)}>
            <img src={ACCOUNT_1}></img>
            <p>{getName(props.file.node)}</p>
        </div>

        {videoCardWindow && <VideoCard onClose={() => setVideoCardWindow(false)} file={props.file ? props.file : null} />}
    </>;
};

export default VisualTile;
