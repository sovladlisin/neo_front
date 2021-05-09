import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassObjects, getSubClasses } from '../../actions/ontology/classes/classes';
import { TClass } from '../../actions/ontology/classes/types';

import { RootStore } from '../../store';
import { getName } from '../../utils';

interface IClassBlockProps {
    class: TClass,
    onSelect: (sc: TClass) => void
}

const ClassBlock: React.FunctionComponent<IClassBlockProps> = (props) => {
    const dispatch = useDispatch()
    const classState = useSelector((state: RootStore) => state.classes)

    //on SubClass info update
    const [subClasses, setSubClasses] = React.useState<TClass[]>([])
    React.useEffect(() => {
        const data = classState.selectedSubClasses
        data.id === currentClass.id && setSubClasses(data.classes)
    }, [, classState.selectedSubClasses])
    React.useEffect(() => {
        if (subClasses.find(co => co.id === classState.updatedClass.id)) {
            setSubClasses(subClasses.map(sc => sc.id === classState.updatedClass.id ? classState.updatedClass : sc))
        }
    }, [classState.updatedClass])

    const [currentClass, setCurrentClass] = React.useState(props.class)
    React.useEffect(() => setCurrentClass(props.class), [props.class])

    const [isOpened, setIsOpened] = React.useState(false)

    const onClick = () => {
        subClasses.length === 0 && dispatch(getSubClasses(currentClass.id))
        setIsOpened(!isOpened)
        props.onSelect(currentClass)
    }
    return <div className='og-class-block' >
        <div onClick={onClick} className='og-class-title' style={isOpened && subClasses.length != 0 ? { background: 'grey' } : {}}>
            <p>{getName(currentClass)}</p>
        </div>
        {isOpened && <div className='og-class-subblock'>
            {subClasses.map(sc => {
                return <ClassBlock onSelect={props.onSelect} class={sc} />
            })}
        </div>}
    </div>;
};

export default ClassBlock;
