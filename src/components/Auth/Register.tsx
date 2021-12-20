import * as React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../actions/auth/auth';
import { Link } from 'react-router-dom'

interface IRegisterProps {
}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
    const dispatch = useDispatch()


    const [loginInfo, setLoginInfo] = React.useState<{ password: string, email: string, password2: string }>({ email: '', password: '', password2: '' })

    const onLogin = (e) => {
        e.preventDefault()
        if (loginInfo.password === loginInfo.password2)
            dispatch(register(loginInfo.password, loginInfo.email, loginInfo.password2))
    }

    return <>
        <div className='login-form'>
            <form onSubmit={onLogin}>
                <label>Почта</label><input required type='email' onChange={e => setLoginInfo({ ...loginInfo, email: e.target.value })} value={loginInfo.email}></input>
                <label>Пароль</label><input required type="password" onChange={e => setLoginInfo({ ...loginInfo, password: e.target.value })} value={loginInfo.password}></input>
                <label>Повторите пароль</label><input required type="password" onChange={e => setLoginInfo({ ...loginInfo, password2: e.target.value })} value={loginInfo.password2}></input>
                <button>Регистрация</button>
            </form>

        </div>
    </>;
};

export default Register;
