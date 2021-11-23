import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassObjects, getSubClasses } from '../../actions/ontology/classes/classes';
import { TClass } from '../../actions/ontology/classes/types';

import { RootStore } from '../../store';
import { getName } from '../../utils';

interface IClassBlockProps {
    class: TClass,
    selectedClass: number,
    onSelect: (sc: number) => void,
    onAddChild: (cl: TClass) => void
}

const ClassBlock: React.FunctionComponent<IClassBlockProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)

    const [currentClass, setCurrentClass] = React.useState(props.class)
    React.useEffect(() => setCurrentClass(props.class), [props.class])

    //on SubClass info update
    const [subClasses, setSubClasses] = React.useState<TClass[]>([])
    React.useEffect(() => { dispatch(getSubClasses(currentClass.id)) }, [currentClass])
    React.useEffect(() => {
        const data = classState.selectedSubClasses
        data.id === currentClass.id && setSubClasses(data.classes)
    }, [, classState.selectedSubClasses])
    React.useEffect(() => {
        if (subClasses.find(co => co.id === classState.updatedClass.id)) {
            setSubClasses(subClasses.map(sc => sc.id === classState.updatedClass.id ? classState.updatedClass : sc))
        }
    }, [classState.updatedClass])



    const [isOpened, setIsOpened] = React.useState(false)

    const onClick = () => {
        subClasses.length === 0 && dispatch(getSubClasses(currentClass.id))
        setIsOpened(!isOpened)
    }
    const onExpand = () => {
        props.onSelect(currentClass.id)
    }
    const onAdd = () => {
        props.onAddChild(currentClass)
    }

    return <div className='og-class-block' >
        <div className='og-class-title' style={props.selectedClass === currentClass.id ? { background: '#f1eee8' } : {}}>
            <p onClick={onClick}>{isOpened && subClasses.length != 0 && <div className='opened-indicator'><i className="fas fa-arrow-down"></i></div>} {getName(currentClass)}</p>
            <button id='open' onClick={onExpand}><i className="fas fa-pen-square"></i></button>
            <button id='open' onClick={onAdd}><i className='fas fa-plus'></i></button>
        </div>
        {isOpened && <div className='og-class-subblock'>
            {subClasses.map(sc => {
                return <ClassBlock selectedClass={props.selectedClass} onAddChild={props.onAddChild} onSelect={props.onSelect} class={sc} />
            })}
        </div>}
    </div>;
};

export default ClassBlock;
