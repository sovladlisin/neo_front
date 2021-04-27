import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from '../../actions/ontology/classes/classes';
import { TClass } from '../../actions/ontology/classes/types';

import { RootStore } from '../../store';
import ClassBlock from './ClassBlock';
import ClassInfo from './ClassInfo';
import ObjectInfo from './ObjectInfo';

interface IOntologyWSProps {
}

const OntologyWS: React.FunctionComponent<IOntologyWSProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)

    React.useEffect(() => {
        dispatch(getClasses())
    }, [])

    const [selectedClass, setSelectedClass] = React.useState<TClass>(null)
    const [selectedObject, setSelectedObject] = React.useState<number>(-1)

    return <>
        <div className='ontology'>
            <div className='og-left'>
                {classState.parentClasses.map(c => {
                    return <ClassBlock onSelect={sc => setSelectedClass(sc)} class={c} />
                })}
            </div>
            <div className='og-right'>
                {selectedClass && <ClassInfo onObjectSelect={co => setSelectedObject(co)} class={selectedClass} />}
            </div>
        </div>
        {selectedObject != -1 && <ObjectInfo object_id={selectedObject} onClose={() => setSelectedObject(-1)} />}
    </>;
};

export default OntologyWS;
