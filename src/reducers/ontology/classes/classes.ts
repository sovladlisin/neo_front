import { CREATE_ENTITY, GET_CLASS, GET_CLASSES, GET_CLASSES_WITH_SIGNATURE, GET_CLASS_OBJECT, GET_CLASS_OBJECTS, GET_OBJECTS_BY_URI, GET_SUBCLASSES, TAttributeType, TClass, TClassDispatchTypes, TClassExtended, TObjectExtended, UPDATE_CLASS } from "../../../actions/ontology/classes/types"


interface IDefaultState {
    parentClasses: TClass[],
    updatedClass: TClass,
    selectedSubClasses: { id: number, classes: TClass[] }
    selectedClassObjects: { id: number, objects: TClass[] }
    selectedObject: TObjectExtended,
    selectedClass: TClassExtended,
    classesWithSignature: TClass[],
    selectedObjectsByUri: { uri: string, objects: TClass[] },

    createdEntity: TClass

}

const defaultState: IDefaultState = {
    parentClasses: [],
    updatedClass: null,
    selectedSubClasses: { id: -1, classes: [] },
    selectedClassObjects: { id: -1, objects: [] },
    selectedObject: null,
    selectedClass: null,
    classesWithSignature: [],
    selectedObjectsByUri: null,

    createdEntity: null
}

const classReducer = (state: IDefaultState = defaultState, action: TClassDispatchTypes) => {
    switch (action.type) {
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
