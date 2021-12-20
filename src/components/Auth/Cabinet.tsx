import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, updateUser } from '../../actions/auth/auth';
import { TUser } from '../../actions/auth/types';
import { RootStore } from '../../store';
import { getImage } from '../../utils';

interface ICabinetProps {
}

const Cabinet: React.FunctionComponent<ICabinetProps> = (props) => {
    const dispatch = useDispatch()
    const authState = useSelector((state: RootStore) => state.auth)


    const [userAdminList, setUserAdminList] = React.useState<TUser[]>(null)
    React.useEffect(() => {
        authState.user.is_admin && dispatch(getUsers())
    }, [])


    React.useEffect(() => {
        authState.user_list && setUserAdminList(authState.user_list)
    }, [authState.user_list])


    const updateUserPerms = (new_user: TUser) => {
        dispatch(updateUser(new_user.id, new_user.is_admin, new_user.is_editor))
        setUserAdminList(userAdminList.map(u => u.id === new_user.id ? new_user : u))
    }

    const [userSearch, setUserSearch] = React.useState('')

    return <>
        <div className='sub-page-container'>
            <p className='sub-page-title'>Личный кабинет</p>

            <div className='account-container'>
                <img src={getImage(null)}></img>
                <div className='account-meta'>
                    <label>Почта:</label><span>{authState.user.email}</span>
                    <label>Администратор:</label><span>{authState.user.is_admin ? <i className='fas fa-check'></i> : <i className='fas fa-times'></i>}</span>
                    <label>Редактор:</label><span>{authState.user.is_editor ? <i className='fas fa-check'></i> : <i className='fas fa-times'></i>}</span>
                </div>



            </div>
            {userAdminList && userAdminList.length > 0 && <>
                <div className='account-admin-user-list-search-container'>
                    <span><i className='fas fa-search'></i></span>
                    <input value={userSearch} onChange={e => setUserSearch(e.target.value)} placeholder='Поиск пользователей'></input>
                </div>
                <div className='account-admin-user-list'>
                    {userAdminList.filter(u => JSON.stringify(u).toLocaleLowerCase().includes(userSearch.toLocaleLowerCase())).map(u => {
                        return <>
                            <div className='account-admin-user-list-item'>
                                <img src={getImage(null)}></img>
                                <p>{u.email}</p>
                                <div className='account-admin-user-list-item-perm'>
                                    <label>Администратор</label>
                                    <button onClick={_ => updateUserPerms({ ...u, is_admin: !u.is_admin })}>{u.is_admin ? <i className='fas fa-check'></i> : <i className='fas fa-times'></i>}</button>
                                </div>
                                <div className='account-admin-user-list-item-perm'>
                                    <label>Редактор</label>
                                    <button onClick={_ => updateUserPerms({ ...u, is_editor: !u.is_editor })}>{u.is_editor ? <i className='fas fa-check'></i> : <i className='fas fa-times'></i>}</button>
                                </div>
                            </div>
                        </>
                    })}
                </div>
            </>}
        </div>
    </>;
};

export default Cabinet;
