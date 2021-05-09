import * as React from 'react';
import { DATA_TYPES, TDataType } from '../../utils';

interface ITypeSelectProps {
    onSelect: (val: TDataType) => void,
    default: TDataType
}

const TypeSelect: React.FunctionComponent<ITypeSelectProps> = (props) => {

    const types = DATA_TYPES

    const [value, setValue] = React.useState<TDataType>(props.default ? props.default : types[0])

    React.useEffect(() => {
        props.onSelect(value)
    }, [, value])

    return <>
        <select value={value.name} onChange={e => setValue(types.find(t => t.name === e.target.value))}>
            {types.map(t => {
                return <option key={t.name} value={t.name}>{t.name}</option>
            })}
        </select>
    </>;
};

export default TypeSelect;
