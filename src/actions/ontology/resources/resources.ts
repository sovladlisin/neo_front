import axios from "axios";
import { Dispatch } from "react";
import { SERVER_URL } from "../../../utils";
import { alertDispatchTypes, CREATE_ALERT } from "../../alerts/types";
import { withToken } from "../../auth/auth";
import { CONNECT_FILE_TO_TEXT, TWorkspaceDispatchTypes } from "../../workspace/types";
import { TFile } from "../classes/types";
import { ADD_RESOURCE_TO_LIST, GET_ALL_CORPUS_RESOURCES, GET_ALL_RESOURCES, GET_VISUAL_ITEM_CONNECTIONS, IS_RESOURCES_LOADING, TMainResource, TResourceDispatchTypes, TResourcesMeta } from "./types";

export const getAllResources = () => (dispatch: Dispatch<TResourceDispatchTypes>) => {
    axios.get(SERVER_URL + 'getAllResources').then(res => {
        dispatch({
            type: GET_ALL_RESOURCES,
            payload: res.data
        })
    }).catch(err => console.log(err))
}

export const getCorpusResources = (corpus_uri) => (dispatch: Dispatch<TResourceDispatchTypes>) => {
    const params = withToken({ corpus_uri })
    dispatch({
        type: IS_RESOURCES_LOADING,
        payload: true
    })
    axios.get(SERVER_URL + 'getCorpusResources', params).then(res => {
        dispatch({
            type: GET_ALL_CORPUS_RESOURCES,
            payload: res.data
        })
        dispatch({
            type: IS_RESOURCES_LOADING,
            payload: false
        })
    }).catch(err => console.log(err))
}

export const getVisualConnections = (id: number) => (dispatch: Dispatch<TResourceDispatchTypes | alertDispatchTypes>) => {
    const params = withToken({ id })

    axios.get(SERVER_URL + 'getVisualConnectedObjects', params).then(res => {
        dispatch({
            type: GET_VISUAL_ITEM_CONNECTIONS,
            payload: { id: id, data: res.data }
        })
    }).catch(err => {
        console.log(err)
    })
}


export const connectFileToResource = (name: string, file_type: string, object_id: number, file: File, note: string, res_type = null, connect_type = '') => (dispatch: Dispatch<TResourceDispatchTypes | alertDispatchTypes | TWorkspaceDispatchTypes>) => {
    var params = withToken({ name, file_type, object_id, note, res_type })
    params['headers'] = { ...params['headers'], ['Content-Type']: 'multipart/form-data' }
    var formData = new FormData();
    formData.append("file", file);

    axios.post(SERVER_URL + 'uploadFile', formData, params).then(res => {
        const data: TMainResource = res.data

        if (connect_type === 'text') {
            dispatch({
                type: CONNECT_FILE_TO_TEXT,
                payload: { id: object_id, data: data }
            })
        }

        dispatch({
            type: ADD_RESOURCE_TO_LIST,
            payload: data
        })


        dispatch({
            type: CREATE_ALERT,
            payload: { type: 200, message: 'Файл загружен' }
        })
    }).catch(err => {
        console.log(err)
    })
}