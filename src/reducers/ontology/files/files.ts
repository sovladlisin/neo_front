
import { DELETE_FILE, GET_FILE, GET_FILES, TFile, TFileDispatchTypes } from "../../../actions/ontology/files/types"


interface IDefaultState {
    files: TFile[],
}

const defaultState: IDefaultState = {
    files: [],
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

        default:
            return state
    }
}

export default fileReducer
