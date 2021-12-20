import * as React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth/auth';
import { Link } from 'react-router-dom'

interface ILoginProps {
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
    const dispatch = useDispatch()

    const [loginInfo, setLoginInfo] = React.useState<{ username: string, password: string }>({ username: '', password: '' })


    const onLogin = (e) => {
        e.preventDefault()
        dispatch(login(loginInfo.username, loginInfo.password))
    }

    return <>
        <div className='login-form'>
            <form onSubmit={onLogin}>
                <label>Почта</label><input required type='email' onChange={e => setLoginInfo({ ...loginInfo, username: e.target.value })} value={loginInfo.username}></input>
                <label>Пароль</label><input required type="password" onChange={e => setLoginInfo({ ...loginInfo, password: e.target.value })} value={loginInfo.password}></input>
                <button>Вход</button>
            </form>

        </div>
    </>;
};

export default Login;
