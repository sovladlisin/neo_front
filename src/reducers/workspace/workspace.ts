import { DELETE_DOMAIN_ONTOLOGY, TClass } from "../../actions/ontology/classes/types"
import { TMainResource } from "../../actions/ontology/resources/types"
import { CONNECT_FILE_TO_TEXT, CREATE_MARKUP, CREATE_TEXT_ENTITY, CREATE_TEXT_RELATION, DELETE_MARKUP, DELETE_TEXT_ENTITY, DELETE_TEXT_RELATION, DISCONNECT_FILE_FROM_TEXT, EDIT_MARKUP, GET_MARKUPS, GET_NODE_ATTRIBUTES, GET_TEXT_ENTITIES, GET_TEXT_RELATIONS, GET_WORKSPACE, TEntity, TMarkup, TTextRelation, TWorkspaceDispatchTypes, TWorkspaceInfo } from "../../actions/workspace/types"

interface IDefaultState {
    info: TWorkspaceInfo,

    textMarkups: { markups: TMarkup[], text_uri: string },
    markupEntities: { markup_id: number, entities: TEntity[] }

    newMarkup: TMarkup,
    newEntity: TEntity,

    selectedAttributes: { node_uri: string, class_node: TClass, attributes: TClass[], attributes_obj: TClass[] },

    textRelations: { markup_id: number, relations: TTextRelation[] },
    newTextRelation: TTextRelation,

    newConnectedFile: { id: number, data: TMainResource },
    disconnectedFile: number

}

const defaultState: IDefaultState = {
    info: null,

    textMarkups: null,
    markupEntities: null,

    newMarkup: null,
    newEntity: null,

    selectedAttributes: null,
    textRelations: null,
    newTextRelation: null,

    newConnectedFile: null,
    disconnectedFile: -1
}

const workspaceReducer = (state: IDefaultState = defaultState, action: TWorkspaceDispatchTypes) => {
    switch (action.type) {

        case CONNECT_FILE_TO_TEXT:
            return {
                ...state,
                newConnectedFile: action.payload
            }
        case DISCONNECT_FILE_FROM_TEXT:
            return {
                ...state,
                disconnectedFile: action.payload
            }

        case GET_TEXT_RELATIONS:
            return {
                ...state,
                textRelations: action.payload
            }

        case CREATE_TEXT_RELATION:
            var id = state.textRelations.markup_id

            return {
                ...state,
                newTextRelation: action.payload,
                textRelations: id === action.payload.markup ? { ...state.textRelations, relations: [...state.textRelations.relations, action.payload] } : state.textRelations
            }

        case DELETE_TEXT_RELATION:
            return {
                ...state,
                textRelations: { ...state.textRelations, relations: state.textRelations.relations.filter(r => r.id != action.payload) }
            }

        case GET_NODE_ATTRIBUTES:
            return {
                ...state,
                selectedAttributes: action.payload
            }

        case GET_WORKSPACE:
            return {
                ...state,
                info: action.payload
            }

        case GET_MARKUPS:
            return {
                ...state,
                textMarkups: action.payload
            }

        case EDIT_MARKUP:
        case CREATE_MARKUP:
            var uri = state.textMarkups.text_uri

            return {
                ...state,
                newMarkup: action.payload,
                textMarkups: action.payload.original_object_uri === uri ? { ...state.textMarkups, markups: [...state.textMarkups.markups, action.payload] } : state.textMarkups
            }
        case DELETE_MARKUP:
            return {
                ...state,
                textMarkups: { ...state.textMarkups, markups: state.textMarkups.markups.filter(m => m.id != action.payload) }
            }

        case GET_TEXT_ENTITIES:
            return {
                ...state,
                markupEntities: action.payload
            }
        case CREATE_TEXT_ENTITY:
            var id = state.markupEntities.markup_id
            return {
                ...state,
                newEntity: action.payload,
                markupEntities: action.payload.markup === id ? { ...state.markupEntities, entities: [...state.markupEntities.entities, action.payload] } : state.markupEntities
            }

        case DELETE_TEXT_ENTITY:
            return {
                ...state,
                markupEntities: { ...state.markupEntities, entities: state.markupEntities.entities.filter(m => m.id != action.payload) }
            }

        default:
            return state
    }
}

export default workspaceReducer
