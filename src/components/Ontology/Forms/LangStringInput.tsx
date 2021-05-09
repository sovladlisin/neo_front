import * as React from 'react';

interface ILangStringInputProps {
    value: string[],
    onChange: (val: string[]) => void
}

const LangStringInput: React.FunctionComponent<ILangStringInputProps> = (props) => {

    const [val, setVal] = React.useState(props.value)

    const onChange = (val: string) => {
        setVal(val.split(','))
        props.onChange(val.split(','))
    }

    return <>
        <input value={val} placeholder='Языковая строка' onChange={e => onChange(e.target.value)}></input>
    </>;
};

export default LangStringInput;
