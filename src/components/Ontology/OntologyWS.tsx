import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addClassAttr, getClasses } from '../../actions/ontology/classes/classes';
import { TClass } from '../../actions/ontology/classes/types';

import { RootStore } from '../../store';
import ClassBlock from './ClassBlock';
import ClassInfo from './ClassInfo';
import ObjectForm from './Forms/ObjectForm';
import ObjectInfo from './ObjectInfo';

interface IOntologyWSProps {
}

const OntologyWS: React.FunctionComponent<IOntologyWSProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)

    // windows
    const [objectAddWindow, setObjectAddWindow] = React.useState(false)

    React.useEffect(() => {
        dispatch(getClasses())
    }, [])

    const [selectedClass, setSelectedClass] = React.useState<TClass>(null)
    const [selectedObject, setSelectedObject] = React.useState<number>(-1)
    const [selectedClassForObjectAdd, setSelectedClassForObjectAdd] = React.useState(-1)

    React.useEffect(() => {
        dispatch(addClassAttr())
    }, [])

    return <>
        <div className='ontology'>
            <div className='og-left'>
                {classState.parentClasses.map(c => {
                    return <ClassBlock onSelect={sc => setSelectedClass(sc)} class={c} />
                })}
            </div>
            <div className='og-right'>
                {selectedClass && <ClassInfo onObjectAdd={(class_id: number) => { setObjectAddWindow(true); setSelectedClassForObjectAdd(class_id) }} onObjectSelect={co => setSelectedObject(co)} class_id={selectedClass.id} />}
            </div>
        </div>
        {selectedObject != -1 && <ObjectInfo onSelect={id => setSelectedObject(id)} object_id={selectedObject} onClose={() => setSelectedObject(-1)} />}

        {objectAddWindow && <ObjectForm class_id={selectedClassForObjectAdd} onClose={() => setObjectAddWindow(false)} />}
    </>;
};

export default OntologyWS;
