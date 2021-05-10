import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, setUserPermissions } from '../../actions/auth/auth';
import { TUserInfo } from '../../actions/auth/types';
import { RootStore } from '../../store';

interface ICabinetProps {
}

const Cabinet: React.FunctionComponent<ICabinetProps> = (props) => {
    const dispatch = useDispatch()
    const authState = useSelector((state: RootStore) => state.auth)


    const [users, setUsers] = React.useState<TUserInfo[]>([])
    const check_true = <i className="fas fa-check-circle"></i>
    const check_false = <i className="fas fa-times-circle"></i>

    React.useEffect(() => {
        if (authState.user.is_admin) {
            dispatch(getUsers())
        }
    }, [])
    React.useEffect(() => {
        setUsers(authState.users)
    }, [authState.users])

    const onUserPermChange = (user: TUserInfo) => {
        dispatch(setUserPermissions(user.id, user.is_admin, user.is_editor))
    }

    return <>
        <div className='ac-card'>
            <p className='ac-photo'><i className="fas fa-user-tie"></i></p>
            <div className='ac-card-info'>
                <p>Администратор:</p><span>{authState.user.is_admin ? check_true : check_false}</span>
                <p>Редактор:</p><span>{authState.user.is_editor ? check_true : check_false}</span>
            </div>
        </div>
        <div className='ac-admin-perms'>
            {users.map(user => {
                return <div className='ac-user-card'>
                    <p className='ac-user-card-photo'><i className="fas fa-user"></i></p>
                    <p>{user.email}</p>
                    <p>{user.username}</p>
                    <label>Администратор:</label>
                    <button onClick={_ => onUserPermChange({ ...user, is_admin: !user.is_admin })}>{user.is_admin ? check_true : check_false}</button>
                    <label>Редактор:</label>
                    <button onClick={_ => onUserPermChange({ ...user, is_editor: !user.is_editor })}>{user.is_editor ? check_true : check_false}</button>
                </div>
            })}
        </div>
    </>;
};

export default Cabinet;
