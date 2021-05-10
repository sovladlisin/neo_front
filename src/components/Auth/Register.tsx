import * as React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../actions/auth/auth';
import { Link } from 'react-router-dom'

interface IRegisterProps {
}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
    const dispatch = useDispatch()


    const [loginInfo, setLoginInfo] = React.useState<{ username: string, password: string, email: string }>({ username: '', password: '', email: '' })

    const onLogin = () => {
        dispatch(register(loginInfo.username, loginInfo.password, loginInfo.email))
    }

    return <>
        <div className='login-form'>
            <label>Логин</label><input onChange={e => setLoginInfo({ ...loginInfo, username: e.target.value })} value={loginInfo.username}></input>
            <label>Пароль</label><input type="password" onChange={e => setLoginInfo({ ...loginInfo, password: e.target.value })} value={loginInfo.password}></input>
            <label>Почта</label><input type="email" onChange={e => setLoginInfo({ ...loginInfo, email: e.target.value })} value={loginInfo.email}></input>
            <button onClick={onLogin}>Регистрация</button>
            <Link to='/login' >Вход с существующего аккаунта</Link>
        </div>
    </>;
};

export default Register;
