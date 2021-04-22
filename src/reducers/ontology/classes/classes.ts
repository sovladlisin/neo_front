import { GET_CLASSES, GET_CLASS_OBJECTS, GET_SUBCLASSES, TClass, TClassDispatchTypes } from "../../../actions/ontology/classes/types"


interface IDefaultState {
    parentClasses: TClass[],
    selectedSubClasses: { id: number, classes: TClass[] }
    selectedClassObjects: { id: number, objects: TClass[] }
}

const defaultState: IDefaultState = {
    parentClasses: [],
    selectedSubClasses: { id: -1, classes: [] },
    selectedClassObjects: { id: -1, objects: [] }
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

        default:
            return state
    }
}

export default classReducer
