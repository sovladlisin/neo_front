import { Dispatch } from "react"
import { handleError, SERVER_URL } from "../../../utils"
import { GET_CORPUSES, TCorpusDispatchTypes, GET_SUB_CORPUSES } from "./types"
import axios from "axios";
import { alertDispatchTypes, CREATE_ALERT } from "../../alerts/types";


export const getCorpuses = () => (dispatch: Dispatch<TCorpusDispatchTypes | alertDispatchTypes>) => {
    axios.get(SERVER_URL + 'getCorpuses').then(res => {
        dispatch({
            type: GET_CORPUSES,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const getSubCorpuses = (id: number) => (dispatch: Dispatch<TCorpusDispatchTypes | alertDispatchTypes>) => {
    axios.get(SERVER_URL + `getSubCorpuses?id=${id}`).then(res => {
        dispatch({
            type: GET_SUB_CORPUSES,
            payload: { corpus_id: id, corpuses: res.data }
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}