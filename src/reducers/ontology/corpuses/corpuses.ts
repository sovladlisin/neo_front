import { GET_CLASS, GET_CLASSES, GET_CLASS_OBJECT, GET_CLASS_OBJECTS, GET_SUBCLASSES, TAttributeType, TClass, TClassDispatchTypes, UPDATE_CLASS } from "../../../actions/ontology/classes/types"
import { GET_CORPUSES, GET_SUB_CORPUSES, TCorpusDispatchTypes } from "../../../actions/ontology/corpuses/types"


interface IDefaultState {
    parentCorpuses: TClass[],
    subCorpuses: { corpus_id: number, corpuses: TClass[] },
}

const defaultState: IDefaultState = {
    parentCorpuses: [],
    subCorpuses: null
}

const corpusReducer = (state: IDefaultState = defaultState, action: TCorpusDispatchTypes) => {
    switch (action.type) {
        case GET_CORPUSES:
            return ({
                ...state,
                parentCorpuses: action.payload
            })
        case GET_SUB_CORPUSES:
            return ({
                ...state,
                subCorpuses: action.payload
            })

        default:
            return state
    }
}

export default corpusReducer
