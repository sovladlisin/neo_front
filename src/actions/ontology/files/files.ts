
import { Dispatch } from "react"
import { SERVER_URL } from "../../../utils"
import axios from "axios";
import { withToken } from "../../auth/auth";
import { DELETE_FILE, GET_FILE, GET_FILES, TFileDispatchTypes } from "./types";


export const uploadFile = (name: string, file: File) => (dispatch: Dispatch<TFileDispatchTypes>) => {
    var params = withToken({ name: name })
    params['headers'] = { ...params['headers'], ['Content-Type']: 'multipart/form-data' }
    var formData = new FormData();
    formData.append("file", file);

    axios.post(SERVER_URL + 'uploadFile', formData, params).then(res => {
        dispatch({
            type: GET_FILE,
            payload: res.data
        })
    })
}

export const getFiles = () => (dispatch: Dispatch<TFileDispatchTypes>) => {
    var params = withToken()

    axios.get(SERVER_URL + 'getFiles', params).then(res => {
        dispatch({
            type: GET_FILES,
            payload: res.data
        })
    })
}

export const deleteFile = (id: number) => (dispatch: Dispatch<TFileDispatchTypes>) => {
    var params = withToken({ id: id })

    axios.delete(SERVER_URL + 'deleteFile', params).then(res => {
        dispatch({
            type: DELETE_FILE,
            payload: id
        })
    })
}