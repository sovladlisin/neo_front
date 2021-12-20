import { GET_USERS, LOGIN, LOGOUT, TAuthDispatchTypes, TUser, UPDATE_USER } from "../../actions/auth/types"

interface IDefaultState {
    user: TUser,
    user_list: TUser[]
}

const defaultState: IDefaultState = {
    user: { token: '', email: '', is_admin: false, is_editor: false },
    user_list: []
}

const authReducer = (state: IDefaultState = defaultState, action: TAuthDispatchTypes) => {
    switch (action.type) {
        case LOGOUT:
            return defaultState


        case LOGIN:
            return ({
                ...state,
                user: action.payload
            })
        case GET_USERS:
            return {
                ...state,
                user_list: action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                user_list: state.user_list.map(u => u.id === action.payload.id ? action.payload : u)
            }

        default:
            return state
    }
}

export default authReducer
