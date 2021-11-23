import * as React from 'react';
import { useOnClickOutside } from '../HandleClickOutside';


export type TComment = {
    position: number,
    text: string,
}

interface ICommentaryInfoProps {
    comment: TComment,
    onClose: () => void,
    onSave: (comm: TComment) => void
}

const CommentaryInfo: React.FunctionComponent<ICommentaryInfoProps> = (props) => {
    const [text, setText] = React.useState(props.comment.text)

    const ref = React.useRef()

    useOnClickOutside(ref, () => {
        props.onClose()
    })

    const save = () => {
        const comm: TComment = {
            position: props.comment.position,
            text: text
        }
        props.onSave(comm)
    }
    return <>
        <div className='commentary-window' ref={ref}>
            <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <button onClick={save}>{props.comment.text.length > 1 ? 'Изменить комментарий' : 'Добавить комментарий'}</button>
        </div>
        <span className='decorative-comment-arrow'></span>
    </>;
};

export default CommentaryInfo;