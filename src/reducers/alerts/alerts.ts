import { alertDispatchTypes, CLEAR_ALERTS, CREATE_ALERT, TAlert } from "../../actions/alerts/types";

interface IDefaultState {
    alerts: TAlert[]
}

const defaultState: IDefaultState = {
    alerts: []
}

const alertReducer = (state: IDefaultState = defaultState, action: alertDispatchTypes) => {
    switch (action.type) {
        case CREATE_ALERT:
            return ({
                alerts: [...state.alerts, action.payload]
            })

        case CLEAR_ALERTS:
            return ({
                alerts: []
            })

        default:
            return state
    }
}

export default alertReducer
