import * as React from 'react';
import Authors from './ObjectList';
import { CorpusTree } from './CorpusTree';
import Places from './Places';
import ObjectList from './ObjectList';
import { CORPUS_URI, DIGITAL_CARRIER_URI, LING_OBJECT_URI, PERSON_URI, PLACE_URI, VISUAL_ITEM_URI } from '../../utils';
import Files from './Files';
import ObjectForm from '../Ontology/Forms/ObjectForm';
import SearchForm from '../Ontology/Forms/SearchForm';
import ObjectInfo from '../Ontology/ObjectInfo';

interface IResourceLibraryProps {
}

const ResourceLibrary: React.FunctionComponent<IResourceLibraryProps> = (props) => {

    const buttons = [
        { name: 'Корпусы', id: 1 },
        { name: 'Авторы', id: 2 },
        { name: 'Места', id: 3 },
        { name: 'Файловое хранилище', id: 4 },
        { name: 'Тексты', id: 5 },
        { name: 'Файлы онтологии', id: 6 },
        { name: 'Мультимедия', id: 7 },
    ]

    const [searchIndexWindow, setSearchIndexWindow] = React.useState(false)


    const uris = {
        1: CORPUS_URI,
        2: PERSON_URI,
        3: PLACE_URI,
        5: LING_OBJECT_URI,
        6: DIGITAL_CARRIER_URI,
        7: VISUAL_ITEM_URI

    }

    const [selectedMode, setSelectedMode] = React.useState(1)
    const [objectAddWindow, setObjectAddWindow] = React.useState(false)
    const [selectedItem, setSelectedItem] = React.useState(-1)

    return <>
        <div className='rl-main'>
            <div className='rl-control-pannel'>
                {buttons.map(b => {
                    return <button style={selectedMode === b.id ? { background: '#252854', color: 'white' } : {}} onClick={_ => setSelectedMode(b.id)}>{b.name}</button>
                })}
                <button className='rl-control-pannel-search' onClick={_ => setSearchIndexWindow(true)}><i className='fas fa-search'></i></button>
            </div>
            <div className='rl-add-obj'>
                {selectedMode != 4 && <button onClick={_ => setObjectAddWindow(true)}>Добавить экземпляр<i className='fas fa-plus'></i></button>}
            </div>
            <div className='tl-content'>
                {selectedMode === 1 && <CorpusTree />}
                {selectedMode === 2 && <ObjectList class_uri={PERSON_URI} />}
                {selectedMode === 3 && <ObjectList class_uri={PLACE_URI} />}
                {selectedMode === 4 && <Files />}
                {selectedMode === 5 && <ObjectList class_uri={LING_OBJECT_URI} />}
                {selectedMode === 6 && <ObjectList class_uri={DIGITAL_CARRIER_URI} />}
                {selectedMode === 7 && <ObjectList class_uri={VISUAL_ITEM_URI} />}
            </div>
        </div>

        {objectAddWindow && <ObjectForm domain={'Resource'} class_uri={uris[selectedMode]} onClose={() => setObjectAddWindow(false)} />}
        {searchIndexWindow && <SearchForm domain={'Resource'} onClose={() => setSearchIndexWindow(false)} onObjectSelect={co => setSelectedItem(co)}  ></SearchForm>}
        {selectedItem != -1 && <ObjectInfo onSelect={id => setSelectedItem(id)} object_id={selectedItem} onClose={() => setSelectedItem(-1)} />}

    </>;
};

export default ResourceLibrary;
