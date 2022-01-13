import * as React from 'react';

interface IDragAndDropProps {
    onChange: (file: File) => void
}

const DragAndDrop: React.FunctionComponent<IDragAndDropProps> = (props) => {

    const [drag, setDrag] = React.useState(false)
    const dropRef = React.createRef()
    const [file, setFile] = React.useState<File>()

    React.useEffect(() => { props.onChange(file) }, [file])

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0])
            e.dataTransfer.clearData()
        }
    }
    const onDragOver = (e) => {
        e.preventDefault()


    }

    const prevent = (e) => {
        e.preventDefault()
        e.stopPropagation()

    }


    return <>
        <div className='drag'
            onDrop={handleDrop}
            onDrag={prevent}
            onDragStart={prevent}
            onDragEnd={prevent}
            onDragOver={onDragOver}
            onDragEnter={prevent}
            onDragLeave={prevent}
        ></div>
    </>




};

export default DragAndDrop;
