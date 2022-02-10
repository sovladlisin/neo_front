import { CLASS_FULL_SIGNATURE_LOADING, CLASS_LOADING, CREATE_ENTITY, DELETE_DOMAIN_ONTOLOGY, EVENT_CREATED_TO, EVENT_DELETED_FROM, GET_ALL_CLASSES, GET_CLASS, GET_CLASSES, GET_CLASSES_WITH_SIGNATURE, GET_CLASS_FULL_SIGNATURE, GET_CLASS_OBJECT, GET_CLASS_OBJECTS, GET_DOMAIN_ONTOLOGIES, GET_OBJECTS_BY_URI, GET_SEARCH, GET_SUBCLASSES, IS_SEARCHING, LOADING_OBJECTS_BY_URI, OBJECT_IS_LOADING, TAttributeType, TClass, TClassDispatchTypes, TClassExtended, TClassFullSignature, TObjectExtended, UPDATE_CLASS } from "../../../actions/ontology/classes/types"


interface IDefaultState {
    domainOntologies: TClass[],
    domainClasses: { domain: string, classes: TClass[] },

    parentClasses: TClass[],
    updatedClass: TClass,
    selectedSubClasses: { id: number, classes: TClass[] }
    selectedClassObjects: { id: number, objects: TClass[] }
    selectedObject: TObjectExtended,
    selectedClass: TClassExtended,
    classesWithSignature: TClass[],
    selectedObjectsByUri: { uri: string, objects: TClass[] },

    createdEntity: TClass,

    classLoadingId: number
    isObjectsLoadingByUri: boolean,

    classFullSignature: TClassFullSignature,
    isFullSignatureLoading: boolean,

    searchResult: { domain: string, result: TClass[] },
    isSearching: boolean,
    isObjectLoading: boolean,


    deletedEventFrom: { id: number, resource_id: number },
    createdEventTo: { id: number, resource_id: number },

}

const defaultState: IDefaultState = {
    domainOntologies: [],

    parentClasses: [],
    domainClasses: null,
    updatedClass: null,
    selectedSubClasses: { id: -1, classes: [] },
    selectedClassObjects: { id: -1, objects: [] },
    selectedObject: null,
    selectedClass: null,
    classesWithSignature: [],
    selectedObjectsByUri: null,

    createdEntity: null,

    classLoadingId: -1,
    isObjectsLoadingByUri: false,

    classFullSignature: null,
    isFullSignatureLoading: false,

    searchResult: null,
    isSearching: false,
    isObjectLoading: false,

    deletedEventFrom: null,
    createdEventTo: null,
}

const classReducer = (state: IDefaultState = defaultState, action: TClassDispatchTypes) => {
    switch (action.type) {
        case EVENT_CREATED_TO: {
            return {
                ...state,
                createdEventTo: action.payload
            }
        }
        case EVENT_DELETED_FROM: {
            return {
                ...state,
                deletedEventFrom: action.payload
            }
        }

        case OBJECT_IS_LOADING:
            return {
                ...state,
                isObjectLoading: action.payload
            }

        case DELETE_DOMAIN_ONTOLOGY:
            return {
                ...state,
                domainOntologies: state.domainOntologies.filter(o => o['uri'] != action.payload)
            }

        case GET_SEARCH:
            return {
                ...state,
                searchResult: action.payload
            }
        case IS_SEARCHING:
            return {
                ...state,
                isSearching: action.payload
            }
        case CLASS_FULL_SIGNATURE_LOADING:
            return {
                ...state,
                isFullSignatureLoading: action.payload
            }

        case GET_CLASS_FULL_SIGNATURE:
            return {
                ...state,
                classFullSignature: action.payload
            }

        case LOADING_OBJECTS_BY_URI:
            return {
                ...state,
                isObjectsLoadingByUri: action.payload
            }

        case CLASS_LOADING:
            return {
                ...state,
                classLoadingId: action.payload
            }

        case GET_DOMAIN_ONTOLOGIES:
            return {
                ...state,
                domainOntologies: action.payload
            }
        case GET_ALL_CLASSES:
            return ({
                ...state,
                domainClasses: action.payload
            })

        case GET_CLASSES:
            return ({
                ...state,
                parentClasses: action.payload
            })
        case GET_SUBCLASSES:
            return {
                ...state,
                selectedSubClasses: action.payload
            }
        case GET_CLASS_OBJECTS:
            return {
                ...state,
                selectedClassObjects: action.payload
            }

        case UPDATE_CLASS:
            return {
                ...state,
                updatedClass: action.payload,
            }

        case GET_CLASS_OBJECT:
            return {
                ...state,
                selectedObject: action.payload
            }

        case GET_CLASS:
            return {
                ...state,
                selectedClass: action.payload
            }

        case GET_CLASSES_WITH_SIGNATURE:
            return {
                ...state,
                classesWithSignature: action.payload
            }
        case GET_OBJECTS_BY_URI:
            return {
                ...state,
                selectedObjectsByUri: action.payload
            }

        case CREATE_ENTITY:
            return {
                ...state,
                createdEntity: action.payload
            }

        default:
            return state
    }
}

export default classReducer
