import { TClass } from "../../actions/ontology/classes/types"
import { GET_ALL_RESOURCES, TResourceDispatchTypes, TResourcesMeta } from "../../actions/ontology/resources/types"



interface IDefaultState {
    all_resources: TResourcesMeta
}

const defaultState: IDefaultState = {
    all_resources: null
}

const resourceReducer = (state: IDefaultState = defaultState, action: TResourceDispatchTypes) => {
    switch (action.type) {

        case GET_ALL_RESOURCES:
            return {
                ...state,
                all_resources: action.payload
            }

        default:
            return state
    }
}

export default resourceReducer
