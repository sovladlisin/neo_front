import { TClass } from "../../actions/ontology/classes/types"
import { GET_ALL_CORPUS_RESOURCES, GET_ALL_RESOURCES, IS_RESOURCES_LOADING, TMainResource, TResourceDispatchTypes, TResourcesMeta } from "../../actions/ontology/resources/types"



interface IDefaultState {
    all_resources: TResourcesMeta,
    corpus_resources: TMainResource[],
    is_loading: boolean
}

const defaultState: IDefaultState = {
    all_resources: null,
    corpus_resources: [],
    is_loading: false
}

const resourceReducer = (state: IDefaultState = defaultState, action: TResourceDispatchTypes) => {
    switch (action.type) {

        case GET_ALL_RESOURCES:
            return {
                ...state,
                all_resources: action.payload
            }
        case GET_ALL_CORPUS_RESOURCES:
            return {
                ...state,
                corpus_resources: action.payload
            }
        case IS_RESOURCES_LOADING:
            return {
                ...state,
                is_loading: action.payload
            }


        default:
            return state
    }
}

export default resourceReducer
