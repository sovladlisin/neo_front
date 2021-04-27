import { GET_CLASSES, GET_CLASS_OBJECT, GET_CLASS_OBJECTS, GET_SUBCLASSES, TClass, TClassDispatchTypes, UPDATE_CLASS } from "../../../actions/ontology/classes/types"


interface IDefaultState {
    parentClasses: TClass[],
    updatedClass: TClass,
    selectedSubClasses: { id: number, classes: TClass[] }
    selectedClassObjects: { id: number, objects: TClass[] }
    selectedObject: TClass
}

const defaultState: IDefaultState = {
    parentClasses: [],
    updatedClass: null,
    selectedSubClasses: { id: -1, classes: [] },
    selectedClassObjects: { id: -1, objects: [] },
    selectedObject: null
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

        default:
            return state
    }
}

export default classReducer
