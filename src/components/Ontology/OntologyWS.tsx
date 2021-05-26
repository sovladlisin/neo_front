import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addClassAttr, deleteOntology, getClasses, updateIndex } from '../../actions/ontology/classes/classes';
import { TClass } from '../../actions/ontology/classes/types';

import { RootStore } from '../../store';
import ClassBlock from './ClassBlock';
import ClassInfo from './ClassInfo';
import ClassForm from './Forms/ClassForm';
import ObjectForm from './Forms/ObjectForm';
import IndexForm from './Forms/ConformationForm';
import ObjectInfo from './ObjectInfo';
import SearchForm from './Forms/SearchForm';
import ConformationForm from './Forms/ConformationForm';

interface IOntologyWSProps {
    domain: string
}

const OntologyWS: React.FunctionComponent<IOntologyWSProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)

    // windows
    const [objectAddWindow, setObjectAddWindow] = React.useState(false)
    const [classAddWindow, setClassAddWindow] = React.useState(false)
    const [updateIndexWindow, setUpdateIndexWindow] = React.useState(false)
    const [searchIndexWindow, setSearchIndexWindow] = React.useState(false)
    const [deleteOntologyWindow, setDeleteOntologyWindow] = React.useState(false)

    React.useEffect(() => {
        dispatch(getClasses(props.domain))
    }, [])

    const [selectedClass, setSelectedClass] = React.useState<TClass>(null)
    const [selectedObject, setSelectedObject] = React.useState<number>(-1)
    const [selectedClassForObjectAdd, setSelectedClassForObjectAdd] = React.useState('')

    const [selectedParent, setSelectedParent] = React.useState<TClass>(null)

    React.useEffect(() => {
        // dispatch(addClassAttr())
    }, [])

    return <>
        <div className='ontology-space'>
            <button className='ontology-add-class' onClick={_ => setClassAddWindow(true)}>Добавить класс<i className='fas fa-plus'></i></button>
            {props.domain != 'Resource' && <>
                <button className='ontology-search-index' onClick={_ => setSearchIndexWindow(true)}>Поиск <i className='fas fa-search'></i></button>
                <button className='ontology-refresh-index' onClick={_ => setUpdateIndexWindow(true)}>Обновить индекс</button>
                <button className='ontology-delete' onClick={_ => setDeleteOntologyWindow(true)}>Удалить онтологию</button>
            </>}

            <div className='ontology'>
                <div className='og-left'>
                    {classState.parentClasses && classState.parentClasses.map(c => {
                        return <ClassBlock selectedClass={selectedClass ? selectedClass.id : -1} onAddChild={cl => { setSelectedParent(cl); setClassAddWindow(true) }} onSelect={sc => setSelectedClass(sc)} class={c} />
                    })}
                </div>
                <div className='og-right'>
                    {selectedClass && <ClassInfo domain={props.domain} onObjectAdd={(class_uri: string) => { setObjectAddWindow(true); setSelectedClassForObjectAdd(class_uri) }} onObjectSelect={co => setSelectedObject(co)} class_id={selectedClass.id} />}
                </div>
            </div>
        </div>

        {selectedObject != -1 && <ObjectInfo onSelect={id => setSelectedObject(id)} object_id={selectedObject} onClose={() => setSelectedObject(-1)} />}
        {updateIndexWindow && <ConformationForm onConfirm={() => dispatch(updateIndex(props.domain))} message={'Вы уверены, что хотите обновить индекс?'} onClose={() => setUpdateIndexWindow(false)}></ConformationForm>}
        {searchIndexWindow && <SearchForm domain={props.domain} onClose={() => setSearchIndexWindow(false)} onObjectSelect={co => setSelectedObject(co)}  ></SearchForm>}

        {objectAddWindow && <ObjectForm domain={props.domain} class_uri={selectedClassForObjectAdd} onClose={() => setObjectAddWindow(false)} />}
        {classAddWindow && <ClassForm domain={props.domain} parent={selectedParent} onClose={() => { setSelectedParent(null); setClassAddWindow(false) }}></ClassForm>}

        {deleteOntologyWindow && <ConformationForm onConfirm={() => dispatch(deleteOntology(props.domain))} message={'Вы уверены, что хотите удалить онтологию?'} onClose={() => setDeleteOntologyWindow(false)}></ConformationForm>}
    </>;
};

export default OntologyWS;
