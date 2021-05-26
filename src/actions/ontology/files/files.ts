
import { Dispatch } from "react"
import { handleError, SERVER_URL } from "../../../utils"
import axios from "axios";
import { withToken } from "../../auth/auth";
import { DELETE_FILE, GET_FILE, GET_FILES, TFileDispatchTypes } from "./types";
import { alertDispatchTypes, CREATE_ALERT } from "../../alerts/types";
import { TComment } from "../../../components/Workspace/CommentaryInfo";


export const uploadFile = (name: string, file: File, carrier_uri: string, type_uri: string, object_id: number) => (dispatch: Dispatch<TFileDispatchTypes | alertDispatchTypes>) => {
    var params = withToken({ name: name, carrier_uri: carrier_uri, type_uri: type_uri, object_id: object_id })
    params['headers'] = { ...params['headers'], ['Content-Type']: 'multipart/form-data' }
    var formData = new FormData();
    formData.append("file", file);

    axios.post(SERVER_URL + 'uploadFile', formData, params).then(res => {
        // dispatch({
        //     type: GET_FILE,
        //     payload: res.data
        // })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const getFiles = () => (dispatch: Dispatch<TFileDispatchTypes | alertDispatchTypes>) => {
    var params = withToken()

    axios.get(SERVER_URL + 'getFiles', params).then(res => {
        dispatch({
            type: GET_FILES,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const deleteFile = (id: number) => (dispatch: Dispatch<TFileDispatchTypes | alertDispatchTypes>) => {
    var params = withToken({ id: id })

    axios.delete(SERVER_URL + 'deleteFile', params).then(res => {
        dispatch({
            type: DELETE_FILE,
            payload: id
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}
export const changeComments = (comments: TComment[], commentary_uri: string) => (dispatch: Dispatch<TFileDispatchTypes | alertDispatchTypes>) => {
    var params = withToken()

    axios.post(SERVER_URL + 'changeComments', JSON.stringify({ comments, commentary_uri }), params).then(res => {
        // dispatch({
        //     type: GET_FILE,
        //     payload: res.data
        // })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}