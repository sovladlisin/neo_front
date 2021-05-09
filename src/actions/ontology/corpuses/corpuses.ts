import { Dispatch } from "react"
import { SERVER_URL } from "../../../utils"
import { GET_CORPUSES, TCorpusDispatchTypes, GET_SUB_CORPUSES } from "./types"
import axios from "axios";


export const getCorpuses = () => (dispatch: Dispatch<TCorpusDispatchTypes>) => {
    axios.get(SERVER_URL + 'getCorpuses').then(res => {
        dispatch({
            type: GET_CORPUSES,
            payload: res.data
        })
    })
}

export const getSubCorpuses = (id: number) => (dispatch: Dispatch<TCorpusDispatchTypes>) => {
    axios.get(SERVER_URL + `getSubCorpuses?id=${id}`).then(res => {
        dispatch({
            type: GET_SUB_CORPUSES,
            payload: { corpus_id: id, corpuses: res.data }
        })
    })
}