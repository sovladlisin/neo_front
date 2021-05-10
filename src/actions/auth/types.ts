export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const GET_USERS = "GET_USERS"
export const UPDATE_USER = "UPDATE_USER"


export type TUser = {
    token: string,
    username: string,
    is_admin: boolean,
    is_editor: boolean
}
export type TUserInfo = {
    id?: number,
    user: number,
    is_admin: boolean,
    is_editor: boolean,
    email: string,
    username: string,
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
    type: typeof GET_USERS
    payload: TUserInfo[]
}
interface IUpdateUser {
    type: typeof UPDATE_USER
    payload: TUserInfo
}

export type TAuthDispatchTypes = ILogin | ILogout | IGetUsers | IUpdateUser