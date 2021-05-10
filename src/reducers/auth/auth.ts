import { GET_USERS, LOGIN, LOGOUT, TAuthDispatchTypes, TUser, TUserInfo, UPDATE_USER } from "../../actions/auth/types"

interface IDefaultState {
    user: TUser,
    users: TUserInfo[]
}

const defaultState: IDefaultState = {
    user: { token: '', username: '', is_admin: false, is_editor: false },
    users: []
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
                users: action.payload
            }

        case UPDATE_USER:
            var new_user = state.user.username != action.payload.username ? state.user :
                { ...state.user, is_admin: action.payload.is_admin, is_editor: action.payload.is_editor }
            return {
                ...state,
                users: state.users.map(u => u.id === action.payload.id ? action.payload : u),
                user: new_user
            }

        default:
            return state
    }
}

export default authReducer
