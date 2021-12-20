
import { DELETE_FILE, GET_FILE, GET_FILES, GET_FIRST_TEXT_TABLE, TFile, TFileDispatchTypes, TTextParams } from "../../../actions/ontology/files/types"


interface IDefaultState {
    files: TFile[],
    textFirstTable: { request_id: string, params: TTextParams }
}

const defaultState: IDefaultState = {
    files: [],
    textFirstTable: null
}

const fileReducer = (state: IDefaultState = defaultState, action: TFileDispatchTypes) => {
    switch (action.type) {
        case GET_FILES:
            return ({
                ...state,
                files: action.payload
            })
        case GET_FILE:
            return ({
                ...state,
                files: [...state.files, action.payload]
            })

        case DELETE_FILE:
            return ({
                ...state,
                files: state.files.filter(f => f.id != action.payload)
            })
        case GET_FIRST_TEXT_TABLE:
            return {
                ...state,
                textFirstTable: action.payload
            }
        default:
            return state
    }
}

export default fileReducer
