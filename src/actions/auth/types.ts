export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const UPDATE_USER = "UPDATE_USER"
export const GET_USERS = 'GET_USERS'

export type TUser = {
    token: string,
    email: string,
    is_admin: boolean,
    is_editor: boolean,
    id?: number
}


interface ILogin {
    type: typeof LOGIN
    payload: TUser
}

interface ILogout {
    type: typeof LOGOUT
    payload: null
}
interface IGetUsers {
    type: typeof GET_USERS,
    payload: TUser[]
}
interface IUpdateUser {
    type: typeof UPDATE_USER,
    payload: TUser
}

export type TAuthDispatchTypes = ILogin | ILogout | IGetUsers | IUpdateUser