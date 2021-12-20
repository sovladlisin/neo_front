import * as React from 'react';
import { getRandomInt } from '../../../utils';

export type TLangInputType = { id: number, val: string, type: string }

interface ILangStringInputProps {
    value: TLangInputType[],
    onChange: (val: TLangInputType[]) => void
}

const LangStringInput: React.FunctionComponent<ILangStringInputProps> = (props) => {

    const [val, setVal] = React.useState<TLangInputType[]>(props.value)

    const onChange = (value: string, new_i: TLangInputType) => {
        setVal(val.map(i => i.id === new_i.id ? { ...i, val: value } : i))
    }
    const onChangeType = (value: string, new_i: TLangInputType) => {
        setVal(val.map(i => i.id === new_i.id ? { ...i, type: value } : i))
    }
    const onAdd = () => {
        setVal([...val, { type: types[0], id: getRandomInt(0, 1000), val: 'Метка' }])
    }
    React.useEffect(() => {
        props.onChange(val)
    }, [val])

    const types = ['@ru', '@en']


    return <>
        <div className='lang-input-container'>
            <button onClick={onAdd}><i className='fas fa-plus'></i></button>
            <div>
                {val.map(i => {
                    return <div className='lang-input-input-container'>
                        <input value={i.val} onChange={e => onChange(e.target.value, i)}></input>
                        <select value={i.type} onChange={e => onChangeType(e.target.value, i)} >
                            {types.map(t => {
                                return <option value={t}>{t}</option>
                            })}
                        </select>
                        <button className='lang-input-input-delete' onClick={_ => setVal(val.filter(s => s.id != i.id))}><i className='fas fa-times'></i></button>
                    </div>
                })}
            </div>
        </div>
    </>;
};

export default LangStringInput;
