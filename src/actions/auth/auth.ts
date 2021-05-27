import { Dispatch } from "react"
import { GET_USERS, LOGIN, LOGOUT, TAuthDispatchTypes, TUser, UPDATE_USER } from "./types"
import axios from "axios";
import { handleError, HOST, SERVER_URL_AUTH } from "../../utils";
import store from "../../store";
import { alertDispatchTypes, CREATE_ALERT } from "../alerts/types";


export const login = (username: string, password: string) => (dispatch: Dispatch<TAuthDispatchTypes | alertDispatchTypes>) => {
    const body = JSON.stringify({ username, password })
    axios.post(SERVER_URL_AUTH + 'login', body).then(res => {
        dispatch({
            type: LOGIN,
            payload: res.data
        })
        window.location.replace(HOST);

    }).catch(err => {
        console.log(err)
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}
export const logout = () => (dispatch: Dispatch<TAuthDispatchTypes | alertDispatchTypes>) => {
    dispatch({
        type: LOGOUT,
        payload: null
    })
    window.location.replace(HOST);
}
export const register = (username: string, password: string, email: string) => (dispatch: Dispatch<TAuthDispatchTypes | alertDispatchTypes>) => {
    const body = JSON.stringify({ username, password, email })
    axios.post(SERVER_URL_AUTH + 'register', body).then(res => {
        dispatch({
            type: LOGIN,
            payload: res.data
        })
        window.location.replace(HOST);
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}
export const getUsers = () => (dispatch: Dispatch<TAuthDispatchTypes | alertDispatchTypes>) => {
    const params = withToken()
    axios.get(SERVER_URL_AUTH + 'getUsers', params).then(res => {
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}
export const setUserPermissions = (user_id: number, is_admin: boolean, is_editor: boolean) => (dispatch: Dispatch<TAuthDispatchTypes | alertDispatchTypes>) => {
    const body = JSON.stringify({ user_id, is_admin, is_editor })
    const params = withToken()
    axios.post(SERVER_URL_AUTH + 'setUserPermissions', body, params).then(res => {
        dispatch({
            type: UPDATE_USER,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const withToken = (params = {}): {} => {
    const state = store.getState()
    const user: TUser = state['auth']['user']
    if (user.token.length === 0) return { headers: { Token: '' }, params: params }
    return { headers: { Token: user.token }, params: params }
}