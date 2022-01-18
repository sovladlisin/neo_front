import { TClass } from "../../actions/ontology/classes/types"
import { ADD_RESOURCE_TO_LIST, DELETE_RESOURCE_FROM_LIST, GET_ALL_CORPUS_RESOURCES, GET_ALL_RESOURCES, GET_VISUAL_ITEM_CONNECTIONS, IS_RESOURCES_LOADING, TMainCounter, TMainResource, TResourceDispatchTypes, TResourcesMeta } from "../../actions/ontology/resources/types"



interface IDefaultState {
    all_resources: TResourcesMeta,
    corpus_resources: { data: TMainResource[], data_size: number, counters: TMainCounter },
    is_loading: boolean,

    added_resource: TMainResource,
    deleted_resource: number,

    visual_items_connections: { id: number, data: TClass[] }
}

const defaultState: IDefaultState = {
    all_resources: null,
    corpus_resources: {
        data: [],
        data_size: 0,
        counters: {
            images: 0,
            video: 0,
            audio: 0,
            texts: 0,
            articles: 0,
            notes: 0,
            actors: [],
            langs: [],
            genres: [],
            places: [],
        }
    },
    is_loading: false,

    added_resource: null,
    deleted_resource: -1,

    visual_items_connections: null
}

const resourceReducer = (state: IDefaultState = defaultState, action: TResourceDispatchTypes) => {
    switch (action.type) {

        case GET_VISUAL_ITEM_CONNECTIONS:
            return {
                ...state,
                visual_items_connections: action.payload
            }

        case ADD_RESOURCE_TO_LIST:
            var new_obj = { ...state.corpus_resources }
            var new_array = [...new_obj.data]
            new_obj.data = new_array
            new_array.unshift(action.payload)
            return {
                ...state,
                corpus_resources: new_obj
            }

        case DELETE_RESOURCE_FROM_LIST:
            return {
                ...state,
                corpus_resources: { ...state.corpus_resources, data: state.corpus_resources.data.filter(r => r.resource.id != action.payload) }
            }

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
