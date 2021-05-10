import * as React from 'react';
import Authors from './ObjectList';
import { CorpusTree } from './CorpusTree';
import Places from './Places';
import ObjectList from './ObjectList';
import { PERSON_URI, PLACE_URI } from '../../utils';
import Files from './Files';

interface IResourceLibraryProps {
}

const ResourceLibrary: React.FunctionComponent<IResourceLibraryProps> = (props) => {

    const buttons = [
        { name: 'Корпусы', id: 1 },
        { name: 'Авторы', id: 2 },
        { name: 'Места', id: 3 },
        { name: 'Файловое хранилище', id: 4 },
    ]


    const [selectedMode, setSelectedMode] = React.useState(1)


    return <>
        <div className='rl-main'>
            <div className='rl-control-pannel'>
                {buttons.map(b => {
                    return <button style={selectedMode === b.id ? { background: 'black', color: 'white' } : {}} onClick={_ => setSelectedMode(b.id)}>{b.name}</button>
                })}
            </div>
        </div>
        <div className='tl-content'>
            {selectedMode === 1 && <CorpusTree />}
            {selectedMode === 2 && <ObjectList class_uri={PERSON_URI} />}
            {selectedMode === 3 && <ObjectList class_uri={PLACE_URI} />}
            {selectedMode === 4 && <Files />}
        </div>
    </>;
};

export default ResourceLibrary;
