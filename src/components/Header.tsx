import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { logout } from '../actions/auth/auth';
import { RootStore } from '../store';
import { LOGO } from '../utils';

interface IHeaderProps {
    onAuthWindow: () => void
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
    const dispatch = useDispatch()
    const authState = useSelector((state: RootStore) => state.auth)




    return <>

        <div className='header-container'>
            <div className='header-inner-container'>
                <Link to='/'><img src={LOGO}></img></Link>
                <div className='header-buttons'>
                    <Link to='/corpuses'>Корпусы</Link>
                    <Link to=''>Новости</Link>
                    <Link to='/domain-ontology'>Онтология</Link>
                    <Link to='/actors'>Персоны</Link>
                    <Link to='/about'>О проекте</Link>
                    <Link to='/resources'>Ресурсы</Link>
                </div>
                <div className='header-auth'>
                    {authState.user.token && authState.user.token.length > 0 && <>
                        <p>{authState.user.username}</p>
                        <Link to='/account'>Личный кабинет</Link>
                        <button className='button-logout' onClick={_ => dispatch(logout())}>Выход</button>
                    </>}
                    {(!authState.user.token || authState.user.token.length === 0) && <>
                        <button onClick={_ => props.onAuthWindow()} className='button-login'>Вход</button>
                    </>}
                </div>
            </div>
        </div>

        {/* <div className='hr-menu'>
            <div className='hr-links'>
                <Link to='/resource-library'>Библиотека ресурсов</Link>
                <Link to='/resource-ontology'>Онтология ресурсов</Link>
                <Link to='/domain-ontology'>Онтологии ПрО</Link>
            </div>
            <div className='hr-login'>
                {authState.user.token && authState.user.token.length > 0 && <>
                    <p>{authState.user.username}</p>
                    <Link to='/account'>Личный кабинет</Link>
                    <button onClick={_ => dispatch(logout())}>Выход</button>
                </>}
                {(!authState.user.token || authState.user.token.length === 0) && <>
                    <Link to='/login'>Вход</Link>
                </>}

            </div>
        </div> */}
    </>;

};

export default Header;
