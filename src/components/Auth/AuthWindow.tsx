import * as React from 'react';
import { useOnClickOutside } from '../HandleClickOutside';
import Login from './Login';
import Register from './Register';

interface IAuthWindowProps {
    onClose: () => void
}

const AuthWindow: React.FunctionComponent<IAuthWindowProps> = (props) => {
    const [mode, setMode] = React.useState(1)
    const ref = React.useRef()
    useOnClickOutside(ref, () => { props.onClose() })
    return <>
        <div className='m-background'>
        </div>
        <div className='auth-window-container' ref={ref}>
            <div className={'auth-nav-buttons-container'}>
                <button className={mode === 1 ? ' auth-mode-selected' : ''} onClick={_ => setMode(1)}>Вход</button>
                <button className={mode === 2 ? ' auth-mode-selected' : ''} onClick={_ => setMode(2)}>Регистрация</button>
            </div>
            {mode === 1 ? <Login /> : <Register />}
        </div>
    </>;
};

export default AuthWindow;
