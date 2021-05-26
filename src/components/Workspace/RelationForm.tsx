import * as React from 'react';
import { useDispatch } from 'react-redux';
import { TEntity, TTextRelation } from '../../actions/workspace/types';
import { createTextRelation } from '../../actions/workspace/workspace';
import { CLASS, getName, NAMED_IND } from '../../utils';

interface IRelationFormProps {
    markup_id: number,
    onClose: () => void
}

type TLocalTextRelation = { start: TEntity, end: TEntity, connection: TEntity, markup: number }

const RelationForm: React.FunctionComponent<IRelationFormProps> = (props) => {
    const dispatch = useDispatch()
    const [newTextRelation, setNewTextRelation] = React.useState<TLocalTextRelation>({ start: null, end: null, connection: null, markup: props.markup_id })

    const getType = (labels: string[]) => {
        if (labels.includes(NAMED_IND)) return 0
        if (labels.includes(CLASS)) return 1
        return 2
    }

    const addEntity = (e, pos) => {
        e.preventDefault()
        const entity: TEntity = JSON.parse(e.dataTransfer.getData("entity"))
        if (pos === 1) setNewTextRelation({ ...newTextRelation, start: entity })
        if (pos === 2) setNewTextRelation({ ...newTextRelation, connection: entity })
        if (pos === 3) setNewTextRelation({ ...newTextRelation, end: entity })
    }
    const label_background = {
        0: '#25ca75',
        1: '#25c2ca',
        2: '#e670ce',
    }

    const onSave = () => {
        const new_rel: TTextRelation = {
            start: newTextRelation.start.id,
            end: newTextRelation.end.id,
            connection: newTextRelation.connection.id,
            markup: newTextRelation.markup,
        }
        dispatch(createTextRelation(new_rel))
        props.onClose()
    }

    return <>
        <div className='ws-relation-window'>
            <div
                className='ws-relation-window-placeholder'
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => addEntity(e, 1)}
            >
                {newTextRelation.start ? <>
                    <div className='ws-relation-window-entity' >
                        <p className='ws-relation-window-entity-title' style={{ background: label_background[getType(newTextRelation.start.node.labels)] }}>
                            {getName(newTextRelation.start.node)}
                        </p>
                        <div className='ws-relation-window-entity-pos'>
                            {newTextRelation.start.pos_start} - {newTextRelation.start.pos_end}
                        </div>
                    </div>
                </> : <span>Первый элемент связи</span>}
            </div>
            <div
                className='ws-relation-window-placeholder'
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => addEntity(e, 2)}
            >
                {newTextRelation.connection ? <>
                    <div className='ws-relation-window-entity' >
                        <p className='ws-relation-window-entity-title' style={{ background: label_background[getType(newTextRelation.connection.node.labels)] }}>
                            {getName(newTextRelation.connection.node)}
                        </p>
                        <div className='ws-relation-window-entity-pos'>
                            {newTextRelation.connection.pos_start} - {newTextRelation.connection.pos_end}
                        </div>
                    </div>
                </> : <span>Связь</span>}
            </div>
            <div
                className='ws-relation-window-placeholder'
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => addEntity(e, 3)}
            >
                {newTextRelation.end ? <>
                    <div className='ws-relation-window-entity' >
                        <p className='ws-relation-window-entity-title' style={{ background: label_background[getType(newTextRelation.end.node.labels)] }} >
                            {getName(newTextRelation.end.node)}
                        </p>
                        <div className='ws-relation-window-entity-pos'>
                            {newTextRelation.end.pos_start} - {newTextRelation.end.pos_end}
                        </div>
                    </div>
                </> : <span>Второй элемент связи</span>}
            </div>
            <button onClick={onSave}>Создать связь</button>
        </div>
    </>
};

export default RelationForm;
