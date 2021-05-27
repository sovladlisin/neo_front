import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { logout } from '../actions/auth/auth';
import { RootStore } from '../store';

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
    const dispatch = useDispatch()
    const authState = useSelector((state: RootStore) => state.auth)




    return <>
        <div className='hr-menu'>
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
        </div>
    </>;

};

export default Header;
